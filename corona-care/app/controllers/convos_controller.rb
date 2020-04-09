class ConvosController < ApplicationController

    def myconvos
        # render json: {user: ConvoSerializer.new(current_user)}, status: :accepted
        @convos = Convo.find(:user_id === :from_ID || :user_id === :to_ID)
        puts @convos
        render json: @convos
    end

    def create
        @convo = Convo.create([convo_params])
            render json: @convo
        
    end

        private

        def convo_params
            params.require(:convo).permit(:fromID, :toID)
        end

end
