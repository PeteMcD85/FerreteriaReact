class AddSubtotalRefundedToItemOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :item_orders, :subtotal_refunded, :decimal
  end
end
