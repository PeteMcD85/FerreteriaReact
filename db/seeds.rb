

file = File.read("db/backups/2019-11-24/custom_items.rb")
#
new_content = file.gsub(/(?<="updated_at"=>)(.*?)(?=\})/, '"\1"').gsub(/(?<="created_at"=>)(.*?)(?=\, "updated)/, '"\1"')
#
File.open("db/backups/2019-11-24/custom_items.rb", 'w+') {|f|
  f.write new_content
}

file = File.read("db/backups/2019-11-24/item_orders.rb")

new_content = file.gsub(/(?<="updated_at"=>)(.*?)(?=\, "price_given)/, '"\1"').gsub(/(?<="created_at"=>)(.*?)(?=\, "updated)/, '"\1"')
# p new_content

File.open("db/backups/2019-11-24/item_orders.rb", 'w+') {|f|
  f.write new_content
}

file = File.read("db/backups/2019-11-24/orders.rb")

new_content = file.gsub(/(?<="updated_at"=>)(.*?)(?=\, "order)/, '"\1"').gsub(/(?<="created_at"=>)(.*?)(?=\, "updated)/, '"\1"')
# p new_content

File.open("db/backups/2019-11-24/orders.rb", 'w+') {|f|
  f.write new_content
}

file = File.read("db/backups/2019-11-24/items.rb")

new_content = file.gsub(/(?<="updated_at"=>)(.*?)(?=\, "image)/, '"\1"').gsub(/(?<="created_at"=>)(.*?)(?=\, "updated)/, '"\1"')
# p new_content

File.open("db/backups/2019-11-24/items.rb", 'w+') {|f|
  f.write new_content
}
