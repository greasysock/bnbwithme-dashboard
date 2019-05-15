class ErrorsController < ApplicationController
    def not_found
        render :json => {:error => "not found"}.to_json, :status => 404
    end
end