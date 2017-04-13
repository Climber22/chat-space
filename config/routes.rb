Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :groups, only:[:index, :new, :create, :edit, :update] do
    resources :messages, only:[:index, :create]
    collection do
      get "search"
    end
  end
end
