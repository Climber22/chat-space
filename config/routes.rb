Rails.application.routes.draw do
  root "messages#index"
  resources :groups, only:[:edit,:new]
end
