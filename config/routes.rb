Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :profiles
  get '/games' => 'games#index'
  get '/blob_man' => 'games#blob_man'
  get '/sky_high' => 'games#sky_high'
  get '/ogre_crossing' => 'games#ogre_crossing'
  devise_for :users
  devise_scope :user do
    unauthenticated do
      root :to => 'devise/sessions#new'
    end
    authenticated do
      root :to => 'profiles#new'
    end
  end
end
