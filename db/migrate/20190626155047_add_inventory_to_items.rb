class AddInventoryToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :inventory, :integer
  end
end
