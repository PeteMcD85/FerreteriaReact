class AddQuantityRefundedToItemOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :item_orders, :quantity_refunded, :integer
  end
end
