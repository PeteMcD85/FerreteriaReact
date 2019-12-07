class RefundOrdersController < ApplicationController
  layout 'orders'
  protect_from_forgery :except => [:create]


  def index
      @order = Order.find(params[:order_id])
      @refund_orders =  @order.refund_orders
  end

  def show
    # Order passed through parameters
    @order = Order.find(params[:order_id])

    # All RefundOrders belonging to Order
    @refund_order =  @order.refund_orders.find(params[:id])

    # Merges the ItemOrder or CustomItem to the RefundItem
    @refund_items = @refund_order.refund_items.map do |ri|

      # The ItemOrder or CustomItem the RefundItem belongs to
      refundable = ri.refundable_type.constantize.find(ri.refundable_id)

      # If ItemOrder
      if refundable[:item_id]

        # Merges Item to the RefundItem
        ri.as_json.merge(refundable: refundable).merge(item: refundable.item)

      #  ELse CustomItem
      else
        # Merges Item to the RefundItem
        ri.as_json.merge(refundable: refundable)
      end
    end

    # Renders RefundItems for current RefundOrder
    respond_to do |format|
      format.html
      format.json {
        render json: {
          refund_items: @refund_items
        }
      }
    end

  end

  def new
    @order = Order.find(params[:order_id])
    @refund_items = @order.refund_items
    @item_orders = @order.item_orders.map { |io|
      refund_max = io.quantity - io.refund_items.reduce(0) { |sum, ri| sum += ri.quantity_refunded }
      io.as_json.merge!(item: io.item, refund_max: refund_max)
    }
    @custom_items = @order.custom_items.map { |ci|
      refund_max = ci.quantity - ci.refund_items.reduce(0) { |sum, ri| sum += ri.quantity_refunded }
      ci.as_json.merge!(refund_max: refund_max)
    }
  end # End of NEW action

  def create
    @order = Order.find(params[:order_id])
    refund_order = @order.refund_orders.new(refund_order_params)

    if refund_order.save
      refund_order.refund_items.create(refund_items_parameter[:refund_items])
      refund_order.refund_items.map do|r_i|
        refund_item = r_i.refundable_type.constantize.find(r_i.refundable_id)
        if r_i.refundable_type == "ItemOrder"
          item_id  = refund_item.item_id
          item = Item.find(item_id)
          item_new_inventory = item.inventory + r_i.quantity_refunded
          item.update_inventory(item_new_inventory);
        end
      end
      render :json => {
        refund_order: refund_order,
        refund_items: refund_order.refund_items
        }, :status => 200
    else
      render :json => { "error": 'error'}, :status => 400
    end
  end

  private

  def refund_order_params
    params.require(:refund_order).permit(
      :subtotal_refunded,
      :taxes_refunded,
      :total_refunded
    )
  end

  def refund_items_parameter
    params.require(:refund_order).permit(
      {refund_items:
        [
          :refundable_id,
          :refundable_type,
          :quantity_refunded,
          :subtotal_refunded
        ]
      }
    )
  end
end
