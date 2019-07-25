class AddDefaultValuesToOrders < ActiveRecord::Migration[5.2]
  def change
    change_column_default :orders, :cash_payed, 0
    change_column_default :orders, :credit_card_payed, 0
    change_column_default :orders, :check_payed, 0
    change_column_default :orders, :debit_payed, 0
  end
end
