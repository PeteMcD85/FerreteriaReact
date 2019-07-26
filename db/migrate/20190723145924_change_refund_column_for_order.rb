class ChangeRefundColumnForOrder < ActiveRecord::Migration[5.2]
  def change
    change_column_default :orders, :subtotal_refunded, 0
    change_column_default :orders, :taxes_refunded, 0
    change_column_default :orders, :total_refunded, 0
    change_column_default :item_orders, :subtotal_refunded, 0
    change_column_default :item_orders, :quantity_refunded, 0
  end
end
