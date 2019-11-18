class RefundItem < ApplicationRecord
  belongs_to :refund_order
  belongs_to :refundable, polymorphic: true

  validates :subtotal_refunded,
    numericality: {greater_than: 0}, presence: true
  validates :quantity_refunded,
      numericality: {greater_than: 0, only_integer: true}, presence: true
  # validate :subtotal_must_equal_subtotal_refunded_summation,
  #  :taxes_must_be_0_or_11half_percent,
  #  :total_must_equal_taxes_n_subtotal
  #
  #  def subtotal_must_equal_quantity_refunded_n_price_given
  #    refund_items_subtotal_summation = refund_items.reduce(0){|sum, refund_item| sum += refund_item[:subtotal_refunded]}
  #    if refund_items_subtotal_summation != subtotal_refunded
  #      errors.add(:subtotal_refunded, "Subtotal Refund MUST equal the summation of all Refunded Items")
  #    end
  #  end
  #
  #  def taxes_must_be_0_or_11half_percent
  #    if order.tax_free
  #      if taxes_refunded != 0
  #        errors.add(:taxes_refunded, "Taxes Refund MUST equal 0 for a Tax Free Order")
  #      else
  #        if taxes_refunded != (subtotal_refunded * 0.115).round(2)
  #          errors.add(:taxes_refunded, "Taxes Refund MUST be 11.5% of the Subtotal")
  #        end
  #      end
  #    end
  #  end
  #
  #   def total_must_equal_taxes_n_subtotal
  #     if subtotal_refunded + taxes_refunded != total_refunded
  #       errors.add(:total_refunded, "Total Refund MUST equal Taxes Refunded + Subtotal Refunded")
  #     end
  #   end
end
