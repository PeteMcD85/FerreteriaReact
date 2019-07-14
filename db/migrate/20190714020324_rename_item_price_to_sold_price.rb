class RenameItemPriceToSoldPrice < ActiveRecord::Migration[5.2]
  def change
    rename_column :items, :price, :sold_price
  end
end
