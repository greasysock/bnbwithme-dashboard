class ReminderPolicy < ApplicationAuthPolicy

    def emit?
        user.admin
    end
    
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

    class Scope < Scope
        def resolve
            user.cleaner || user.admin ? scope.all : user.properties
        end
    end
end
