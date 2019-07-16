Rails.application.routes.draw do

  devise_for :users,:controllers => {
    :registrations => "registrations"
  }

  devise_scope :user do
    get 'login',to:'devise/sessions#new'
  end

  devise_scope :user do
    get 'signup',to:'devise/registrations#new'
  end

  get 'hello_world', to: 'hello_world#index'
  resources :items

  resources :orders, only:[:index, :show, :create, :update] do
    resources :item_orders, only:[:edit, :update]
  end


  root 'items#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
