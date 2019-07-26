class AddDebitPayedToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :debit_payed, :decimal
  end
end
