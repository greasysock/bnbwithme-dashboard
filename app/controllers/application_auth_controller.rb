class ApplicationAuthController < ActionController::API
    include Pundit
    before_action :authenticate_user!
    respond_to :json
end