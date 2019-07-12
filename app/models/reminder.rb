class Reminder < ApplicationRecord
    has_many :recurrences, foreign_key: 'reminder_id', class_name: 'ReminderRecurrence', dependent: :destroy
    belongs_to :reminder_type
    belongs_to :property
end
