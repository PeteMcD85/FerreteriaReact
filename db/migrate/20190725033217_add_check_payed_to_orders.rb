class AddCheckPayedToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :check_payed, :decimal
  end
end
