class UserTokenController < Knock::AuthTokenController
 # this controller inherits from Knock::AuthTokenController which whill create a JWT when user logs in; all code is taken care of


    # skip_before_action :verify_authenticity_token, raise: false
    before_action :authenticate!
    #this is needed with Rails 5.2 or higher because skip_before_action is included by default now
    def create
        puts "hit create in user_token controllwer"
        render json: {jwt: auth_token(user).token}, status: :created
      end
    
      # Private methods copied from Knock::AuthController.
      # This is is a workaround because those methods in Knock::AuthTokenController are private.
    
      private
    
      def user
        Knock.current_user_from_handle.call auth_params[Knock.handle_attr]
      end

      def authenticate!
        raise ActiveRecord::RecordNotFound unless user.authenticate(auth_params[:password])
      end
    
      def auth_token
        Knock::AuthToken.new payload: {sub: user.id}
      end
      
      def auth_params
        params.require(:auth).permit( :password)
      end
   

end