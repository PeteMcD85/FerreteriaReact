# db = {
#   items: Item.all.as_json,
#   orders: Order.all.as_json,
#   custom_items: CustomItem.all.as_json,
#   item_orders: ItemOrder.all.as_json
# }

items = Item.all.as_json
orders = Order.all.as_json
custom_items = CustomItem.all.as_json
item_orders = ItemOrder.all.as_json
refund_orders = RefundOrder.all.as_json
refund_items = RefundItem.all.as_json

today = Date.today.strftime("%F")
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
