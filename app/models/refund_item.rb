class RefundItem < ApplicationRecord
  belongs_to :refund_order
  belongs_to :refundable, polymorphic: true
end
