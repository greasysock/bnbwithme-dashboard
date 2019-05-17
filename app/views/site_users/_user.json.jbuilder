json.extract! user, :id, :email, :cleaner, :admin
json.url user_url(user, format: :json)
json.firstName user.first_name
json.lastName user.last_name
