class ApplicationAuthController < ActionController::API
    before_action :authenticate_user!
    respond_to :json
end