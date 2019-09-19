class RefundOrdersController < ApplicationController
  layout 'orders'

  def new
    @order = Order.find(params[:order_id])
    @item_orders = @order.item_orders.map { |io|
      item = Item.find(io.item_id).as_json.except!(:id)
      io.as_json.merge!(item: Item.find(io.item_id).as_json)
    }
    @custom_items = @order.custom_items
  end

  def create

  end

end
