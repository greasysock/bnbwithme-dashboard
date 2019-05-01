class AddEmailAndPhoneToReservation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :phone, :string
    add_column :reservations, :email, :string
  end
end
