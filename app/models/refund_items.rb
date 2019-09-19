class RefundItem < ApplicationRecord
  belongs_to :refundable, polymorphic: true
end
