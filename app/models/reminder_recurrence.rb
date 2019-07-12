class ReminderRecurrence < ApplicationRecord
  belongs_to :reminder
  enum type: [:daily, :weekly, :monthly, :yearly]
end
