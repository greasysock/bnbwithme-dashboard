module Properties
    class ReminderOccurrencesController < ApplicationAuthController
        before_action :set_property
        def index
            render json: @property.reminders
        end
        private
        # Use callbacks to share common setup or constraints between actions.

        def set_property
          @property = Property.find(params[:property_id])
        end

    end
end