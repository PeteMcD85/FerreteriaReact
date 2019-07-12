class Order < ApplicationRecord
  has_many :item_orders , :dependent => :destroy
  has_many :items, through: :item_orders
  accepts_nested_attributes_for :item_orders
  enum order_type: [:sale, :buy, :void]
end
