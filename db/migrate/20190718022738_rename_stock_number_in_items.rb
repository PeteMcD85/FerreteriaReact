class RenameStockNumberInItems < ActiveRecord::Migration[5.2]
  def change
    rename_column :items, :StockNumber, :stock_number
  end
end
