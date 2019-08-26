class ChangeCustomItemsQuantity < ActiveRecord::Migration[5.2]
  def change
    change_column :custom_items, :quantity, :integer
  end
end
