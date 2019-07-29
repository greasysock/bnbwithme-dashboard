class ReminderPolicy < ApplicationAuthPolicy
    def show?
        user.admin || @property.owner == user || user.cleaner
    end

    def update?
        user.admin
    end

    def create?
        user.admin
    end

    def destroy?
        user.admin
    end

    def emit?
        user.admin || @property.owner == user || user.cleaner
    end

    class Scope < Scope
        def resolve
            user.cleaner || user.admin ? scope.all : user.properties
        end
    end
end
