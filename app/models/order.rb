class Order < ApplicationRecord
  has_many :item_orders
  has_many :items, through: :item_orders
  enum type: [:sale, :buy]
end
