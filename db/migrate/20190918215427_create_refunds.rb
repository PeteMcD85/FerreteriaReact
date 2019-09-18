class CreateRefunds < ActiveRecord::Migration[5.2]
  def change
    create_table :refunds do |t|
      t.integer :quantity_refunded, default: 0
      t.decimal :subtotal_refunded, default: "0.0"
      t.references :refundable, polymorphic: true
      t.timestamps
    end
  end
end
