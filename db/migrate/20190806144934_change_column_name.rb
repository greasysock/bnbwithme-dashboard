class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :reminder_recurrences, :type, :recurrence_type
  end
end
