class ReservationPolicy < ApplicationAuthPolicy
    def show?
        user.admin || @reservation.property.owner == user || user.cleaner
    end
    def update?
        user.admin
    end
end