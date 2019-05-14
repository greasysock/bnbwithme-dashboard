module Properties
    class ReservationsController < ApplicationAuthController
        before_action :set_reservation, only: [:show, :assign_cleaner]
        before_action :set_reservations, only: [:index]
        def index
        end
        def show
        end
        def assign_cleaner
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

        def set_reservation
            @reservation = Reservation.find(params[:id])
        end

        def cleaner_params
            params.require(:reservation).permit(:cleaner_id)
        end
    end
end