class RefundOrdersController < ApplicationController
  layout 'orders'

  def new
    p '========================'
    p params
    @order = Order.find(params[:order_id])
    @cart = @order.item_orders
    @cart_item_orders = @cart.map {|cart_item| Item.find(cart_item.item_id) }
    @cart_custom_items = @order.custom_items.map {|cart_item| CustomItem.find(cart_item.id) }
  end

  def create
    
  end

end
