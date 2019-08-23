class CustomItem < ApplicationRecord
  belongs_to :order

  scope :get_custom_items_refunded, -> (start_date, end_date) {where(["updated_at >= ? AND updated_at <= ?", start_date, end_date])}
  scope :distinct_orders, -> {select(:order_id).distinct}

  def calc_subtotal_refunded
    sprintf( '%.2f', self.quantity_refunded * self.price_given)

  end

  def update_subtotal_refunded
    return self if self.update(subtotal_refunded: self.calc_subtotal_refunded)
  end
end
