orders = Order.all
custom_errors = orders.select {|order| order[:credit_card_payed] + order[:cash_payed] + order[:debit_payed] + order[:check_payed] != total}
p custom_errors
