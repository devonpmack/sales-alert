class QueryController < ApplicationController
  skip_before_action :verify_authenticity_token

  def query
    item = TrackedItem.find(params[:id])
    if item.updated_at > 2.hours.ago
      RunQueriesJob.perform_later(item)
      render json: { success: true}
    else
      render json: { success: false }
    end
  end
end
