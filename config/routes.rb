Rails.application.routes.draw do
  resources :tracked_items, only: [:show, :create, :update, :destroy, :query]
  resources :users, only: [:show, :create, :update]
  resources :proxy_urls
  root 'home#index'

  post 'query/:id', to: 'query#query'
  get 'login', to: 'session#new'
  post 'login', to: 'session#create'
  delete 'login', to: 'session#destroy'
  post 'query/:id', to: 'query#query'

  get '/*path', to: 'home#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
