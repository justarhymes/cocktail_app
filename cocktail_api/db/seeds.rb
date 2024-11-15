# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# db/seeds.rb
require 'json'

file = File.read('db/cocktail_recipes.json')
data = JSON.parse(file)

data.each do |cocktail_data|
  cocktail = Cocktail.create!(
    name: cocktail_data["name"],
    category: cocktail_data["category"],
    container: cocktail_data["container"],
    instructions: cocktail_data["instructions"],
    image: cocktail_data["image"]
  )
  cocktail_data["ingredients"].each do |ingredient_data|
    Ingredient.create!(
      cocktail: cocktail,
      name: ingredient_data["name"],
      measurement: ingredient_data["measurement"]
    )
  end
end

