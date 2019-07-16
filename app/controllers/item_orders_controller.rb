class ItemOrdersController < ApplicationController
  layout "hello_world"
  def edit
    @order = Order.find(params[:order_id])
    @item_order = ItemOrder.find([params[:id]]).first
    @item = Item.find(@item_order.item_id)
    p params
    p @item_order
  end

  def update
    p '+++++++++++++++++++++++++++++++++++++++++'
  end
end
