module Properties
    class IcalsController < ApplicationAuthController
        before_action :set_ical, only: [:show, :update, :destroy]
        before_action :set_property
        
        def index
        end
        def show
        end
        def create
        end
        def update
        end
        def destroy
        end
        private
        # Use callbacks to share common setup or constraints between actions.
        def set_ical
          @ical = Ical.find(params[:id])
        end

        def set_property
          @property = Property.find(params[:property_id])
        end
  
        # Never trust parameters from the scary internet, only allow the white list through.
        def ical_params
          params.require(:property).permit(:link, :service)
        end
    end
end