class AddStockNumberToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :StockNumber, :string
  end
end
