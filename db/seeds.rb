# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# items = [
#   { name: 'Tinte P53Q ', category: 'Tinte', brand: 'TEMAR', color: 'Wenge', size: 'Quarto', sold_price: 14, bought_price: 10 },
#   { name: 'Tinte P47Q', category: 'Tinte', brand: 'TEMAR', color: 'Ash Black', size: 'Quarto', sold_price: 14 },
#   { name: 'Tinte P38Q', category: 'Tinte', brand: 'TEMAR', color: 'Colonial Cherry', size: 'Quarto', sold_price: 14 },
#   { name: 'Tinte P26Q', category: 'Tinte', brand: 'TEMAR', color: 'Walnut', size: 'Quarto', sold_price: 14 },
#   { name: 'Tinte P20Q', category: 'Tinte', brand: 'TEMAR', color: 'Nogal Brown', size: 'Quarto', sold_price: 14 },
#
#   { name: 'Tinte P-54-04 ', category: 'Tinte', brand: 'CANMAR', color: 'Red Walnut', size: 'Quarto', sold_price: 14 },
#   { name: 'Tinte P-42-04 ', category: 'Tinte', brand: 'CANMAR', color: 'Cherry', size: 'Quarto', sold_price: 14 },
#   { name: 'Tinte P40Q', category: 'Tinte', brand: 'CANMAR', color: 'Natural Oak', size: ' Quarto', sold_price: 14 },
#   { name: 'Tinte P-26-04 ', category: 'Tinte', brand: 'CANMAR', color: 'Walnut', size: 'Quarto', sold_price: 14 },
#   { name: 'Tinte P21Q', category: 'Tinte', brand: 'CANMAR', color: 'Cherry Birch', size: ' Quarto ', sold_price: 14 },
#
#   { name: 'Tinte P54G', category: 'Tinte', brand: 'TEMAR', color: 'Red Walnut', size: 'Galón ', sold_price: 29, bought_price: 21 },
#   { name: 'Tinte P53G', category: 'Tinte', brand: 'TEMAR', color: 'Wenge', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P47G', category: 'Tinte', brand: 'TEMAR', color: 'Ash Black', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P40G', category: 'Tinte', brand: 'TEMAR', color: 'Natural Oak', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P38G', category: 'Tinte', brand: 'TEMAR', color: 'Cherry', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P32G', category: 'Tinte', brand: 'TEMAR', color: 'Red Mahogany', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P30G', category: 'Tinte', brand: 'TEMAR', color: 'Maple Wongs', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P26G', category: 'Tinte', brand: 'TEMAR', color: 'Walnut', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P21G', category: 'Tinte', brand: 'TEMAR', color: 'Cherry Birch', size: 'Galón ', sold_price: 29 },
#   { name: 'Tinte P-42-01 ', category: 'Tinte', brand: 'CANMAR', color: 'Cherry Birch', size: 'Galón ', sold_price: 29 },
#
#   { name: 'Tinte P47P', category: 'Tinte', brand: 'TEMAR', color: 'Ash Black', size: ' 5 Galón', sold_price: 100, bought_price: 69.50 },
#   { name: 'Tinte P21P', category: 'Tinte', brand: 'TEMAR', color: 'Cherry Birch', size: ' 5 Galón ', sold_price: 100, bought_price: 69.50 },
#   { name: 'Tinte P30P', category: 'Tinte', brand: 'TEMAR', color: 'Maple Wongs', size: ' 5 Galón ', sold_price: 100, bought_price: 69.50 },
#   { name: 'Tinte P54P', category: 'Tinte', brand: 'TEMAR', color: 'Walnut', size: ' 5 Galón ', sold_price: 100, bought_price: 69.50}]
#
#   items.each do |item|
#    Item.create(item.merge!(active:true))
#   end
#   p Item.all.count





