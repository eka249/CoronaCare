class ConvosController < ApplicationController
    before_action :authenticate_user
    def show
        # render json: {user: ConvoSerializer.new(current_user)}, status: :accepted
        puts "params[:id]"
        puts params[:id]
        @convos = Convo.where(fromID: params[:id]).or(Convo.where(toID: params[:id]))
        render json: @convos
        puts "myconvos below"
        puts @convos
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
