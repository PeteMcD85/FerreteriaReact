class CustomItem < ApplicationRecord
  belongs_to :order

  def calc_subtotal_refunded
    sprintf( '%.2f', self.quantity_refunded * self.price_given)

  end

  def update_subtotal_refunded
    return self if self.update(subtotal_refunded: self.calc_subtotal_refunded)
  end
end
