class OrdersController < ApplicationController
layout 'orders'
protect_from_forgery :except => [:create]

  def index
  end

  def show
    @order = Order.find(params[:id])
    p '++++++++++++++++ Order ++++++++++++++++++'
    p @order
    refund_orders = @order.refund_orders
    @cart = @order.item_orders
    @cart_item_orders = @cart.map {|cart_item| Item.find(cart_item.item_id) }
    @cart_custom_items = @order.custom_items.map {|cart_item| CustomItem.find(cart_item.id) }
    @subtotal_final = @order.subtotal - refund_orders.reduce(0) { |sum, ro| sum + ro.subtotal_refunded }
    @taxes_final = @order.taxes -  refund_orders.reduce(0) { |sum, ro| sum + ro.taxes_refunded }
    @total_final = @order.total - refund_orders.reduce(0) { |sum, ro| sum + ro.total_refunded }
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
    if @order.update(order_payment_params)
      render :json => { order: @order , url: url_for(order_path(@order))}
    else
      render :json => { }, :status => 500
    end
  end

  def create
    p '================================'
    p params
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
            name: cart_item[:item][:name]
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

  def destroy
      @order = Order.find(params[:id])

      @order.item_orders.each do |item_order|

        if item_order.quantity_refunded < item_order.quantity
          quantity_difference = item_order.quantity - item_order.quantity_refunded
          p 'item_id=========================='
          quant_refunded = item_order.refund_items.reduce(0) {|total, ri| total += ri.quantity_refunded}
          item_order.item.update_inventory(item_order.item.inventory + quantity_difference - quant_refunded)
        end
      end
      @order.destroy
      redirect_to orders_path
  end

  def get_orders_refunded
    start_date = params[:startDate]
    if start_date != 'undefined'
      start_date = Date.parse(start_date).beginning_of_day
      end_date = DateTime.parse(params[:endDate]).end_of_day
      refund_orders = RefundOrder.get_refund_orders(start_date, end_date)
      orders = Order.get_orders(start_date, end_date).map{|o| o.as_json.merge!(refund: o.refund_orders.reduce(0){|sum, ro| sum += ro.total_refunded})}
    end

    refund_orders = refund_orders.distinct_orders.map{|val|
      order = Order.find(val.order_id)
      total_ref = order.refund_orders.reduce(0){ |sum, ro|
        sum + ro.subtotal_refunded + ro.taxes_refunded
      }
      order.as_json.merge!(total_ref: total_ref )
    }
    respond_to do |format|
    format.html
    format.json {
      render json: {
        refunded_orders: refund_orders,
        orders: orders
        }
      }
    end
  end

  def get_orders_searched
    query = params[:query].downcase
    orders = Order.get_orders_searched(query)
    respond_to do |format|
    format.html
    format.json {
      render json: {
        orders: orders
        }
      }
    end
  end

  private

  def order_payment_params
    params.require(:order).permit(:cash_payed, :credit_card_payed, :check_payed, :debit_payed)
  end

  def order_params
    params.require(:order)
      .permit(
        :order_type,
        :subtotal,
        :taxes,
        :total,
        :tax_free,
        :cash_payed,
        :credit_card_payed,
        :debit_payed,
        :check_payed,
        :name,
        :telephone
      )
  end

end
