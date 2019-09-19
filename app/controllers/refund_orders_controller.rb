class RefundOrdersController < ApplicationController
  def new
    p '========================'
    p params
    @order = Order.find(params[:order_id])
  end
end
