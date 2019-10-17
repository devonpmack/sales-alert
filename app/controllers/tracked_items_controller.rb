class TrackedItemsController < ApplicationController
  before_action :set_tracked_item, only: [:show, :update, :destroy]
  # belongs_to :user

  # GET /tracked_items
  # GET /tracked_items.json
  def index
    @tracked_items = TrackedItem.all
  end

  # GET /tracked_items/1
  # GET /tracked_items/1.json
  def show
    latest = @tracked_item.latest_query
    if latest
      render json: {price: latest.price}
    else
      render json: {price: nil}
    end
  end

  # GET /tracked_items/new
  def new
    @tracked_item = TrackedItem.new
  end

  # POST /tracked_items
  # POST /tracked_items.json
  def create
    @tracked_item = TrackedItem.new(tracked_item_params)
    # byebug

    respond_to do |format|
      if @tracked_item.save
        format.json { render :show, status: :created, location: @tracked_item }
      else
        format.json { render json: @tracked_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tracked_items/1
  # PATCH/PUT /tracked_items/1.json
  def update
    respond_to do |format|
      if @tracked_item.update(tracked_item_params)
        format.html { redirect_to @tracked_item, notice: 'Tracked item was successfully updated.' }
        format.json { render :show, status: :ok, location: @tracked_item }
      else
        format.html { render :edit }
        format.json { render json: @tracked_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tracked_items/1
  # DELETE /tracked_items/1.json
  def destroy
    @tracked_item.price_queries.destroy_all
    @tracked_item.destroy
    respond_to do |format|
      format.html { redirect_to tracked_items_url, notice: 'Tracked item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tracked_item
      @tracked_item = TrackedItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tracked_item_params
      params.require(:tracked_item).permit(:name, :url, :threshold, :user_id)
    end
end
