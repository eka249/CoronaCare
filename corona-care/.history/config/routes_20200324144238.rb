Rails.application.routes.draw do
  resources :responses
  resources :requests
  resources :messages
  resources :convos
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
