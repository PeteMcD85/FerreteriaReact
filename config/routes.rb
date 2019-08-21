Rails.application.routes.draw do

  devise_for :users,:controllers => {
    :registrations => "registrations"
  }
  # get 'hello_world', to: 'hello_world#index'

  resources :items

  get 'get_category_brand', to: 'items#get_category_brand'

  resources :orders do
    resources :item_orders, only:[:edit, :update]
    resources :custom_items, only:[:edit, :update]
  end

  root 'items#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
