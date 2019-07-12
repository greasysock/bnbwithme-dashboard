class CreateReminderRecurrences < ActiveRecord::Migration[5.2]
  def change
    create_table :reminder_recurrences do |t|
      t.references :reminder, foreign_key: true
      t.integer :day_of_week
      t.integer :week_of_month
      t.integer :month_of_year
      t.integer :type
      t.integer :separation_count

      t.timestamps
    end
  end
end
