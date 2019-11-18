class CreateRefundItems < ActiveRecord::Migration[5.2]
  def change
    create_table :refund_items do |t|
      t.integer :quantity_refunded, default: 0
      t.decimal :subtotal_refunded, default: "0.0"
      t.references :refund_order
      t.references :refundable, polymorphic: true

      t.timestamps
    end
  end
end
