class AddSubtotalRefundedToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :subtotal_refunded, :decimal
  end
end
