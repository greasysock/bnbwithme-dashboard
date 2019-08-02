module Properties
    class ReminderOccurrencesController < ApplicationAuthController
        include DateFormat
        before_action :set_property
        before_action :set_reminders
        def index
            reminder_occurences = []
            @reminders.each do |reminder|
                if reminder.recurrences == []
                    reminder_occurences << render_occurence(reminder)
                end

            end
            render json: reminder_occurences
        end

        private
        # Use callbacks to share common setup or constraints between actions.

        def set_reminders
            @reminders = @property.reminders.where(:end => decode_date(params[:start])...decode_date(params[:end]))
        end

        def render_occurence reminder
            {
                "start": reminder.start,
                "end": reminder.end,
                "reminder_type_id": reminder.reminder_type_id
            }
        end

        def set_property
          @property = Property.find(params[:property_id])
        end

    end
end