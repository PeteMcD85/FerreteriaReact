class Item < ApplicationRecord
  has_and_belongs_to_many :customer_orders
  has_one_attached :pic
  scope :distinct_brands, -> {select(:brand).distinct}
  scope :get_brand, -> (brand) {where(["brand = ?", "#{brand}"])}
  scope :remove_brand, -> (brand) {where(["brand != ?", "#{brand}"])}

  scope :distinct_categories, -> {select(:category).distinct}
  scope :get_category, -> (category) {where(["category = ?", "#{category}"])}
  scope :remove_category, -> (category) {where(["category != ?", "#{category}"])}

  scope :get_actives, -> { where(active: true) }
  scope :get_inactives, -> { where(active: false) }
  validates_inclusion_of :active, in: [true, false]

  def get_brands(array_of_brands)
    array_of_brands.each do |brand|

    end
  end

end
