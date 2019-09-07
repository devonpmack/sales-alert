Rails.application.routes.draw do
  resources :price_queries
  resources :tracked_items

  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  get 'profile', to: 'profile#index'
  root 'home#index'

  get 'login', to: 'session#new'
  post 'login', to: 'session#create'
  delete 'login', to: 'session#destroy'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
