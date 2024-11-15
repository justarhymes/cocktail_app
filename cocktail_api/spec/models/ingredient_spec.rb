require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  describe 'associations' do
    it { should belong_to(:cocktail) }
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      cocktail = Cocktail.create(name: "Margarita", category: "Cocktail")
      ingredient = Ingredient.new(cocktail: cocktail, name: "Tequila", measurement: "2 oz")
      expect(ingredient).to be_valid
    end

    it 'is invalid without a name' do
      ingredient = Ingredient.new(measurement: "2 oz")
      expect(ingredient).not_to be_valid
    end
  end
end