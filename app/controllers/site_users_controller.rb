class SiteUsersController < ApplicationAuthController
    def index
        @users = User.all
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