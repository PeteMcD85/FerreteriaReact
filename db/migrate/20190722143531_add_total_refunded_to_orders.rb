class AddTotalRefundedToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :total_refunded, :decimal
  end
end
