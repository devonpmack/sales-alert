# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_11_021324) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "price_queries", force: :cascade do |t|
    t.float "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "tracked_item_id"
    t.index ["tracked_item_id"], name: "index_price_queries_on_tracked_item_id"
  end

  create_table "proxy_urls", force: :cascade do |t|
    t.string "ip"
    t.integer "num_success", default: 0
    t.integer "num_failures", default: 0
  end

  create_table "tracked_items", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.float "threshold"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_tracked_items_on_user_id"
  end

  create_table "trackers", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.float "threshold"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
