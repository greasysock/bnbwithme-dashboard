class ReactApplicationController < ActionController::Base
    include DefaultPageContent
    include DeviseWhitelist
end