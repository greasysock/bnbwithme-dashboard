# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(email:"a@a.com", password:"password", first_name: "Chris", last_name: "Gresock")
puts "Created a@a.com user"

the_perch = Property.create!(name:"The Perch")
the_perch.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/11651866.ics?s=51fe1a87d1b0a8294164d35086888b5c")
the_perch.icals.create!(service: :vrbo, link: "http://admin.vrbo.com/icalendar/bd6b684b3f054055a440a5e51df8bac1.ics?nonTentative")
puts "Created The Perch property"

the_condo = Property.create!(name:"The Condo")
the_condo.icals.create!(service: :airbnb, link: "https://www.airbnb.com/calendar/ical/3740462.ics?s=5563a45c9f2c8e37a3e48875c528deb0")
the_condo.icals.create!(service: :vrbo, link: "http://admin.vrbo.com/icalendar/58acab60fe7948b18bf4e30fc8d5bcec.ics?nonTentative")
puts "Created The Condo property"
