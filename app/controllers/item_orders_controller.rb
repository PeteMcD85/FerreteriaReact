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
      @item_order.update_subtotal_refunded
      @item_order.item.update_inventory(@item_order.calc_item_inventory)
      @item_order.order.update_subtotal_refunded.update_taxes_refunded.update_total_refunded
      redirect_to order_path(@order)
    else
      render 'edit'
    end
  end

  private

  def item_order_params
    params.require(:item_order).permit(:quantity_refunded)
  end


end
