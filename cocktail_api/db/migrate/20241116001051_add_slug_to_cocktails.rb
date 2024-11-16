class AddSlugToCocktails < ActiveRecord::Migration[6.1]
  def change
    add_column :cocktails, :slug, :string, unique: true
  end
end
