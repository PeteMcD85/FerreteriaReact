class Refund < ApplicationRecord
  belongs_to :refundable, polymorphic: true
end
