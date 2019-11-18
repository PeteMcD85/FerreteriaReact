module OrdersHelper
  def display_price(number)
    number_with_precision(number, :precision => 2, :delimiter => ',' )
  end

  def display_refund(item, column)
    item_class = item.class
    item = item_class.find(item.id)
    item.refund_items.reduce(0) {|sum, item| sum + item[column]}
  end
end
