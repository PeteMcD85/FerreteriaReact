class Item < ApplicationRecord
  has_many :item_orders, :dependent => :destroy
  has_many :refund_items, through: :item_orders
  has_one_attached :pic
  scope :distinct_brands, -> {select(:brand).distinct}
  scope :get_brand, -> (brand) {where(["brand = ?", "#{brand}"])}
  scope :remove_brand, -> (brand) {where(["brand != ?", "#{brand}"])}

  scope :distinct_categories, -> {select(:category).distinct}
  scope :get_category, -> (category) do
    Rails.cache.fetch("items_#{category}") { where(["category = ?", "#{category}"])}
  end
  scope :remove_category, -> (category) {where(["category != ?", "#{category}"])}

  scope :get_actives, -> do
    Rails.cache.fetch("items_active") do
      puts 'evaluating get_actives...'
      where active: true
    end
  end

  scope :get_inactives, -> do
    Rails.cache.fetch("items_inactive") do
      puts 'evaluating get_inactives...'
      where active: false
    end
  end

  scope :get_ordered_actives, -> do
    Rails.cache.fetch("ordered_active_items") do
      puts 'evaluating get_ordered_actives...'
      get_actives.order(:brand, :thickness, :size, :name)
    end
  end

  scope :get_ordered_inactives, -> do
    Rails.cache.fetch("ordered_inactive_items") do
      puts 'evaluating get_ordered_inactives...'
      get_inactives.order(:brand, :thickness, :size, :name)
    end
  end



  # after_commit :flush_cache!

  def update_inventory(quantity)
    self.update(inventory: quantity)
  end

  def set_default_value
    self[:category] ? self[:category] : ""
  end



  def flush_cache!
  puts 'flushing the cache...'
  Rails.cache.delete 'items_active'
  Rails.cache.delete "items_inactive"
end

end
