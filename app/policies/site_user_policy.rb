class SiteUserPolicy < ApplicationAuthPolicy
    def destroy?
        user.admin
    end
    def update?
        user.admin
    end
    def create?
        user.admin
    end
end