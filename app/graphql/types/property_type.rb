module Types
  class PropertyType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :color, String, null: true
    field :reservations, [Types::ReservationType], null: true

    def color
      "#"+object.color
    end
  end
end
