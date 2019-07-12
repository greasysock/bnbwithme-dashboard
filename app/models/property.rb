class Property < ApplicationRecord
    has_many :icals, dependent: :destroy
    has_many :reservations, dependent: :destroy
    has_many :reminders, dependent: :destroy

    belongs_to :owner, :class_name => "User", foreign_key: "owner_id"

    after_initialize :init
    validates_presence_of :owner

    def current_reservation
        reservation = reservations.where("\"end\" > ?", Date.today).where("start <= ?", Date.today).order(:end).last
    end

    def current_reservation_id
        current_reservation.id if current_reservation
    end

    def duration
        reservations.sum(:duration)
    end

    def init
        self.color ||= "dc583c"
    end
end
