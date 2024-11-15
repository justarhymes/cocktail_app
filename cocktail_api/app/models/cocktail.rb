class Cocktail < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  validates :name, presence: true
end
