class UserTokenController < Knock::AuthTokenController
puts "hit usertokencontroller"
 # this controller inherits from Knock::AuthTokenController which whill create a JWT when user logs in; all code is taken care of


    skip_before_action :verify_authenticity_token, raise: false
    #this is needed with Rails 5.2 or higher because skip_before_action is included by default now
    def create
        user = find_user
        render json: {jwt: auth_token(user).token, user: user}, status: :created
        puts user
      end
    
      # Private methods copied from Knock::AuthController.
      # This is is a workaround because those methods in Knock::AuthTokenController are private.
    
      private
    
      def authenticate!
        raise ActiveRecord::RecordNotFound unless user.authenticate(auth_params[:password])
      end
    
      def auth_token(user)
        Knock::AuthToken.new payload: {sub: user.id}
      end
    
      def find_user
        Knock.current_user_from_handle.call auth_params[Knock.handle_attr]
      end
      
      def auth_params
        params.require(:auth).permit Knock.handle_attr, :password
      end
   

end