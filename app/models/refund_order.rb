class RefundOrder < ApplicationRecord
  belongs_to :order
  has_many :refund_items , :dependent => :destroy
<<<<<<< HEAD
=======
  validates_associated :refund_items
  validates :subtotal_refunded, :total_refunded,
    numericality: {greater_than: 0}, presence: true
  validates :taxes_refunded,
    numericality: {greater_than: -1}, presence: true
  validate :subtotal_must_equal_subtotal_refunded_summation,
   :taxes_must_be_0_or_11half_percent,
   :total_must_equal_taxes_n_subtotal, on: :update

   def subtotal_must_equal_subtotal_refunded_summation
     p 'summation'
     p refund_items
     refund_items_subtotal_summation = refund_items.reduce(0){|sum, refund_item| sum += refund_item[:subtotal_refunded]}
     p refund_items_subtotal_summation
     if refund_items_subtotal_summation != subtotal_refunded
       errors.add(:subtotal_refunded, "Subtotal Refund MUST equal the summation of all Refunded Items")
     end
   end

   def taxes_must_be_0_or_11half_percent
     if order.tax_free
       if taxes_refunded != 0
         errors.add(:taxes_refunded, "Taxes Refund MUST equal 0 for a Tax Free Order")
       else
         if taxes_refunded != (subtotal_refunded * 0.115).round(2)
           errors.add(:taxes_refunded, "Taxes Refund MUST be 11.5% of the Subtotal")
         end
       end
     end
   end

    def total_must_equal_taxes_n_subtotal
      if subtotal_refunded + taxes_refunded != total_refunded
        errors.add(:total_refunded, "Total Refund MUST equal Taxes Refunded + Subtotal Refunded")
      end
    end

>>>>>>> multiple_refunds
end
