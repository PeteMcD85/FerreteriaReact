class AddTaxFreeToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :tax_free, :boolean, :default => false
  end
end
