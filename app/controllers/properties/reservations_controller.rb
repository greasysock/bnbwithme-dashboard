module Properties
    class ReservationsController < ApplicationAuthController
        before_action :set_reservations, only: [:index]
        def index
        end
        def show
        end

        private

        def set_reservations
            if params[:property_id]
                @property = Property.find(params[:property_id])
                @reservations = @property.reservations
                return
            end
            @reservations = Reservation.all
        end
    end
end