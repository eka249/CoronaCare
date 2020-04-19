Rails.application.routes.draw do
  resources :pages
  resources :responses
  resources :requests
  resources :messages
  resources :convos
  resources :users
  post '/auth', to: 'auth#create'
  post 'user/token' => 'user_token#create'

  namespace :api do
    post 'user/token' => 'user_token#create'
    get 'users/current' => 'users#current'
    resources :pages, only: %i(index show)
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
