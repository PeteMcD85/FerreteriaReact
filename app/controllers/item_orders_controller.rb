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
    @order = Order.find(params[:order_id])
    @item_order = ItemOrder.find([params[:id]]).first
    @item = Item.find(@item_order.item_id)
    if @item_order.update(item_order_params)
      @item_order.update_item_order
      @item_order.update_item_inventory
      redirect_to @item_order
    else
      render 'edit'
    end
  end

  private

  def item_order_params
    params.require(:item_order).permit(:quantity_refunded)
  end


end
