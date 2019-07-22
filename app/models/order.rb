class Order < ApplicationRecord
  has_many :item_orders , :dependent => :destroy
  has_many :items, through: :item_orders
  accepts_nested_attributes_for :item_orders
  enum order_type: [:sale, :buy, :void]

  def calc_subtotal_refunded
    subtotal = self.item_orders.reduce(0) { |st, item_order| st + item_order.subtotal_refunded }
    sprintf( '%.2f',subtotal * .115 )

  end

  def calc_taxes_refunded
    sprintf( '%.2f', self.subtotal_refunded * .115 )
  end

  def calc_total_refunded
    sprintf('%.2f', self.subtotal_refunded + self.taxes_refunded )
  end

  def update_subtotal

  end
end
