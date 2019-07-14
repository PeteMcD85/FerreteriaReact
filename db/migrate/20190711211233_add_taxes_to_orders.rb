class AddTaxesToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :taxes, :decimal
  end
end
