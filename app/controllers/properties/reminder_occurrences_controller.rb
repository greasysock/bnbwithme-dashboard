module Properties
    class ReminderOccurrencesController < ApplicationAuthController
        include DateFormat
        before_action :set_property
        before_action :set_reminders
        def index
            reminder_occurrences = []
            @reminders.each do |reminder|
                if reminder.recurrences == []
                    reminder_occurrences << render_reminder_occurrence(reminder)
                else
                    reminder_occurrences.concat(render_recurrences_occurrences(reminder))
                end

            end
            render json: reminder_occurrences
        end

        private
        # Use callbacks to share common setup or constraints between actions.

        def set_reminders
            @reminders = @property.reminders.all
        end

        def render_reminder_occurrence reminder
            {
                "start": reminder.start,
                "end": reminder.end,
                "reminder_type_id": reminder.reminder_type_id
            }
        end

        def render_icecube_occurrence reminder, occurrence
            {
                "start": occurrence,
                "end": occurrence,
                "reminder_type_id": reminder.reminder_type_id
            }
        end

        def get_recurrence_start reminder
            start_date = decode_date(params[:start])
            return reminder.start if start_date < reminder.start
            start_date
        end

        def get_recurrence_end reminder
            end_date = decode_date(params[:end])
            return reminder.end if end_date > reminder.end
            end_date
        end

        def render_recurrence_occurrences reminder, recurrence
            dStart = get_recurrence_start(reminder)
            dEnd = get_recurrence_end(reminder)
            schedule = IceCube::Schedule.new(dStart)
            case recurrence.recurrence_type.to_sym
            when :daily
            when :weekly
                schedule.add_recurrence_rule IceCube::Rule.weekly(recurrence.separation_count).day(recurrence.day_of_week)
            when :monthly
                schedule.add_recurrence_rule IceCube::Rule.monthly(recurrence.separation_count).day_of_week(recurrence.day_of_week => [recurrence.week_of_month])
            when :yearly
            end
            occurrences = schedule.occurrences(dEnd)
            out_occurrences = []
            occurrences.each do |occurrence|
                out_occurrences << render_icecube_occurrence(reminder, occurrence)
            end
            out_occurrences
        end

        def render_recurrences_occurrences reminder
            occurrences = []

            reminder.recurrences.each do |recurrence|
                occurrences.concat( render_recurrence_occurrences(reminder, recurrence) )
            end
            occurrences
        end

        def set_property
          @property = Property.find(params[:property_id])
        end

    end
end