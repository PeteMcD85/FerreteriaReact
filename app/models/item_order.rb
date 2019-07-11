class ItemOrder < ApplicationRecord
  belongs_to :item
  belongs_to :order

  def subtotal
    self.quantity * self.price_given
  end

  def item
    Item.find(self.item_id)
  end
end
