class ApplicationController < ActionController::Base
    include DefaultPageContent
    respond_to :json
    skip_before_action :verify_authenticity_token
end
