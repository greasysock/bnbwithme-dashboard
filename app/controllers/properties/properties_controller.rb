module Properties
  class PropertiesController < ApplicationAuthController
    before_action :set_property, only: [:show, :update, :destroy]

    def index
      @properties = policy_scope(Property)
      render json: @properties, :methods => :current_reservation_id
    end

    def show
      authorize @property
      render json: @property, :methods => :current_reservation_id
    end

    def create
      @property = Property.new(property_params)
      authorize @property

      if @property.save
        render json: @property, status: :created, location: @property, :methods => :current_reservation_id
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    end

    def update
      authorize @property
      if @property.update(property_params)
        render json: @property, status: :created, location: @property, :methods => :current_reservation_id
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @property
      @property.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_property
        @property = Property.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def property_params
        params.require(:property).permit(:name, :color, :owner_id)
      end

  end
end