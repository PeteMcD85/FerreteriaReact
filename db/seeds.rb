# # GRABS ALL ORDERS WITH REFUNDS
# # AND CREATES A REFUND ORDER
# orders = Order.where('total_refunded > 0')
# p orders.count
# orders.each { |order|
#   ca = order.created_at
#   sr = order.subtotal_refunded
#   tr = order.taxes_refunded
#   tor = order.total_refunded
#   order.refund_orders.create(
#     subtotal_refunded: sr,
#     total_refunded: tor,
#     taxes_refunded: tr
#     )
#   ro = RefundOrder.last
#   ro.update(:created_at => ca)
#   }
#
# p  RefundOrder.count
