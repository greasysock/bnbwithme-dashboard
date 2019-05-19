class SiteUsersController < ApplicationAuthController
    def index
        @users = User.all
        render json: @users
    end
    def show
    end
    def destroy
    end
    def update
    end
    def create
    end
end