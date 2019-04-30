class AddDurationToReservation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :duration, :integer
  end
end
