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

  # Disable devise registration

    devise_for :users, :skip => [:registrations], defaults: { format: :json }
    as :user do
      get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
      put 'users' => 'devise/registrations#update', :as => 'user_registration'
    end
  end


  #devise_for :users

  # root 'main#index' for react router
  root 'main#index'
  get '*path', to: 'main#index'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
