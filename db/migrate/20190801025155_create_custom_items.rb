class CreateCustomItems < ActiveRecord::Migration[5.2]
  def change
    create_table :custom_items do |t|
      t.string :name
      t.numeric :quantity
      t.decimal :price_given
      t.decimal :subtotal
      t.integer :quantity_refunded, default: 0
      t.decimal :subtotal_refunded, default: "0.0"
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
