class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable,
  :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_many :cleanings, :class_name => 'Reservation', foreign_key: 'cleaner_id'
  has_many :properties, :class_name => 'Property', foreign_key: 'owner_id'
         
  validates_presence_of :first_name, :last_name
end
