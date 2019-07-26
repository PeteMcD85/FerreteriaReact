class Order < ApplicationRecord
  has_many :item_orders , :dependent => :destroy
  has_many :items, through: :item_orders
  accepts_nested_attributes_for :item_orders
  enum order_type: [:sale, :buy, :void]

  def calc_subtotal_refunded
    p "+++++++++++++++++++++++++++++++"
    p self.item_orders
    subtotal = self.item_orders.reduce(0) { |st, item_order| st + item_order.subtotal_refunded }
    sprintf( '%.2f', subtotal )
  end

  def calc_taxes_refunded
    taxes = self.taxes == 0 ? 0 : self.subtotal_refunded * 0.115
    sprintf( '%.2f', taxes )
  end

  def calc_total_refunded
    sprintf('%.2f', self.subtotal_refunded + self.taxes_refunded )
  end

  def update_subtotal_refunded
    return self if self.update(subtotal_refunded: self.calc_subtotal_refunded)
  end

  def update_taxes_refunded
    return self if self.update(taxes_refunded: self.calc_taxes_refunded)
  end

  def update_total_refunded
    return self if self.update(total_refunded: self.calc_total_refunded)
  end

end
