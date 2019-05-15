class ApplicationAuthController < ApplicationController
    before_action :authenticate!
end