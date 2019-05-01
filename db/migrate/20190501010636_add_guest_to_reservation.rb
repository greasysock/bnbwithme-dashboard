class AddGuestToReservation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :guest, :string
  end
end
