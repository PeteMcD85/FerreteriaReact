class RefundOrdersController < ApplicationController
  layout 'orders'
  protect_from_forgery :except => [:create]

  def index
      @order = Order.find(params[:order_id])
      @refund_orders =  @order.refund_orders
  end

  def show
    @order = Order.find(params[:order_id])
    @refund_order =  @order.refund_orders.find(params[:id])
    @refund_items = @refund_order.refund_items.map do |refund_item|
        refundable = refund_item.refundable
        if refundable[:item_id]
          refund_item.as_json.merge(refundable: refundable).merge(item: refundable.item)
        else
          refund_item.as_json.merge(refundable: refundable)
        end
    end
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
      refund_max = io.quantity - io.refund_items.reduce(0) { |sum, ri| sum + ri.quantity_refunded }
      io.as_json.merge!(item: io.item, refund_max: refund_max)
    }
    @custom_items = @order.custom_items.map { |ci|
      refund_max = ci.quantity - ci.refund_items.reduce(0) { |sum, ri| sum + ri.quantity_refunded }
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
