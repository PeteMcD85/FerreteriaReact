class RefundOrdersController < ApplicationController
  layout 'orders'

  def new
    order = Order.find(params[:order_id])
    refund_orders = order.refund_orders
    if refund_orders.count > 0
      refund_items = refund_orders.map{|ro| ro.refund_items}
      @order = order.as_json.merge!(refund_orders: refund_orders.map{|ro| ro.as_json.merge!(refund_items: refund_items)})
    end
    @item_orders = order.item_orders.map { |io|
      item = Item.find(io.item_id).as_json.except!(:id)
      io.as_json.merge!(item: item)
    }
    @custom_items = order.custom_items
  end

  def create

  end

end
