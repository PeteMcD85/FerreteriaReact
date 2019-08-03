class CustomItemController < ApplicationController
  layout "hello_world"
  def edit
    @order = Order.find(params[:order_id])
    @custom_item = CustomItem.find(params[:id])
    # @item = Item.find(@custom_item.item_id)
    p params
    p @custom_item
  end

  def update
    p '============================================='
    p custom_item_params
    p custom_item_params[:quantity_refunded]
    @order = Order.find(params[:order_id])
    @custom_item = @order.custom_items.find(params[:id])
    new_quantity_refunded = custom_item_params[:quantity_refunded]
    old_quantity_refunded = @custom_item.quantity_refunded
    if old_quantity_refunded != new_quantity_refunded
      if @custom_item.update(custom_item_params)
        status = old_quantity_refunded == 0 ? 'new' : 'old'
        @custom_item.update_subtotal_refunded
        @custom_item.order.update_subtotal_refunded.update_taxes_refunded.update_total_refunded
        redirect_to order_path(@order)
      else
        render 'edit'
      end
    else
      redirect_to order_path(@order)
    end
  end

  private

  def custom_item_params
    params.require(:custom_item).permit(:quantity_refunded)
  end
end
