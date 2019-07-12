class CreateReminders < ActiveRecord::Migration[5.2]
  def change
    create_table :reminders do |t|
      t.references :property
      t.datetime :start
      t.datetime :end
      t.references :reminder_type
      t.boolean :full_day
      t.boolean :indefinite

      t.timestamps
    end
  end
end
