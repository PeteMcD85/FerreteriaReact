class AddDebtToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :debt, :decimal
  end
end
