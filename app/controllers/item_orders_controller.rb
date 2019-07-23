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
    p '============================================='
    p item_order_params
    p item_order_params[:quantity_refunded]
    @order = Order.find(params[:order_id])
    @item_order = ItemOrder.find([params[:id]]).first
    @item = Item.find(@item_order.item_id)
    new_quantity_refunded = item_order_params[:quantity_refunded]
    old_quantity_refunded = @item_order.quantity_refunded
    if old_quantity_refunded != new_quantity_refunded
      if @item_order.update(item_order_params)
        status = old_quantity_refunded == 0 ? 'new' : 'old'
        @item_order.update_subtotal_refunded
        @item_order.item.update_inventory(@item_order.calc_item_inventory(status, old_quantity_refunded, new_quantity_refunded))
        @item_order.order.update_subtotal_refunded.update_taxes_refunded.update_total_refunded
        redirect_to order_path(@order)
      else
        render 'edit'
      end
    else
      redirect_to order_path(@order)
    end
  end

  private

  def item_order_params
    params.require(:item_order).permit(:quantity_refunded)
  end


end
