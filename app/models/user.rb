class User < ApplicationRecord
  include RailsJwtAuth::Authenticatable
  include RailsJwtAuth::Trackable
  include RailsJwtAuth::Invitable

  has_many :cleanings, :class_name => 'Reservation', foreign_key: 'cleaner_id'
  has_many :properties, :class_name => 'Property', foreign_key: 'owner_id'

  def to_token_payload(request)
    {
      authToken: regenerate_auth_token,
      firstName: self.first_name,
      lastName: self.last_name,
      admin: self.admin || false,
      cleaner: self.cleaner || false

      # add here your custom info
    }
  end

  validates :email, presence: true,
                    uniqueness: true,
                    format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
                    
  validates_presence_of :first_name, :last_name
end
