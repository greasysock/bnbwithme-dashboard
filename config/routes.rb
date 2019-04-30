Rails.application.routes.draw do
  devise_for :users
  root 'main#dashboard'
  get 'calendar', to: 'main#calendar'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
