Rails.application.routes.draw do

  concern :contain_reservations do
    resources(:reservations, only: [:show, :index], defaults: { format: :json }) do
      member do
        put 'assign_cleaner'
      end
    end
  end
  concern :contain_icals do
    resources :icals, except: [:new, :edit], defaults: { format: :json }
  end

  scope 'api' do
    scope 'properties' do
      concerns :contain_reservations
      resources(:properties,except: [:new, :edit] , concerns: [:contain_reservations, :contain_icals], :path=>'/', module: 'properties', defaults: { format: :json })
    end

    scope 'user' do
      resources :invitations, controller: 'rails_jwt_auth/invitations', only: [:create, :update], as: 'invitations'
      resources :passwords, controller: 'rails_jwt_auth/passwords', only: [:create, :update], as: 'passwords'
      resources :session, controller: 'rails_jwt_auth/sessions', only: [:create, :destroy], as: 'sessions'
    end


  end

  get '/api/*path', to: 'errors#not_found'

  #devise_for :users

  # root 'main#index' for react router
  root 'main#index'
  get '*path', to: 'main#index'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
