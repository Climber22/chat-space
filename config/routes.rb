Rails.application.routes.draw do
  devise_for :users
  root "messages#index"
  resources :groups, only:[:edit,:new,:index] 
  # ルーティングをネストさせる？？
end
