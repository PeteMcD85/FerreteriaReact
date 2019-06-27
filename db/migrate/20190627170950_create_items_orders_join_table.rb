class CreateItemsOrdersJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :items, :orders do |t|
      t.integer :item_id
      t.integer :order_id
    end
  end
end
