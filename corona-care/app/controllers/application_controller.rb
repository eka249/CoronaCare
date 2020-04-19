class ApplicationController < ActionController::API
    include Knock::Authenticable





end















    ########################################################################
    # require 'jwt'
    # # before_action :authorized 


    # def encode_token(payload)
    #     puts "hiti encove_token"
    #     JWT.encode(
    #         payload,
    #          'test', 'HS256')
    # end

    # def auth_header
    #     request.headers['Authorization']
    # end

    # def decoded_token
    #     if auth_header
    #         token = auth_header.split(" ")[1]
    #         begin
    #             JWT.decode(token, 'test', true, algorithm: 'HS256')
    #         rescue JWT::DecodeError
    #             nil
    #         end
    #     end
    # end

    # def current_user
    #     if decoded_token
    #         user_id = decoded_token[0]['user_id']
    #         @current_user = User.find_by(id: user_id)
    #     end
    # end

    # def logged_in?
    #     !!current_user
    # end

    # # def authorized
    # #     render json: {message: 'Please log in'}, status: :unauthorized unless logged_in?
    # # end
# end
