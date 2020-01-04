Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  concern :contain_reminders do
    resources(:reminders,except: [:new, :edit], defaults: { format: :json }) do
      resources :reminder_recurrences,except: [:new, :edit] ,defaults: { format: :json }
    end
    get 'emit_reminders', to: 'reminder_occurrences#index'
  end
  concern :contain_reservations do
    resources(:reservations , only: [:show, :index, :update], defaults: { format: :json }) do
    end
  end
  concern :contain_icals do
    resources :icals, except: [:new, :edit], defaults: { format: :json }
  end


  scope 'api' do
    scope 'properties' do
      concerns :contain_reservations
      resources(:properties,except: [:new, :edit] , concerns: [:contain_reservations, :contain_icals], :path=>'/', module: 'properties', defaults: { format: :json }) do
        concerns :contain_reminders
      end
    end

    devise_for :users, :skip => [:registrations], defaults: {format: :json}
    as :user do
      get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration', defaults: {format: :json}
      put 'users' => 'devise/registrations#update', :as => 'user_registration', defaults: {format: :json}
    end
    resources :reminder_types, except: [:new, :edit], defaults: {format: :json} do
      get :search, on: :collection
    end
    concerns :contain_reminders
    resources :people, controller: 'site_users', except: [:new, :edit], defaults: { format: :json }

  end

  get '/api/*path', to: 'errors#not_found'

  # mobile pack scope
  scope 'm' do
    get '/', to: 'main#mobile'
    get '*path', to: 'main#mobile'
  end

  # root 'main#index' for react router
  root 'main#index'
  get '*path', to: 'main#index'

  post "/graphql", to: "graphql#execute"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
