require 'rails_helper'

RSpec.describe Cocktail, type: :model do
  describe 'associations' do
    it { should have_many(:ingredients).dependent(:destroy) }
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      cocktail = Cocktail.new(name: "Margarita", category: "Cocktail", container: "Cocktail glass", instructions: "Mix ingredients and serve.")
      expect(cocktail).to be_valid
    end

    it 'is invalid without a name' do
      cocktail = Cocktail.new(category: "Cocktail")
      expect(cocktail).not_to be_valid
    end
  end
end