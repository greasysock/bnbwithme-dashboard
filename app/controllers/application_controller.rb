class ApplicationController < ActionController::API
    include DefaultPageContent
    include DeviseWhitelist
    respond_to :json
end
