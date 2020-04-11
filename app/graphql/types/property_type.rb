module Types
  class PropertyType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :color, String, null: true
    field :reservations, [Types::ReservationType], null: true do
      argument :start_date, GraphQL::Types::ISO8601Date, required: true
      argument :end_date, GraphQL::Types::ISO8601Date, required: true
    end
    field :owner_id, ID, null: false
    
    def color
      "#"+object.color
    end

    def reservations (start_date:, end_date:)
      Reservation.where(:start => start_date...end_date)
    end
  end
end
