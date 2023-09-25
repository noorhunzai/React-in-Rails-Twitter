module Api
  class AuthenticationController < ApplicationController
    skip_before_action :verify_authenticity_token

    def sign_up
      @user = User.new(user_params)

      if @user.save
        render json: {
          success: true, 
          user: { 
            id: @user.id, 
            username: @user.username, 
            email: @user.email 
          }
        }
      else
        puts "@user.errors.inspect: #{@user.errors.inspect}"
        render json: {
          success: false, 
          errors: @user.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      {
        email: params[:email],
        username: params[:username],
        plain_password: params[:password]
      }
    end    
  end
end
