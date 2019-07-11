class OrdersController < ApplicationController

protect_from_forgery :except => [:create]

  def create
    p "+++++++++++++ORDEER CONTROLLER++++++++++++++++++"
    order = params[:order]
    @order = Order.create(order_type: order[:order_type])
    order[:item_orders].each do |item_order|
      @order.item_orders.create(
        item_id: item_order[:item][:id],
        order_id: @order[:id],
        quantity: item_order[:quantity],
        price_given: item_order[:priceGiven]
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
    redirect_to @order

    5
  end

  def show
    @order = Order.find(params[:id])
  end
end
