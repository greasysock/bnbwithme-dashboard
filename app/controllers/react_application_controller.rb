class ReactApplicationController < ActionController::Base
    include DefaultPageContent
    include RailsJwtAuth::AuthenticableHelper
end