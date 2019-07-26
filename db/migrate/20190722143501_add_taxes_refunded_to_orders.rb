class AddTaxesRefundedToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :taxes_refunded, :decimal
  end
end
