module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: false
    field :admin, Boolean, null: true
    field :cleaner, Boolean, null: true
    field :properties, [Types::PropertyType], null: true
    field :cleanings, [Types::ReservationType], null: true
  end
end
