class UserTokenController < Knock::AuthTokenController
puts "hit usertokencontroller"
    skip_before_action :verify_authenticity_token, raise: false
    # post 'user_token', to:  'user_token#create'
    # def create
    #   @user = User.find_by(username: auth_params[:username])
    #   #User#authenticate comes from BCrypt
    #   if @user && @user.authenticate(auth_params[:password])
    #     # encode token comes from ApplicationController
    #     token = encode_token({ user_id: @user.id })
    #     render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
    #   else
    #     render json: { message: 'Invalid email or password' }, status: :unauthorized
    #   end
    # end
     
    # private
  
    # def auth_params
    #     params.require(:usertoken).permit (:username, :password)
    # end
end