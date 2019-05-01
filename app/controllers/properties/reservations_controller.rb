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
                puts '*' * 100
                puts @property.name
                @property.reservations.each do |reservation|
                    puts reservation.id
                end
                puts '*' * 100 
                @reservations = @property.reservations
                return
            end
            @reservations = Reservation.all
        end
    end
end