class ApplicationController < ActionController::API
    include DefaultPageContent
    include RailsJwtAuth::AuthenticableHelper

end
