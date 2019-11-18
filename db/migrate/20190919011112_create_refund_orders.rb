class CreateRefundOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :refund_orders do |t|
      t.references :order
      t.decimal "subtotal_refunded"
      t.decimal "taxes_refunded"
      t.decimal "total_refunded"
      t.timestamps
    end
  end
end
