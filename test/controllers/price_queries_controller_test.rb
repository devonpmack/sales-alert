# require 'test_helper'

# class PriceQueriesControllerTest < ActionDispatch::IntegrationTest
#   setup do
#     @price_query = price_queries(:one)
#   end

#   test "should get index" do
#     get price_queries_url
#     assert_response :success
#   end

#   test "should get new" do
#     get new_price_query_url
#     assert_response :success
#   end

#   test "should create price_query" do
#     assert_difference('PriceQuery.count') do
#       post price_queries_url, params: { price_query: { price: @price_query.price } }
#     end

#     assert_redirected_to price_query_url(PriceQuery.last)
#   end

#   test "should show price_query" do
#     get price_query_url(@price_query)
#     assert_response :success
#   end

#   test "should get edit" do
#     get edit_price_query_url(@price_query)
#     assert_response :success
#   end

#   test "should update price_query" do
#     patch price_query_url(@price_query), params: { price_query: { price: @price_query.price } }
#     assert_redirected_to price_query_url(@price_query)
#   end

#   test "should destroy price_query" do
#     assert_difference('PriceQuery.count', -1) do
#       delete price_query_url(@price_query)
#     end

#     assert_redirected_to price_queries_url
#   end
# end
