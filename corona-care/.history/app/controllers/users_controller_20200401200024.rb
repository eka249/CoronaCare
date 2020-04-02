class UsersController < ApplicationController
    before_action :user_params, only: [:create]
    skip_before_action :authorized, only: [:create], raise: false
   
  
    def index
        users = User.all
        render json: users
    end
  
    def show
        @user= User.find(params[:id])
        render json: @user
    end
  
    def profile
        render json: {user: UserSerializer.new(current_user)}, status: :accepted
    end
    def create
        puts "all params"
        puts params
        @user = User.create
        (user_params)
        puts "params after creating @user"
        puts params
        @user.errors.full_messages
        # byebug
        if @user.valid?
          puts "was valid"
            @token = encode_token({user_id: @user.id})
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
          puts "wasn't valid"
            render json: {error: "failed to create user #{params[:email]}"}, status: :not_acceptable
        end
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
        params.require(:user).permit(:firstName, :lastName, :phone, :username, :city,       :password)
    end
end
