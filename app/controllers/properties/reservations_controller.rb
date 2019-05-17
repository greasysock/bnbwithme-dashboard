module Properties
    class ReservationsController < ApplicationAuthController
        before_action :set_reservation, only: [:show, :update]
        before_action :set_reservations, only: [:index]
        def index
            render json: @reservations, :methods => :service
        end
        def show
            render json: @reservation, :methods => :service

        end
        def update
            if @reservation.update(reservation_params)
                render json: @reservation, :methods => :service
            else
                render json: @reservation.errors, status: :unprocessable_entity
            end
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

        def reservation_params
            params.require(:reservation).permit(:cleaner_id)
        end
    end
end