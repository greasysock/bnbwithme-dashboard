module Types
  class IcalType < Types::BaseObject
    field :id, ID, null: false
    field :link, String, null: false
    field :property, Types::PropertyType, null: false
    field :service, String, null: false
  end
end
