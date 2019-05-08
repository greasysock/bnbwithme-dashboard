class ApplicationController < ActionController::Base
    include DefaultPageContent
    include DeviseWhitelist
end
