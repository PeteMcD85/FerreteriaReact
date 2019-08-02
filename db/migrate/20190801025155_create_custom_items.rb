class CreateCustomItems < ActiveRecord::Migration[5.2]
  def change
    create_table :custom_items do |t|
      t.string :name
      t.numeric :quantity
      t.decimal :price_given
      t.references :orders, foreign_key: true

      t.timestamps
    end
  end
end
