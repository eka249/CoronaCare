Rails.application.routes.draw do
  resources :responses
  resources :requests
  resources :messages
  resources :convos
  resources :users
  post '/auth', to: 'auth#create'

  # get '/requests', to: 'requests#index'
  # get '/messages', to: 'messages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