# items = [
#   { name: 'Tornillos #8', category: 'Tornillos', brand: 'Hafelle', size: '3/4"', sold_price: 44 },
#   { name: 'Tornillos #8', category: 'Tornillos',  brand: 'Hafelle', size: '1"',  sold_price: 35.95 },
#   { name: 'Tornillos #8', category: 'Tornillos',  brand: 'Hafelle', size: '1 1/4"',  sold_price: 23.95 },
#   { name: 'Tornillos #8', category: 'Tornillos',  brand: 'Hafelle', size: '1 1/2"',  sold_price: 16.50 },
#   { name: 'Tornillos #8', category: 'Tornillos',  brand: 'Hafelle', size: '1 3/4"',  sold_price: 45 },
#   { name: 'Tornillos #8', category: 'Tornillos',  brand: 'Hafelle', size: '2"',  sold_price: 36.95 },
#   { name: 'Tornillos #8', category: 'Tornillos',  brand: 'Hafelle', size: '3"',  sold_price: 30.50 }
# ]
# items.each do |item|
#  Item.create(item.merge!(active:true))
# end
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


items = {items:[{name:"Cola Amarilla",category:"",brand:"Lanco",size:"16 oz",color:"Amarilla",thickness:"",sold_price:"6.5",active:true,inventory:975,bought_price:nil,stock_number:nil},{name:"Super Nail",category:"",brand:"Lanco",size:"10.1 fl oz",color:"Blanco",thickness:"",sold_price:"3.25",active:true,inventory:950,bought_price:nil,stock_number:""},{name:"White Sanding Primer",category:"",brand:"Lanco",size:"1 galon",color:"Blanco",thickness:"",sold_price:"33.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Contact Adhesive",category:"",brand:"Wilsonart",size:"1 gallon",color:"",thickness:"",sold_price:"21.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Quarto",color:"Wenge   P53Q ",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:"10.0",stock_number:""},{name:"Jig Saw Blades",category:"Herramientas",brand:"DeWalt",size:"10 Tpi",color:"",thickness:"",sold_price:"4.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Mineral Spirits",category:"",brand:"Lanco",size:"1 galon",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Contact Cement Spray",category:"",brand:"Lanco",size:"Galon",color:"Rojo",thickness:"",sold_price:"19.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"#2 Square Bit",category:"Herramientas",brand:"DeWalt",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Tape",category:"",brand:"Pro-Mask",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"PVC Cement",category:"",brand:"Lanco",size:"8 fl oz",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Silicon",category:"",brand:"Lanco",size:"10.3 fl oz",color:"Blanco",thickness:"",sold_price:"4.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Level Torpedo",category:"",brand:"Stanley",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Masillas",category:"",brand:"Lanco",size:"8 fl oz",color:"Mahogany",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Masillas",category:"",brand:"Lanco",size:"8 fl oz",color:"Cedar",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Razor Knife",category:"Herramientas",brand:"Stanley",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Masillas",category:"",brand:"Lanco",size:"",color:"Oak",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"PVC",category:"PVC",brand:"Strongboard",size:"3/4",color:nil,thickness:".55",sold_price:"49.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Strongboard",size:"1/2",color:nil,thickness:".55",sold_price:"33.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Strongboard",size:"1/4",color:nil,thickness:".55",sold_price:"17.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Geoteg",size:"3/4",color:nil,thickness:".55",sold_price:"49.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Geoteg",size:"5/8",color:nil,thickness:".55",sold_price:"42.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"3/4",color:nil,thickness:".55",sold_price:"49.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"5/8",color:nil,thickness:".55",sold_price:"42.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"",category:"Tinte",brand:"CANMAR",size:"Quarto",color:"Walnut  P-26-04 ",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"CANMAR",size:" Quarto ",color:"Cherry Birch  P21Q",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"PVC Cement",category:"",brand:"Lanco",size:"16 fl oz",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"6 Outlit Power Strip",category:"Herramientas",brand:"",size:"",color:"",thickness:"",sold_price:"5.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Slow Acrylic Retarder",category:"",brand:"Lanco",size:"Quart",color:"",thickness:"",sold_price:"11.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"CMT",category:"Herramientas",brand:"Orange Tools",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Concrete Drill Bits",category:"Herramientas",brand:"Brown",size:"5/32' X 5-1/2'",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Quarto",color:"Colonial Cherry  P38Q",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"CMT Orange Tools",category:"",brand:"",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Level",category:"Herramientas",brand:"Stanley",size:"18'",color:"",thickness:"",sold_price:"10.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Quarto",color:"Nogal Brown P20Q",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Quarto",color:"Ash Black  P47Q",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"CANMAR",size:"Quarto",color:"Red Walnut P-54-04 ",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Quarto",color:"Walnut  P26Q",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"CANMAR",size:" Quarto",color:"Natural Oak P40Q",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"CANMAR",size:"Quarto",color:"Cherry P-42-04 ",thickness:"",sold_price:"14.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"1\"  1-Libra",color:"",thickness:"#6",sold_price:"6.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Patta ",size:"1 3/4\" 500pcs",color:"",thickness:"#6",sold_price:"8.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith",size:"3\"  500pcs",color:"",thickness:" #8",sold_price:"13.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"3/4'  500pcs",color:"",thickness:"#6",sold_price:"5.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"1\"  500pcs",color:"",thickness:"#8",sold_price:"7.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"PVC",category:"PVC",brand:"Pelicano",size:"5/8",color:nil,thickness:".50",sold_price:"35.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Pelicano",size:"3/8",color:nil,thickness:".50",sold_price:"23.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Red Walnut  P54G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:"21.0",stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Wenge P53G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Natural Oak P40G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Cherry P38G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Ash Black  P47G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Maple Wongs  P30G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Red Mahogany P32G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Walnut P26G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:" 5 Galón ",color:"Walnut P54P",thickness:"",sold_price:"100.0",active:true,inventory:1000,bought_price:"69.5",stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:"Galón ",color:"Cherry Birch  P21G",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"CANMAR",size:"Galón ",color:"Cherry Birch P-42-01 ",thickness:"",sold_price:"29.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:" 5 Galón",color:"Ash Black  P47P",thickness:"",sold_price:"100.0",active:true,inventory:1000,bought_price:"69.5",stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:" 5 Galón ",color:"Cherry Birch P21P",thickness:"",sold_price:"100.0",active:true,inventory:1000,bought_price:"69.5",stock_number:""},{name:"",category:"Tinte",brand:"TEMAR",size:" 5 Galón ",color:"Maple Wongs P30P",thickness:"",sold_price:"100.0",active:true,inventory:1000,bought_price:"69.5",stock_number:""},{name:"Router Bit",category:"Herramientas",brand:"AmanaTool",size:"1/4\"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"SeamFil",category:"SeamFil",brand:"Kampel",size:"",color:"Black 914",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"PVC",category:"PVC",brand:"Pelicano",size:"1/4",color:nil,thickness:".50",sold_price:"16.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Geoteg",size:"3/4",color:nil,thickness:".50",sold_price:"45.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Geoteg",size:"5/8",color:nil,thickness:".50",sold_price:"36.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Geoteg",size:"1/2",color:nil,thickness:".50",sold_price:"30.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Geoteg",size:"1/4",color:nil,thickness:".50",sold_price:"16.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"3/4",color:nil,thickness:".50",sold_price:"44.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"5/8",color:nil,thickness:".50",sold_price:"35.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"1/2",color:nil,thickness:".50",sold_price:"30.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"1/4",color:nil,thickness:".50",sold_price:"16.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Esmeralda",size:"3/4",color:nil,thickness:".50",sold_price:"44.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Esmeralda",size:"1/2",color:nil,thickness:".50",sold_price:"30.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Tornillos",category:"Tornillos",brand:"Addith",size:"1 3/4\"  500pcs",color:"",thickness:" #8",sold_price:"9.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"2 1/2\"  500pcs",color:"",thickness:"#8",sold_price:"12.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"1 1/2\"  500pcs",color:"",thickness:"#8",sold_price:"9.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Hafelle ",size:"3/4\"  1-Libra",color:"",thickness:"#8",sold_price:"4.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Hafelle",size:"1\"  1-Libra",color:"",thickness:" #8",sold_price:"4.25",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Hafelle",size:"1 1/4\" 1-Libra",color:"",thickness:" #8",sold_price:"4.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"PVC",category:"PVC",brand:"Anibal",size:"1/2",color:nil,thickness:".55",sold_price:"33.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Esmeralda",size:"3/4",color:nil,thickness:".55",sold_price:"49.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Esmeralda",size:"5/8",color:nil,thickness:".55",sold_price:"40.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Esmeralda (Brilloso)",size:"5/8",color:nil,thickness:".55",sold_price:"42.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Esmeralda (Brilloso)",size:"3/4",color:nil,thickness:".55",sold_price:"50.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"1",color:nil,thickness:".60",sold_price:"70.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"3/4",color:nil,thickness:".60",sold_price:"56.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"5/8",color:nil,thickness:".60",sold_price:"46.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC",category:"PVC",brand:"Anibal",size:"3/4",color:nil,thickness:".65",sold_price:"63.0",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Silicon Flex",category:"",brand:"Lanco",size:"10.1 fl oz",color:"Almond",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Faucet",category:"Mezcladoras",brand:"Pfister",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Lacquer Thinner",category:"",brand:"Lanco",size:"1 galon",color:"",thickness:"",sold_price:"14.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Diamond Saw Blades",category:"Herramientas",brand:"Eagle",size:"10\"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Router Bit",category:"Herramientas",brand:"Amana",size:"1/4\"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"CapFix",category:"Herramientas",brand:"",size:"",color:"White Solid PVC",thickness:"",sold_price:"2.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Respirator",category:"Herramientas",brand:"3M",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Measuring Tape",category:"Herramientas",brand:"Stanley",size:"16'",color:"",thickness:"",sold_price:"8.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Mountaining Plate 180",category:"Gozne",brand:"Blum",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Contact Cement Spray",category:"",brand:"Lanco",size:"1 galon",color:"Clear",thickness:"",sold_price:"19.95",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"PVC Cement",category:"",brand:"Lanco",size:"Quart",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Cola Blanca",category:"",brand:"Lanco",size:"16 0z",color:"",thickness:"",sold_price:"5.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Cola Amarilla",category:"",brand:"Lanco",size:"8 oz",color:"Amarilla",thickness:"",sold_price:"4.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Cola Blanca",category:"",brand:"Lanco",size:"1 galon",color:"",thickness:"",sold_price:"17.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"",category:"",brand:"Sait",size:"5\" 100X A/O",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Cola Blanca",category:"",brand:"Lanco",size:"8 0z",color:"",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Corner Braces",category:"",brand:"",size:"2 X 5/8",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Saw Blades",category:"Herramientas",brand:"Brown",size:"7 1/4'  40T",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Sanding Sealer",category:"",brand:"Lanco",size:"1 galon",color:"",thickness:"",sold_price:"22.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Sanding Sealer Coaba",category:"",brand:"Lanco",size:"1 galon",color:"",thickness:"",sold_price:"22.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"White Lacquer",category:"",brand:"Lanco",size:"1 galon",color:"Blanco",thickness:"",sold_price:"33.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Razor Blades",category:"Herramientas",brand:"Stanley",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Silicon Flex",category:"",brand:"Lanco",size:"10.1 fl oz",color:"Brown",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Measuring Tape",category:"Herramientas",brand:"Brown",size:"16'",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Silicon",category:"",brand:"Lanco",size:"10.3 fl oz",color:"Claro",thickness:"",sold_price:"4.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Industrial Red Contact Cement",category:"",brand:"Lanco",size:"1 galon",color:"Rojo",thickness:"",sold_price:"21.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Silicon Flex",category:"",brand:"Lanco",size:"10.1 fl oz",color:"Almond",thickness:"",sold_price:"3.5",active:nil,inventory:1000,bought_price:nil,stock_number:nil},{name:"Power Lock Measuring Tape",category:"Herramientas",brand:"Stanley",size:"25'",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"HandSaw",category:"Herramientas",brand:"Stanley",size:"",color:"",thickness:"",sold_price:"7.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Router Bit",category:"Herramientas",brand:"AmanaTool",size:"5/8.  9/32",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Concrete Drill Bits",category:"Herramientas",brand:"Brown",size:"3/16",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Masillas",category:"",brand:"Lanco",size:"8 fl oz",color:"Pine",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Silicon Flex",category:"",brand:"Lanco",size:"10.1 fl oz",color:"Blanco",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Cinta de papel",category:"Herramientas",brand:"",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Masillas",category:"",brand:"Lanco",size:"8 fl oz",color:"Walnut",thickness:"",sold_price:"3.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tape",category:"",brand:"HyStik",size:"",color:"",thickness:"",sold_price:"4.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Mineral Spirits",category:"",brand:"Lanco",size:"Quarto",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Lacquer Thinner",category:"",brand:"Lanco",size:"Quarto",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Clear Laquer",category:"",brand:"Lanco",size:"1 galon",color:"Clear",thickness:"",sold_price:"22.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Adhesive Cleaner",category:"",brand:"Wilsonart",size:"Galon",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Clear Laquer",category:"",brand:"Lanco",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"SeamFil",category:"SeamFil",brand:"Kampel",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Contact Cement",category:"",brand:"Lanco",size:"1 gallon",color:"Clear",thickness:"",sold_price:"18.5",active:true,inventory:1000,bought_price:nil,stock_number:nil},{name:"Plastic Emblem \u0026 Trim Adhesive",category:"",brand:"3M",size:"1 fl oz",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"SeamFil",category:"SeamFil",brand:"Kampel",size:"",color:"",thickness:"",sold_price:"0.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"SeamFil",category:"SeamFil",brand:"Kampel",size:"",color:"",thickness:"",sold_price:nil,active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith",size:"3/4\"  500pcs",color:"",thickness:" #8",sold_price:"6.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"SeamFil",category:"SeamFil",brand:"Kampel",size:"",color:"1750 Special",thickness:"",sold_price:"9.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith",size:"5/8\"  500pcs",color:"",thickness:" #6",sold_price:"5.0",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"1 1/4\"  1-Libra",color:"",thickness:"#6",sold_price:"6.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Hafelle ",size:"1 1/4\" 1-Libra",color:"",thickness:"#6",sold_price:"4.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Hafelle ",size:"2\"  1-Libra",color:"",thickness:"#6",sold_price:"8.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Castell ",size:"1 3/4\"  500pcs",color:"",thickness:"#6",sold_price:"8.5",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"1 1/4\"  500pcs.",color:"",thickness:"#8",sold_price:"7.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith #8",size:"1 1/4\"  500pcs.",color:"",thickness:"",sold_price:nil,active:nil,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith #8",size:"1 1/4\"  500pcs.",color:"",thickness:"",sold_price:"7.95",active:nil,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"2\" 500pcs",color:"",thickness:"#8",sold_price:"10.95",active:true,inventory:1000,bought_price:nil,stock_number:""},{name:"Tornillos",category:"Tornillos",brand:"Addith ",size:"1 1/2'  500pcs",color:"",thickness:"#6",sold_price:"7.5",active:true,inventory:1000,bought_price:nil,stock_number:""}]}


items[:items].each do |val|
Item.create(val)
end



# items.each do |item|
#   item.pic_url = ''
#   Item.create(item)
# end
