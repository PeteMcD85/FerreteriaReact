class OrdersController < ApplicationController
layout 'hello_world'
protect_from_forgery :except => [:create]

  def index
    @orders = Order.all
  end

  def show
    @order = Order.find(params[:id])
  end

  def create
    p "+++++++++++++ORDEER CONTROLLER++++++++++++++++++"
    order = params[:order]
    cart_items = order[:itemOrders][:cartItems]
    cart_total = order[:itemOrders][:cartTotal]
    orderParams = {
      order_type: order[:orderType],
      subtotal: cart_total[:subtotal],
      taxes: cart_total[:taxes],
      total: cart_total[:total]
    }
    @order = Order.create(orderParams)
    cart_items.each do |cart_item|
      @order.item_orders.create(
        item_id: cart_item[:item][:id],
        order_id: @order[:id],
        quantity: cart_item[:quantity],
        price_given: cart_item[:priceGiven],
        subtotal: cart_item[:subtotal]
      )
    end
    respond_to do |format|
      format.html
      format.json {
        render json: {
          order: @order,
          item_orders: @order.item_orders
        }
      }
    end
    redirect_to orders_path
  end

end
