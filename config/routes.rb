Rails.application.routes.draw do
  resources :tracked_items, only: [:show, :create, :update, :destroy]
  resources :users, only: [:show, :create, :update]
  root 'home#index'

  get 'login', to: 'session#new'
  post 'login', to: 'session#create'
  delete 'login', to: 'session#destroy'

  get '/*path', to: 'home#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
