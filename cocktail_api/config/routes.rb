Rails.application.routes.draw do
  
  #api routing
  namespace :api do
    get 'search', to: 'cocktails#search'
    get 'detail', to: 'cocktails#detail'
  end
  
end

