class RefundOrder < ApplicationRecord
  belongs_to :order
  has_many :refund_items
end
