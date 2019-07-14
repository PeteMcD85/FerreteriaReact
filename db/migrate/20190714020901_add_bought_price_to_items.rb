class AddBoughtPriceToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :bought_price, :decimal, precision: 10, scale: 2
  end
end
