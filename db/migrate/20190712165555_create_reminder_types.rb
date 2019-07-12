class CreateReminderTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :reminder_types do |t|
      t.string :name
      t.string :symbol

      t.timestamps
    end
  end
end
