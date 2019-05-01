json.extract! reservation, :id, :guest, :start, :end, :phone, :email, :cleaner
json.service reservation.ical.service
json.url reservation_url(reservation, format: :json)