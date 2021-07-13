Rails.application.routes.draw do
  resources :locations
  resources :items
  resources :receipts
  resources :users

  resources :sessions
  delete '/signout', to: 'sessions#destroy'
  get '/comments' => 'comments#new'
  post 'comments' => 'comments#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
