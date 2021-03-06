class CustomItemsController < ApplicationController
  layout "hello_world"
  def edit
    @order = Order.find(params[:order_id])
    @custom_item = CustomItem.find(params[:id])
    p params
    p @custom_item
  end

  def update
    @order = Order.find(params[:order_id])
    @custom_item = @order.custom_items.find(params[:id])
    new_quantity_refunded = custom_item_params[:quantity_refunded]
    old_quantity_refunded = @custom_item.quantity_refunded
    if old_quantity_refunded != new_quantity_refunded
      if @custom_item.update(custom_item_params)
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
  #
  # def get_custom_item_refunded
  #   @item_orders = ItemOrder.all
  #   p '++++Params+++++'
  #   p params
  #   start_date = params[:startDate]
  #   end_date = DateTime.parse(params[:endDate]).end_of_day
  #   p start_date
  #   p end_date
  #   refunded_orders = CustomItem.get_custom_item_refunded(start_date, end_date).distinct_orders
  #   respond_to do |format|
  #   format.html
  #   format.json {
  #     render json: {
  #       refunded_orders: refunded_orders
  #       }
  #     }
  #   end
  # end #END of def get_custom_item_refunded

  private

  def custom_item_params
    params.require(:custom_item).permit(:quantity_refunded)
  end


end
