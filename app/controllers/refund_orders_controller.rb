class RefundOrdersController < ApplicationController
  layout 'orders'
  protect_from_forgery :except => [:create]

  def new
    # Stores the Order the RefundOrder belongs_to
    @order = Order.find(params[:order_id])

    # ++++ For the RefundedItem's associated with this current Order ++++
    # Stores the ItemOrder's associated with this current Order
    @item_orders = @order.item_orders.map do |io|
      # Stores the Item in which the ItemOrder references
      item = Item.find(io.item_id)

      # Adds an Item property to
      # Store it's respective Item in current ItemOrder
      io.as_json.merge!(item: item)
    end

    # Stores the CustomItem's associated with this current Order
    @custom_items = @order.custom_items

    # Stores the RefundOrder's associated with this current Order
    refund_orders = @order.refund_orders

    # Checks for any RefundOrder's associated with this current Order
    if refund_orders.count > 0

      # Loops through all RefundOrder's associated with this current Order
      # And Stores it's respective RefundItem's
      refund_items = refund_orders.map{|ro| ro.refund_items}

      # Merges the Order with it's respective RefundOrder's
      @order = @order.as_json.merge!(

        # Loops through RefundOrder's to map it's respective RefundItem's
        refund_orders: refund_orders.map do |ro|

          # Merges the RefundOrder with it's respective RefundItem's
          ro.as_json.merge!(refund_items: refund_items)

        end # End of refund_orders.map
      ) # End of @order.as_json.merge!
    end # End of IF refund_orders.count > 0
    # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  end # End of NEW action

  def create
    p '======================='
    p params
    render :json => { 'hey': 'hey'}, :status => 200
  end

  private

  def refund_order_params
    params.require(:refund_order).permit(
      :subtotal_refunded,
      :taxes_refunded,
      :total_refunded
    )
  end

end
