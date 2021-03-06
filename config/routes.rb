Rails.application.routes.draw do

  devise_for :users,:controllers => {
    :registrations => "registrations"
  }
  # get 'hello_world', to: 'hello_world#index'

  resources :items
  get 'cart', to: 'items#index'
  get 'inventario', to: 'items#index'
  get 'get_orders_refunded', to: 'orders#get_orders_refunded'
  get 'get_orders_searched', to: 'orders#get_orders_searched'
  get 'get_category_brand', to: 'items#get_category_brand'
  get 'get_items', to: 'items#get_items'
  get 'get_item_orders_refunded', to: 'item_orders#get_item_orders_refunded'


  resources :orders do
    resources :item_orders, only:[:edit, :update]
    resources :custom_items, only:[:edit, :update]
    resources :refund_orders, except:[:destroy] do
      resources :refund_items, except:[:destroy]
    end
  end

  root 'items#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
