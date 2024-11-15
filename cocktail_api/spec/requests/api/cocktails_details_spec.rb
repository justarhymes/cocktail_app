require 'rails_helper'

RSpec.describe "Api::Cocktails::details", type: :request do
  describe "GET /api/detail" do
    let(:cocktail) do
      Cocktail.create(
        name: "Margarita",
        category: "Cocktail",
        container: "Cocktail glass",
        instructions: "Mix ingredients and serve.",
        image: "https://example.com/margarita.jpg"
      )
    end

    before do
      # Add ingredients to the created cocktail
      cocktail.ingredients.create(name: "Tequila", measurement: "2 oz")
      cocktail.ingredients.create(name: "Lime Juice", measurement: "1 oz")
      cocktail.ingredients.create(name: "Triple Sec", measurement: "1/2 oz")
    end

    it "returns the details of a specific cocktail by id" do
      get "/api/detail", params: { id: cocktail.id }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      drink = json["drinks"].first

      expect(drink["name"]).to eq("Margarita")
      expect(drink["category"]).to eq("Cocktail")
      expect(drink["container"]).to eq("Cocktail glass")
      expect(drink["instructions"]).to eq("Mix ingredients and serve.")
      expect(drink["image"]).to eq("https://example.com/margarita.jpg")
      expect(drink["ingredients"].size).to eq(3)
      expect(drink["ingredients"].first["name"]).to eq("Tequila")
    end

    it "returns a 404 error if the cocktail is not found" do
      get "/api/detail", params: { id: -1 }
      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json["error"]).to eq("Cocktail not found")
    end

    it "returns a valid response structure even if no ingredients are present" do
      # Create a cocktail with no ingredients
      cocktail_no_ingredients = Cocktail.create(
        name: "Virgin Margarita",
        category: "Mocktail",
        container: "Glass",
        instructions: "Mix non-alcoholic ingredients.",
        image: "https://example.com/virginmargarita.jpg"
      )

      get "/api/detail", params: { id: cocktail_no_ingredients.id }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      drink = json["drinks"].first
      expect(drink["name"]).to eq("Virgin Margarita")
      expect(drink["ingredients"]).to eq([])
    end
  end
end
