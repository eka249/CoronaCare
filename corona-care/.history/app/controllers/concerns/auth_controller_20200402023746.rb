class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]
   
    def create
      # puts "hit auth create"
      @user = User.find_by(email: user_login_params[:email])
      #User#authenticate comes from BCrypt
      if @user && @user.authenticate(user_login_params[:password])
        # encode token comes from ApplicationController
        token = encode_token({ user_id: @user.id })
        render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
      else
        render json: { message: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def show
      token = request.headers['Authorization']
      user = User.find_by(id: token)
      if logged_in?
        render json: {id: current_user.id, email: current_user.email, role: current_user.role}
      else render json: {error: 'No user could be founauthd'}, status: 401
      end
    end
   
    private
   
    def user_login_params
      # params { user: {email: 'Chandler Bing', password: 'hi' } }
      params.require(:auth).permit(:email, :password)
    end
  end