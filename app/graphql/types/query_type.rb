module Types
  class QueryType < Types::BaseObject
    # /users
    field :users, [Types::UserType], null: false

    def users
      User.all
    end

    field :properties, [Types::PropertyType], null: false

    def properties
      Property.all
    end

    field :reservations, [Types::ReservationType], null: false

    def reservations
      Reservation.all
    end

    field :icals, [Types::IcalType], null: false

    def icals
      Ical.all
    end
    
  end
end
