class AddIcalToReservation < ActiveRecord::Migration[5.2]
  def change
    add_reference :reservations, :ical, foreign_key: true
  end
end
