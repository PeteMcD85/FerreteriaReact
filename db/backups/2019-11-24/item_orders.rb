

item_orders.each do |item_order|
  ItemOrder.create(item_order)
end


p ItemOrder.count