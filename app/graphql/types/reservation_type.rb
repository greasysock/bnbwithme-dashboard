module Types
  class ReservationType < Types::BaseObject

    field :id, ID, null: false
    field :start, String, null: false
    field :end, String, null: false
    field :cleaner, Types::UserType, null: true
    field :cleaner_id, Integer, null: true
    field :guest, String, null: true
    field :duration, Integer, null: false
    field :phone, String, null: true
    field :email, String, null: true
    field :ical_id, ID, null: true
    field :ical, Types::IcalType, null: true
    field :property, Types::PropertyType, null: false

    def ical
      RecordLoader.for(Ical).load(object.ical_id)
    end

    def cleaner
      RecordLoader.for(User).load(object.cleaner_id)
    end

    def property
      RecordLoader.for(Property).load(object.property_id)
    end
  end
end
