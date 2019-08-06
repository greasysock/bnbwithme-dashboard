class ReminderRecurrence < ApplicationRecord
  belongs_to :reminder
  enum recurrence_type: [:daily, :weekly, :monthly, :yearly]
end
