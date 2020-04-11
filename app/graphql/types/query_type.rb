module Types
  class QueryType < Types::BaseObject
    # /users
    field :users, [Types::UserType], null: false

    def users
      User.all
    end

    field :user, Types::UserType, null: true do
      argument :user_id, ID, required: true
    end

    def user (user_id:)
      User.find(user_id)
    end

    field :properties, [Types::PropertyType], null: false

    def properties
      Property.all
    end

    field :reservations, [Types::ReservationType], null: false do
      argument :start_date, GraphQL::Types::ISO8601Date, required: true
      argument :end_date, GraphQL::Types::ISO8601Date, required: true
    end

    def reservations (start_date:, end_date:)
      Reservation.where(:start => start_date...end_date)
    end

    field :icals, [Types::IcalType], null: false

    def icals
      Ical.all
    end
    
  end
end
