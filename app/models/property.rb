class Property < ApplicationRecord
    has_many :icals
    has_many :reservations
end
