module Api
  class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create
      @user = User.find_by(username: params[:username])
    
      if @user && (BCrypt::Password.new(@user.password) == params[:password])
        session = @user.sessions.create
        cookies.permanent.signed[:twitter_session_token] = {
          value: session.token,
          httponly: true
        }
    
        # Return JSON with redirectUrl
        render json: {
          success: true,
          redirectUrl: '/feed'  # <- This is the URL to which you want to redirect the user
        }, status: :ok
      else
        render json: {
          success: false,
          message: 'Authentication failed'
        }, status: :unauthorized
      end
    end
    

    def authenticated
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated'
      else
        render json: {
          authenticated: false
        }
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        render json: {
          success: true
        }
      end
    end
  end
end
