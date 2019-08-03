class ItemOrder < ApplicationRecord
  belongs_to :item
  belongs_to :order

  def subtotal
    sprintf('%.2f', self.quantity * self.price_given)
  end

  def calc_subtotal_refunded
     self.quantity_refunded * self.price_given
  end

  def calc_latest_quantity
    self.quantity - self.quantity_refunded
  end

  def calc_latest_subtotal
    sprintf( '%.2f', self.calc_latest_quantity * self.price_given )
  end

  def calc_item_inventory(status, old_refund, new_refund)
    if status == 'new'
      return self.item[:inventory] + self[:quantity_refunded]
    else
      new_quantity =  new_refund.to_i - old_refund.to_i
      return self.item[:inventory] + new_quantity
    end
  end

  def update_subtotal_refunded
    return self if self.update(subtotal_refunded: self.calc_subtotal_refunded)
  end

  def update_item_inventory(quantity_refunded)
    self.item.update_inventory(@item_order.calc_item_inventory)
  end
end
