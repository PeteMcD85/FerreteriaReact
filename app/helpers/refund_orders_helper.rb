module RefundOrdersHelper
  def display_item_name(refund_item)
    refund_item.refundable.item_id ? refund_item.refundable.item.name : refund_item.refundable.name
  end
end
