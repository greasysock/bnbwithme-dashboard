# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
u = User.create!(email:"a@a.com", password:"password", first_name: "Chris", last_name: "Gresock")
puts "Created a@a.com user"

the_perch = Property.create!(name:"The Perch", owner: u, color: "284ab3")
the_perch.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/11651866.ics?s=51fe1a87d1b0a8294164d35086888b5c")
the_perch.icals.create!(service: :vrbo, link: "http://admin.vrbo.com/icalendar/bd6b684b3f054055a440a5e51df8bac1.ics?nonTentative")
puts "Created The Perch property"

the_condo = Property.create!(name:"The Condo", owner: u, color: "7828b3")
the_condo.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/3740462.ics?s=5563a45c9f2c8e37a3e48875c528deb0")
the_condo.icals.create!(service: :vrbo, link: "http://admin.vrbo.com/icalendar/58acab60fe7948b18bf4e30fc8d5bcec.ics?nonTentative")
puts "Created The Condo property"

the_patch = Property.create!(name: "The Patch", owner: u, color: "b32876")
the_patch.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/11653044.ics?s=5ed121d92f6bee5bafda308183048bcd")
the_patch.icals.create!(service: :vrbo, link: "http://admin.vrbo.com/icalendar/902119f3105b4c1796e181a6f01c7b2f.ics?nonTentative")
puts "Created The Patch property"

the_cottage = Property.create!(name: "The Cottage", owner: u, color: "28b348")
the_cottage.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/15596968.ics?s=fc6ab86f3d94332636c0a1b4048bfbc2")
the_cottage.icals.create!(service: :vrbo, link: "http://admin.vrbo.com/icalendar/fc41cd70b3e4456cbd9eb7a67d5d80ba.ics?nonTentative")
puts "Created The Cottage property"

cottonwood_house = Property.create!(name: "Cottonwood House", owner: u, color: "b37a28")
cottonwood_house.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/23120954.ics?s=af2a35310d726b18f5cdce7986c38e23")
puts "Create Cottonwood House property"