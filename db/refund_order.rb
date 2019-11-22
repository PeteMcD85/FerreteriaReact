# # Destroys all RefundOrders
# RefundOrder.destroy_all
#
# # GRABS ALL ORDERS WITH REFUND
orders_with_refund = Order.where('total_refunded > 0')

p 'orders_with_refund'
p orders_with_refund.count


today = Date.today.strftime("%F")
folder_name = "./db/#{today}/refund_update"
# Creates new folder refund_update
FileUtils.mkdir_p folder_name

File.open("#{folder_name}/orders_with_refund.rb", "w+") { |f| f.write(orders_with_refund.as_json) }

# # Loops through orders_with_refund
orders_with_refund.each do |order|

  # grabs all refunded item_order in the Order
  refunded_item_io = order.item_orders.select do |io|
    io.created_at != io.updated_at
  end
  # Grabs all refunded custom_item in the Order
  refunded_item_ci = order.custom_items.select do |ci|
    ci.created_at != ci.updated_at
  end

  # merges all Refunded Items for this Order
  refunded_items = refunded_item_io += refunded_item_ci


  File.open("#{folder_name}/refunded_items.rb", "a+") { |f| f.write(refunded_items.as_json) }

  # Creates a RefundOrder instance
  # IF a refunded item exists in the Order
  if refunded_items.count > 0

    # Last Refunded when the Item was last Updated
    # All updated_at's should be the same day currently
    refund_date = refunded_items[0].updated_at

    # Creates an Instance of RefundOrder belonging_to current Order
    # using the Order's saved Refund values
    refund_order = order.refund_orders.create(
      subtotal_refunded: order.subtotal_refunded,
      total_refunded: order.taxes_refunded,
      taxes_refunded: order.total_refunded
    )

    # Creates an instance of RefundItem
    # for every refunded_item in the Order
    refunded_items.each do |ri|
      refund_order.refund_items.create(
        quantity_refunded: ri.quantity_refunded,
        subtotal_refunded: ri.subtotal_refunded,
        refundable_id: ri.id,
        refundable_type: ri.class.to_s
      )
    end

    # updates created_at to match when it was orinially refunded
    refund_order.update(:created_at => refund_date)

  end # End of refunded_item_.count > 0
#
end # End of orders_with_refund.each
# p orders_with_refund.count
# p  RefundOrder.count
# p  RefundItem.count
# p orders_with_refund.select(:id).distinct.order(:id)
# p RefundOrder.select(:order_id).distinct.order(:order_id)
#

# p  RefundItem.last
