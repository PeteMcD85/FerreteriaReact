# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# p Item.all.count



#   items = [
#     { name: 'PVC', category: 'PVC', brand: 'Pelicano', size: '3/4', thickness: '.50', price: 44 },
#     { name: 'PVC', category: 'PVC',  brand: 'Pelicano', size: '5/8', thickness: '.50', price: 35.95 },
#     { name: 'PVC', category: 'PVC',  brand: 'Pelicano', size: '3/8', thickness: '.50', price: 23.95 },
#     { name: 'PVC', category: 'PVC',  brand: 'Pelicano', size: '1/4', thickness: '.50', price: 16.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Geoteg', size: '3/4', thickness: '.50', price: 45 },
#     { name: 'PVC', category: 'PVC',  brand: 'Geoteg', size: '5/8', thickness: '.50', price: 36.95 },
#     { name: 'PVC', category: 'PVC',  brand: 'Geoteg', size: '1/2', thickness: '.50', price: 30.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Geoteg', size: '1/4', thickness: '.50', price: 16.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '3/4', thickness: '.50', price: 44 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '5/8', thickness: '.50', price: 35.95 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '1/2', thickness: '.50', price: 30.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '1/4', thickness: '.50', price: 16.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Esmeralda', size: '3/4', thickness: '.50', price: 44 },
#     { name: 'PVC', category: 'PVC',  brand: 'Esmeralda', size: '1/2', thickness: '.50', price: 30.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Strongboard', size: '3/4', thickness: '.55', price: 49 },
#     { name: 'PVC', category: 'PVC',  brand: 'Strongboard', size: '1/2', thickness: '.55', price: 33.95 },
#     { name: 'PVC', category: 'PVC',  brand: 'Strongboard', size: '1/4', thickness: '.55', price: 17 },
#     { name: 'PVC', category: 'PVC',  brand: 'Geoteg', size: '3/4', thickness: '.55', price: 49 },
#     { name: 'PVC', category: 'PVC',  brand: 'Geoteg', size: '5/8', thickness: '.55', price: 42.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '3/4', thickness: '.55', price: 49 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '5/8', thickness: '.55', price: 42.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '1/2', thickness: '.55', price: 33.95 },
#     { name: 'PVC', category: 'PVC',  brand: 'Esmeralda', size: '3/4', thickness: '.55', price: 49 },
#     { name: 'PVC', category: 'PVC',  brand: 'Esmeralda', size: '5/8', thickness: '.55', price: 40 },
#     { name: 'PVC', category: 'PVC',  brand: 'Esmeralda (Brilloso)', size: '5/8', thickness: '.55', price: 42.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Esmeralda (Brilloso)', size: '3/4', thickness: '.55', price: 50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '1', thickness: '.60', price: 70 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '3/4', thickness: '.60', price: 56.50 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '5/8', thickness: '.60', price: 46 },
#     { name: 'PVC', category: 'PVC',  brand: 'Anibal', size: '3/4', thickness: '.65', price: 63.00 },
#     { name: 'Measuring Tape', category: 'Tools', brand: 'Stanley', size: '16\'', price: 8.95 },
#     { name: 'Contact Cement', category: 'Cement', brand: 'Lanco', size: '1 gallon', color: 'Clear, Red', price: 19.95 },
#     { name: 'Wood Glue', category: 'Glue', brand: 'Lanco', size: '1 gallon', price: 777 },
#     { name: 'Sanding Sealer Caoba', category: 'Sealer',  brand: 'Lanco', size: '1 gallon', price: 22 },
#     { name: 'Sanding Primer', category: 'Primer', brand: 'Lanco', size: '1 gallon', color: 'white', price: 33 },
#     { name: 'Lacquer', category: 'Lacquer',  brand: 'Lanco', size: '1 gallon', color: 'white', price: 33.50 },
#     { name: 'Lacquer', category: 'Lacquer',  brand: 'Lanco', size: '1 gallon', color: 'flat', price: 25 },
#     { name: 'Sanding Sealer Caoba', category: 'Sealer', brand: 'Lanco', size: '1 gallon', price: 22.95 },
#     { name: 'Lacquer', category: 'Lacquer', brand: 'Lanco', size: '1 gallon', color: 'clear', price: 22.95 },
#     { name: 'All Purpose Glue', category: 'Glue',  brand: 'Lanco', size: '1 gallon', color: 'white', price: 17.50 }
#   ]
#
#   items.each do |item|
#     Item.create(item.merge!(active:true))
#   end
#
# p items.count
#
# p items.last

# def seed_users
#   user_id = 0
#   10.times do
#     User.create(
#       name: "test#{user_id}",
#       email: "test#{user_id}@test.com",
#       password: '123456',
#       password_confirmation: '123456'
#     )
#     user_id = user_id + 1
#   end
# end

# p Item.all.count
# seed_users
# seed_items
