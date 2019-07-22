class ItemOrder < ApplicationRecord
  belongs_to :item
  belongs_to :order


  def subtotal
    sprintf('%.2f', self.quantity * self.price_given)
  end

  def item
    Item.find(self.item_id)
  end

  def calc_subtotal
    self.latest_quantity * self.price_given
  end

  def calc_subtotal_refunded
    sprintf( '%.2f', self.quantity_refunded * self.price_given )
  end
  
  def calc_latest_quantity
    self.quantity - self.quantity_refunded
  end

  def calc_item_inventory
    self.item[:inventory] + self[:quantity_refunded]
  end

  def update_subtotal
    return self if self.update(subtotal: self.calc_subtotal)
  end

  def update_latest_quantity
    return self if self.update(latest_quantity: self.calc_latest_quantity)
  end

  def update_item_order
    self.update_latest_quantity.update_subtotal
  end

  def update_item_inventory
    self.item.update_inventory(self.calc_item_inventory)
  end

  def update_subtotal_refunded
    return self if self.update(subtotal_refunded: self.calc_subtotal_refunded)
  end



end
