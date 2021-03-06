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

ActiveRecord::Schema.define(version: 2019_09_19_011112) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "custom_items", force: :cascade do |t|
    t.string "name"
    t.integer "quantity"
    t.decimal "price_given"
    t.decimal "subtotal"
    t.integer "quantity_refunded", default: 0
    t.decimal "subtotal_refunded", default: "0.0"
    t.bigint "order_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_custom_items_on_order_id"
  end

  create_table "item_orders", force: :cascade do |t|
    t.bigint "item_id"
    t.bigint "order_id"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "price_given"
    t.decimal "subtotal"
    t.integer "quantity_refunded", default: 0
    t.decimal "subtotal_refunded", default: "0.0"
    t.index ["item_id"], name: "index_item_orders_on_item_id"
    t.index ["order_id"], name: "index_item_orders_on_order_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.string "brand"
    t.string "size"
    t.string "color"
    t.string "thickness"
    t.decimal "sold_price", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.boolean "active"
    t.integer "inventory"
    t.decimal "bought_price", precision: 10, scale: 2
    t.string "stock_number"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "order_type"
    t.decimal "subtotal"
    t.decimal "taxes"
    t.decimal "total"
    t.decimal "subtotal_refunded", default: "0.0"
    t.decimal "taxes_refunded", default: "0.0"
    t.decimal "total_refunded", default: "0.0"
    t.boolean "tax_free", default: false
    t.decimal "debt"
    t.decimal "credit_card_payed", default: "0.0"
    t.decimal "cash_payed", default: "0.0"
    t.decimal "check_payed", default: "0.0"
    t.decimal "debit_payed", default: "0.0"
    t.string "name"
    t.string "telephone"
  end

  create_table "refund_items", force: :cascade do |t|
    t.integer "quantity_refunded", default: 0
    t.decimal "subtotal_refunded", default: "0.0"
    t.bigint "refund_order_id"
    t.string "refundable_type"
    t.bigint "refundable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["refund_order_id"], name: "index_refund_items_on_refund_order_id"
    t.index ["refundable_type", "refundable_id"], name: "index_refund_items_on_refundable_type_and_refundable_id"
  end

  create_table "refund_orders", force: :cascade do |t|
    t.bigint "order_id"
    t.decimal "subtotal_refunded"
    t.decimal "taxes_refunded"
    t.decimal "total_refunded"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_refund_orders_on_order_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "custom_items", "orders"
end
