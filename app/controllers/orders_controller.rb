class OrdersController < ApplicationController

protect_from_forgery :except => [:create]

  def create
    p "+++++++++++++ORDEER CONTROLLER++++++++++++++++++"
    order = params[:order]
    @order = Order.new(order_type: order[:order_type])
    order[:item_orders].each do |item_order|
      @order.item_orders.new(
        item_id: item_order[:item_id],
        order_id: @order,
        quantity: item_order[:quantity]
      )
    end
    # if @order.save
      respond_to do |format|
        format.json {
          render json: {
            order: @order,
            item_orders: @order.item_orders
          }
        }
      end
    # end
  end
end
