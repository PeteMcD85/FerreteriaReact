class AddPriceGivenToItemOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :item_orders, :price_given, :decimal
  end
end
