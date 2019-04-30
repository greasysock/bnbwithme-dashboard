class Ical < ApplicationRecord
    enum service: [:airbnb, :vrbo]
    belongs_to :property
end
