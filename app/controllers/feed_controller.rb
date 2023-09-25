class FeedController < ApplicationController
  before_action :authenticate_user!
  def feed
    # This method will display the feed.
    # If you need to fetch any data from the database, you can do so here.
    # For instance, if you have a `Post` model, you could fetch the latest posts:
    # @posts = Post.all.order(created_at: :desc)
    
  end
end
