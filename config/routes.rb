Rails.application.routes.draw do
  root "messages#index"
  resources :group, only:[:edit,:new]
end
