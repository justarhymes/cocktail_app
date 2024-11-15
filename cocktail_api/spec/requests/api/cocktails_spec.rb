require 'rails_helper'

RSpec.describe "Api::Cocktails", type: :request do
  describe "GET /api/search" do
    before do
      # Reset the database before each test to ensure consistent results
      Cocktail.destroy_all

      # Create sample data for testing
      Cocktail.create(name: "Margarita", category: "Cocktail", image: "https://example.com/margarita.jpg")
      Cocktail.create(name: "Bloody Mary", category: "Cocktail", image: "https://example.com/bloodymary.jpg")
      Cocktail.create(name: "Mojito", category: "Cocktail", image: "https://example.com/mojito.jpg")
    end

    it "returns cocktails matching the query" do
      get "/api/search", params: { query: "margarita", index: 0, limit: 10 }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["drinks"]).to be_an(Array)
      expect(json["drinks"].size).to eq(1)
      expect(json["drinks"].first["name"]).to eq("Margarita")
    end

    it "returns an empty array if no cocktails match the query" do
      get "/api/search", params: { query: "nonexistent", index: 0, limit: 10 }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["drinks"]).to eq([])
      expect(json["totalCount"]).to eq(0)
    end

    it "returns only the specified number of results based on limit" do
      get "/api/search", params: { query: "", index: 0, limit: 2 }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["drinks"].size).to eq(2)
    end
    
    it "returns paginated results based on index and limit" do
      get "/api/search", params: { query: "", index: 1, limit: 1 }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["drinks"].size).to eq(1)
    end

    it "returns an empty result when index is beyond the available results" do
      get "/api/search", params: { query: "", index: 10, limit: 10 }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["drinks"]).to eq([])
    end
  end
end
