Rails.application.routes.draw do
  concern :contain_reservations do
    resources(:reservations, only: [:show, :index]) do
      member do
      end
    end
  end
  concern :contain_icals do
    resources :icals
  end

  scope 'properties' do
    concerns :contain_reservations
    resources(:properties, concerns: [:contain_reservations, :contain_icals], :path=>'/', module: 'properties')
  end

  # Disable devise registration

  devise_scope :user do
    get "/sign_in" => "devise/sessions#new" # custom path to login/sign_in
    get "/sign_up" => "devise/registrations#new", as: "new_user_registration" # custom path to sign_up/registration
  end

  devise_for :users, :skip => [:registrations] 
  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
    put 'users' => 'devise/registrations#update', :as => 'user_registration'
  end

  #devise_for :users

  root 'main#dashboard'
  get 'calendar', to: 'main#calendar'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
