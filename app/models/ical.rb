class Ical < ApplicationRecord
    enum service: [:airbnb, :vrbo]
    belongs_to :property
    has_many :reservations, dependent: :destroy

    validates_presence_of :service, :link
end
