class Item < ApplicationRecord
  has_many :item_orders, :dependent => :destroy
  has_many :items, through: :item_orders
  has_one_attached :pic
  scope :distinct_brands, -> {select(:brand).distinct}
  scope :get_brand, -> (brand) {where(["brand = ?", "#{brand}"])}
  scope :remove_brand, -> (brand) {where(["brand != ?", "#{brand}"])}

  scope :distinct_categories, -> {select(:category).distinct}
  scope :get_category, -> (category) {where(["category = ?", "#{category}"])}
  scope :remove_category, -> (category) {where(["category != ?", "#{category}"])}

  scope :get_actives, -> { where(active: true) }
  scope :get_inactives, -> { where(active: false) }
  # validates_inclusion_of :active, in: [true, false]
  def update_inventory(quantity)
    self.update(inventory: quantity)
  end

  def set_default_value
    self[:category] ? self[:category] : ""
  end

end
