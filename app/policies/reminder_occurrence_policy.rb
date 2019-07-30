class ReminderOccurrencePolicy < ApplicationAuthPolicy
    def index?
        user.admin
    end
end