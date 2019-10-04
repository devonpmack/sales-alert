class QueryController < ApplicationController
  def query
    item = TrackedItem.find(params[:id])

    respond_to do |format|
      puts "works"
      RunQueriesJob.perform_later(item)
      format.json { render json: { success: true} }
    end
  end
end
