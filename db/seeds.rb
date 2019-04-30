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
the_perch.icals.create!(service:0, link: "https://www.airbnb.com/calendar/ical/11651866.ics?s=51fe1a87d1b0a8294164d35086888b5c")

puts "Created the Perch property"

