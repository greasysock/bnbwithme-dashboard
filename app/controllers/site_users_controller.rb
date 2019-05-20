class SiteUsersController < ApplicationAuthController
    before_action :set_reservation, only: [:show, :update, :destroy]
    def index
        @site_users = User.all
        render json: @site_users
    end

    def show
        render json: @site_user
    end

    def destroy
        authorize @site_user
        @site_user.destroy
    end

    def update
        authorize @site_user
        if @site_user.update(site_user_params)
            render json: @site_user, status: :created, location: @site_user
        else
            render json: @site_user.errors, status: :unprocessable_entity
        end
    end

    def create
        @site_user = User.new(site_user_params)
        authorize @site_user
        if @site_user.save
            render json: @site_user, status: :created, location: @site_user
        else
            render json: @site_user.errors, status: :unprocessable_entity
        end
    end

    private

    def set_site_user
        @site_user = User.find(params[:id])
    end

    def site_user_params
        params.require(:user).permit(:first_name, :last_name, :password, :email)
    end
end