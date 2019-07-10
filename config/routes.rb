Rails.application.routes.draw do
  resources :price_queries
  resources :tracked_items
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
