module ApplicationHelper
    def user_role
        return "Administrator" if current_user.admin
        return "Home Owner" if current_user.properties.first
        return "Cleaner" if current_user.cleanings.first
        "User"
    end
end
