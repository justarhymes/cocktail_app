class Cocktail < ApplicationRecord
  has_many :ingredients, dependent: :destroy # Ensures associated ingredients are deleted if a cocktail is deleted
  validates :name, presence: true

  before_save :generate_slug, if: :name_changed?

  private

  def generate_slug
    self.slug = name.parameterize if slug.blank?
  end
end