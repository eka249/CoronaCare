class MessagesController < ApplicationController
    def index
        # render json: {user: messageserializer.new(current_user)}, status: :accepted
        messages = Message.all
        puts messages
        render json: messages
    end

    def create
        @message = Message.create([message_params])
        # if @message.save
            render json: @message
        # else 
            # render json: @message.errors
        # end
        
    end

        private

        def message_params
            params.require(:message).permit(:user_id, :convo_id, :messagetext)
        end
end
