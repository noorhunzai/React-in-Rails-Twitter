class ApplicationController < ActionController::Base
  before_action :current_user

  def authenticate_user!
    unless current_user
      redirect_to login_path, alert: "Please login to continue" # Or wherever your login path is
    end
  end

  def current_user
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)
    @current_user ||= session.user if session
  end
end
