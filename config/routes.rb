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
  
  devise_for :users
  root 'main#dashboard'
  get 'calendar', to: 'main#calendar'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
