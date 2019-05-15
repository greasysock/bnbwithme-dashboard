class User < ApplicationRecord
  include RailsJwtAuth::Authenticatable
  include RailsJwtAuth::Trackable
  include RailsJwtAuth::Invitable

  has_many :cleanings, :class_name => 'Reservation', foreign_key: 'cleaner_id'
  has_many :properties, :class_name => 'Property', foreign_key: 'owner_id'


  validates :email, presence: true,
                    uniqueness: true,
                    format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
                    
  validates_presence_of :first_name, :last_name
end
