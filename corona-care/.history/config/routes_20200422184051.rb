Rails.application.routes.draw do

  resources :responses
  resources :requests
  resources :messages
  resources :convos
  # resources :users
  # post '/auth', to: 'auth#create'
  # post 'user/token' => 'user_token#create'


    resources :users
    post 'user_token', to: 'user_token#create'
    get 'users/current' , to: 'users#current'
    # resources :pages, only: %i(index show)



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
