module Properties
  class PropertiesController < ApplicationAuthController
    before_action :set_property, only: [:show, :edit, :update, :destroy]
    before_action :set_properties, only: [:index]
    before_action :set_subtitle, only: [:index]

    # GET /properties
    # GET /properties.json
    def index
      render json: @properties
    end

    # GET /properties/1
    # GET /properties/1.json
    def show
      render json: @property
    end

    # POST /properties
    # POST /properties.json
    def create
      @property = Property.new(property_params)

      if @property.save
        render json: @property, status: :created, location: @property
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /properties/1
    # PATCH/PUT /properties/1.json
    def update
      if @property.update(property_params)
        render json: @property, status: :created, location: @property
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    end

    # DELETE /properties/1
    # DELETE /properties/1.json
    def destroy
      @property.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_property
        @property = Property.find(params[:id])
        set_page_subtitle("Properties | #{@property.name}")
      end

      def set_properties
        @properties = (current_user.admin ? Property.all : current_user.properties )
      end

      def set_subtitle
        set_page_subtitle("Properties")
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def property_params
        params.require(:property).permit(:name, :color, :owner_id)
      end
  end
end