Rails.application.routes.draw do
  # Root route (Home page)
  root 'home_pages#home'

  # Feed route
  get '/feed', to: 'feed#feed'

  # API routes
  namespace :api do
    # Users
    post '/sign-up', to: 'users#create'

    # Sessions
    post '/log-in', to: 'sessions#create'
    delete '/log-out', to: 'sessions#destroy'
    get '/authenticated', to: 'sessions#authenticated'

    # Tweets
    resources :tweets, only: [:index, :create, :destroy]
    get '/users/:username/tweets', to: 'tweets#index_by_user'
    get '/tweets/search/:keyword', to: 'tweets#search'
  end

  # If you are using Active Storage for images, you can add routes here.
  # For example:
  # get '/images/:id', to: 'images#show'
  # post '/images', to: 'images#create'

  # Catch-all route to redirect undefined routes to the root path.
  # get '*path', to: 'home_pages#home'

  # Define other routes as needed for your application.
end
