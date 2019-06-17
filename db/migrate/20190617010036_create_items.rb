class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :category
      t.string :brand
      t.string :size
      t.string :color
      t.string :thickness
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
