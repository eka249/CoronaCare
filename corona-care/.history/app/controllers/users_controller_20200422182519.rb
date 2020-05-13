class UsersController < ApplicationController
    # before_action :user_params, only: [:create]
    ####################
    # skip_before_action :authorized, only: [:create], raise: false
   ############################
   before_action :authenticate_user
   has_secure_password



    # def index
    #     users = User.all
    #     render json: users
    # end
    # not a necessary feature for any user
  
    # def show
    #     @user= User.find(params[:id])
    #     render json: @user
    # end
    # not a necessary feature for any user
  
    def show
        # render json: current_user.as_json(only: %i(id username))
        # render json: {user: UserSerializer.new(current_user)}, status: :accepted

        @user = User.find_by(username: params[:id])
        if @user
            render json: @user
        else
            @errors = @user.errors.full_messages
            render json: @errors
        end
    end

    def current_user
        @user = User.find_by(id: params[:id])
    end

    def create
        # @user = User.create
        # (user_params)
        # i DO NOT KNOW why this isnt' working. workaround: strong params
        
        @user = User.create(firstName: params[:firstName], lastName: params[:lastName], city: params[:city], phone: params[:phone], username: params[:username], password: params[:password])
        if @user.valid?
          puts "was valid"
            @token = Knock::AuthToken.new(payload: { user_id: @user.id }).token
            render json: { user: @user, jwt: @token }, status: :created

        else
          puts "wasn't valid"
            render json: {error: "failed to create user #{params[:username]}"}, status: :not_acceptable
        end



        ##  TODO: make validations on username, password, etc
    end
  
    def update
        @user = User.find(params[:id])
        @user.update(params[:user_params])
        @user.save
        render json: @user
    end
  
    def delete
        @user = User.find(params[:id])
        @user.destroy()
      end
  
  
  
  
    private

    def user_params
        params.require(:user).permit(:firstName, :lastName, :city, :phone, :username, :password)
    end
end
