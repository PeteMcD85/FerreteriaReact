class AddLatestQuantityToItemOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :item_orders, :latest_quantity, :integer
  end
end
