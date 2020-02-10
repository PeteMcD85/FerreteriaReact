# db = {
#   items: Item.all.as_json,
#   orders: Order.all.as_json,
#   custom_items: CustomItem.all.as_json,
#   item_orders: ItemOrder.all.as_json
# }

# Totals that are less than 0
# totals_0_less = Order.all.where('total < 0')


bad_item_orders = ItemOrder.all.select(:order_id).where('quantity < 0 OR price_given < 0').distinct

bad_custom_items = CustomItem.all.select(:order_id).where('quantity < 0 OR price_given < 0').distinct

bad_orders = (bad_item_orders + bad_custom_items).map { |i| i[:order_id]  }.uniq.sort


#Payments that does not equal total
payments_greater_total = Order.all.where('(COALESCE(cash_payed,0) + COALESCE(credit_card_payed,0) + COALESCE(debit_payed,0) + COALESCE(check_payed,0)) <> total ')

today = Date.today.strftime("%F")payments_greater_total = Order.all.where('(cash_payed + credit_card_payed + debit_payed + check_payed) <> total ')
today_db = "./db/backups/#{today}"

# Creates new folder named TODAYS DATE
FileUtils.mkdir_p today_db

# Creates a file for all relevamt Models
File.open("#{today_db}/items.rb", "w+") { |f| f.write(items) }
File.open("#{today_db}/orders.rb", "w+") { |f| f.write(orders) }
File.open("#{today_db}/custom_items.rb", "w+") { |f| f.write(custom_items) }
File.open("#{today_db}/item_orders.rb", "w+") { |f| f.write(item_orders) }
# File.open("#{today_db}/refund_orders.rb", "w+") { |f| f.write(refund_orders) }
# File.open("#{today_db}/refund_items.rb", "w+") { |f| f.write(refund_items) }
