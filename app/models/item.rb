class Item < ApplicationRecord
  scope :distinct_categories, -> {select(:category).distinct}
  scope :get_category, -> (category) {where(["category = ?", "#{category}"])}
end
