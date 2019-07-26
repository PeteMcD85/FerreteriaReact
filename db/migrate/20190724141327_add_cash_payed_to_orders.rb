class AddCashPayedToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :cash_payed, :decimal
  end
end
