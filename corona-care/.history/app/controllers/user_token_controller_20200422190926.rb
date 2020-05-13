class UserTokenController < Knock::AuthTokenController
puts "hit usertokencontroller"
 # this controller inherits from Knock::AuthTokenController which whill create a JWT when user logs in; all code is taken care of


    skip_before_action :verify_authenticity_token, raise: false
    #this is needed with Rails 5.2 or higher because skip_before_action is included by default now

   

end