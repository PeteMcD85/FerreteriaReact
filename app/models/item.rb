class Item < ApplicationRecord
  scope :distinct_categories, -> {select(:category).distinct}
  scope :get_category, -> (category) {where(["category = ?", "#{category}"])}
  scope :get_actives, -> { where(active: true) }
  validates_inclusion_of :active, in: [true, false]
end
