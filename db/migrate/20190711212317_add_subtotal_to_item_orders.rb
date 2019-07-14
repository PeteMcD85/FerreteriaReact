class AddSubtotalToItemOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :item_orders, :subtotal, :decimal
  end
end
