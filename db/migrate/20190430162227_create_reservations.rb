class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.date :start
      t.date :end
      t.references :cleaner
      t.references :property

      t.timestamps
    end
  end
end
