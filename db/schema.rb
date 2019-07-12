# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_12_165940) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "icals", force: :cascade do |t|
    t.integer "service"
    t.text "link"
    t.bigint "property_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id"], name: "index_icals_on_property_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color"
    t.bigint "owner_id"
    t.index ["owner_id"], name: "index_properties_on_owner_id"
  end

  create_table "reminder_types", force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reminders", force: :cascade do |t|
    t.bigint "property_id"
    t.datetime "start"
    t.datetime "end"
    t.bigint "reminder_type_id"
    t.boolean "full_day"
    t.boolean "indefinite"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id"], name: "index_reminders_on_property_id"
    t.index ["reminder_type_id"], name: "index_reminders_on_reminder_type_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.date "start"
    t.date "end"
    t.bigint "cleaner_id"
    t.bigint "property_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "ical_id"
    t.integer "duration"
    t.string "guest"
    t.string "phone"
    t.string "email"
    t.index ["cleaner_id"], name: "index_reservations_on_cleaner_id"
    t.index ["ical_id"], name: "index_reservations_on_ical_id"
    t.index ["property_id"], name: "index_reservations_on_property_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin"
    t.boolean "cleaner"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "reservations", "icals"
end
