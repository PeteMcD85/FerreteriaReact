## +++++++++++++++ STEP 1 +++++++++++++++
## check if theres any orders without payment methods
# orders = Order.all.where(credit_card_payed: nil)
# orders.each do |order|
#   order.update(credit_card_payed:0 , cash_payed:order.total , debit_payed:0 , check_payed:0)
# end
# p orders

## +++++++++++++ STEP 2 +++++++++++++++
orders = Order.all




## checks HOW MANY are NOT EQUAL to TOTAL
# p '======== TOTAL COUNT Not equal ======='
# p total_count = orders.select(:id).where('credit_card_payed + cash_payed + debit_payed + check_payed != total')
# p total_count.count
#
# p '++++++++START COPY and SAVE++++++++++'
# total_count.each{|order| p order[:id]}
# p total_count.group('created_at::date').count
# p '++++++++END COPY and SAVE++++++++++'





## checks HOW MANY are LESS THAN the TOTAL
## IF NOT 0 **PROBLEM**
# p '==== LESS THAN TOTAL - BELOW MUST BE 0 (PROBLEM IF NOT) ====='
# p less_than_total = orders.select(:id).where('credit_card_payed + cash_payed + debit_payed + check_payed < total').order(:created_at)
# p less_than_total.count

# p '++++++++START COPY and SAVE++++++++++'
# less_than_total.each{|order| p order[:id]}
# p less_than_total.group('created_at::date').count
# p '++++++++END COPY and SAVE++++++++++'





## checks HOW MANY are GREATER THAN the TOTAL
## SHOULD be EQUAL to STEP 2.1
p '===== GREATER THAN TOTAL - MUST BE EQUAL TO TOTAL COUNT ========'
greater_than_total = orders.where('(credit_card_payed + cash_payed + debit_payed + check_payed) > total')
p greater_than_total.count





## MUST COPY ALL ID's and  dates
# p '++++++++START COPY and SAVE++++++++++'
# greater_than_total.each{|order| p order[:id]}
# p greater_than_total.group('created_at::date').count
# p '++++++++END COPY and SAVE++++++++++'

p '==== List we are going to up date below ====='
p difference_less_than_cash_payed = greater_than_total.where('((credit_card_payed + cash_payed + debit_payed + check_payed) -  total) < cash_payed')

p '++++++++START COPY and SAVE++++++++++'
difference_less_than_cash_payed.each{|order| p order[:id]}
p difference_less_than_cash_payed.group('created_at::date').count
p '++++++++END COPY and SAVE++++++++++'

difference_less_than_cash_payed.each do |order|
  difference = (order[:credit_card_payed] + order[:cash_payed] + order[:debit_payed] + order[:check_payed]) -  order[:total]
  cash_payed = order[:cash_payed] - difference
  p '=================='
  p order
  p cash_payed
  # order.update(cash_payed: cash_payed)
end











# orders.where('credit_card_payed + cash_payed + debit_payed + check_payed != total').group('created_at::date').count
