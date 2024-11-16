class Api::CocktailsController < ApplicationController

  # search endpoint
  def search
    index = params[:index].to_i || 0
    limit = params[:limit].to_i || 10
    query = params[:query].to_s.downcase
  
    cocktails = if query.present?
                  Cocktail.where('LOWER(name) LIKE ?', "%#{query}%")
                else
                  Cocktail.all
                end
  
    total_count = cocktails.count
    drinks = cocktails.offset(index).limit(limit).select(:id, :slug, :name, :category, :image)
  
    render json: { drinks: drinks, totalCount: total_count }
  end

  # detail endpoint
  def detail
    cocktail = Cocktail.find_by(slug: params[:id]) || Cocktail.find_by(id: params[:id])
  
    if cocktail
      render json: {
        drinks: [
          {
            id: cocktail.id,
            slug: cocktail.slug,
            name: cocktail.name,
            category: cocktail.category,
            container: cocktail.container,
            instructions: cocktail.instructions,
            image: cocktail.image,
            ingredients: cocktail.ingredients.map { |ingredient| { name: ingredient.name, measurement: ingredient.measurement } }
          }
        ]
      }
    else
      render json: { error: 'Cocktail not found' }, status: :not_found
    end
  end
  

end
