# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

userTest = User.create(firstName: "Ellyn", lastName: "Anderson", phone: 7853175331, username: "eka249", city: "Wichita", password_digest: "1234")

requestTest = Request.create(user_ID: 1, title: "This is a test request", description: "the description for the test request", category: "hospital", location: "Rock Rd")


requestTest2 = Request.create(user_ID: 1, title: "Allie wants beans", description: "go to Taco Shop for me", category: "Urgent", location: "Harry and Webb")

convotest1 = Convo.create(fromID: 1, toID: 2)
convotest2 = Convo.create(fromID: 2, toID: 1)

