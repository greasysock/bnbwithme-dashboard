Rails.application.routes.draw do

  resources :reminders
  resources :reminder_types
  concern :contain_reservations do
    resources(:reservations , only: [:show, :index, :update], defaults: { format: :json }) do
      member do
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

    devise_for :users, :skip => [:registrations], defaults: {format: :json}
    as :user do
      get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration', defaults: {format: :json}
      put 'users' => 'devise/registrations#update', :as => 'user_registration', defaults: {format: :json}
    end

    resources :people, controller: 'site_users', except: [:new, :edit], defaults: { format: :json }

  end

  get '/api/*path', to: 'errors#not_found'

  #devise_for :users

  # root 'main#index' for react router
  root 'main#index'
  get '*path', to: 'main#index'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
