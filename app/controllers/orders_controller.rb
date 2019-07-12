class OrdersController < ApplicationController
layout 'hello_world'
protect_from_forgery :except => [:create]

  def index
    @orders = Order.all
    respond_to do |format|
      format.html
      format.json {
        render json: {
          orders: @orders
        }
      }
    end
  end

  def show
    @order = Order.find(params[:id])
    @cart = @order.item_orders
    @cart_items = @cart.map {|cart_item| Item.find(cart_item.item_id) }
    respond_to do |format|
      format.html
      format.json {
        render json: {
          order: @order,
          cart: @cart,
          cart_items: @cart_items
        }
      }
    end
  end

  def create
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
    redirect_to orders_path
  end

end
