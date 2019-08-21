class OrdersController < ApplicationController
layout 'orders'
protect_from_forgery :except => [:create]

  def index
    @orders = Order.all.order(:id)
    respond_to do |format|
      format.html
      format.json {
        render json: {
          #orders: @orders
          # items: Item.all
           item_orders: ItemOrder.all
          # Order.all

        }
      }
    end
  end

  def show
    @order = Order.find(params[:id])
    @cart = @order.item_orders
    @cart_item_orders = @cart.map {|cart_item| Item.find(cart_item.item_id) }
    @cart_custom_items = @order.custom_items.map {|cart_item| CustomItem.find(cart_item.id) }
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

  def edit
    @order = Order.find(params[:id])
    @cart = @order.item_orders
    @cart_item_orders = @cart.map {|cart_item| Item.find(cart_item.item_id) }
    @cart_custom_items = @order.custom_items.map {|cart_item| CustomItem.find(cart_item.id) }
  end

  def update
    @order = Order.find(params[:id])
    p '++++++++++++++++++++++++++++++++++++++++'
    p params
    if @order.update(order_payment_params)
      render :json => { order: @order , url: url_for(order_path(@order))}
    else
      render :json => { }, :status => 500
    end
  end

  def create
    order = params[:order]
    cart_items = order[:itemOrders][:cartItems]
    cart_total = order[:itemOrders][:cartTotal]
    order_errors = []
    order_params = {
      order_type: order[:orderType],
      subtotal: cart_total[:subtotal],
      taxes: cart_total[:taxes],
      total: cart_total[:total],
      tax_free: order[:taxFree],
      cash_payed: order[:cashPayed],
      credit_card_payed: order[:creditCardPayed],
      debit_payed: order[:debitPayed],
      check_payed: order[:checkPayed],
      name: order[:orderName],
      telephone: order[:orderPhone]
    }
    @order = Order.new(order_params)
    if @order.save
      cart_items.each do |cart_item|
        item_id = cart_item[:item][:id]
        item = Item.find(item_id) if item_id < 9999
        if item
          @item_order = @order.item_orders.new(
            item_id: cart_item[:item][:id],
            order_id: @order[:id],
            quantity: cart_item[:quantity],
            price_given: cart_item[:priceGiven],
            subtotal: cart_item[:subtotal]
          )
          if @item_order.save
            new_quantity = item[:inventory] - cart_item[:quantity]
            item.update( inventory: new_quantity )
          else
            order_errors.push("Item order was not saved")
          end # end of item_order.save
        else
          @custom_items = @order.custom_items.new(
            quantity: cart_item[:quantity],
            price_given: cart_item[:priceGiven],
            subtotal: cart_item[:subtotal],
            name: cart_item[:name]
          )
          if @custom_items.save

          else
            order_errors.push("Custom item was not saved")
          end
        end #end of if and else item
      end # end of cart_items.each
      return render :json => { order_id: @order.id , order_errors: order_errors}
    else
      render :json => { }, :status => 500
    end
  end

  private

  def order_payment_params
    params.require(:order).permit(:cash_payed, :credit_card_payed, :check_payed, :debit_payed)
  end

end
