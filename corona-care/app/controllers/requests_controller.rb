class RequestsController < ApplicationController
    def index
        @requests = Request.all
        render json: @requests
    end

    def create
        @request = Request.create([request_params])
        if @request.save
            render json: @request, status: :created
        else render json: @request.errors
        end

    end

    def update
        @request = Request.find(params[:id])
        puts"hit update request"
        @request.update(request_params)
          render json: @request
      end

 private
    def request_params
    params.require(:request).permit(:user_ID, :title, :description, :category, :location)
end
end
