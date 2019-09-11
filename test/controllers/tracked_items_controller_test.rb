# require 'test_helper'

# class TrackedItemsControllerTest < ActionDispatch::IntegrationTest
#   setup do
#     @tracked_item = tracked_items(:one)
#   end

#   test "should get index" do
#     get tracked_items_url
#     assert_response :success
#   end

#   test "should get new" do
#     get new_tracked_item_url
#     assert_response :success
#   end

#   test "should create tracked_item" do
#     assert_difference('TrackedItem.count') do
#       post tracked_items_url, params: { tracked_item: { name: @tracked_item.name, threshold: @tracked_item.threshold, url: @tracked_item.url } }
#     end

#     assert_redirected_to tracked_item_url(TrackedItem.last)
#   end

#   test "should show tracked_item" do
#     get tracked_item_url(@tracked_item)
#     assert_response :success
#   end

#   test "should get edit" do
#     get edit_tracked_item_url(@tracked_item)
#     assert_response :success
#   end

#   test "should update tracked_item" do
#     patch tracked_item_url(@tracked_item), params: { tracked_item: { name: @tracked_item.name, threshold: @tracked_item.threshold, url: @tracked_item.url } }
#     assert_redirected_to tracked_item_url(@tracked_item)
#   end

#   test "should destroy tracked_item" do
#     assert_difference('TrackedItem.count', -1) do
#       delete tracked_item_url(@tracked_item)
#     end

#     assert_redirected_to tracked_items_url
#   end
# end
