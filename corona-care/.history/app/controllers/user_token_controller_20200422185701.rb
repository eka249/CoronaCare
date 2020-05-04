class UserTokenController < Knock::AuthTokenController
puts "hit usertokencontroller"
    skip_before_action :verify_authenticity_token, raise: false

    # this controller inherits from Knock::AuthTokenController which whill create a JWT when user logs in

end