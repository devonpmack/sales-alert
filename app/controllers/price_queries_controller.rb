class PriceQueriesController < ApplicationController
  before_action :set_price_query, only: [:show, :edit, :update, :destroy]

  # GET /price_queries
  # GET /price_queries.json
  def index
    @price_queries = PriceQuery.all
  end

  # GET /price_queries/1
  # GET /price_queries/1.json
  def show
  end

  # GET /price_queries/new
  def new
    @price_query = PriceQuery.new
  end

  # GET /price_queries/1/edit
  def edit
  end

  # POST /price_queries
  # POST /price_queries.json
  def create
    @price_query = PriceQuery.new(price_query_params)

    respond_to do |format|
      if @price_query.save
        format.html { redirect_to @price_query, notice: 'Price query was successfully created.' }
        format.json { render :show, status: :created, location: @price_query }
      else
        format.html { render :new }
        format.json { render json: @price_query.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /price_queries/1
  # PATCH/PUT /price_queries/1.json
  def update
    respond_to do |format|
      if @price_query.update(price_query_params)
        format.html { redirect_to @price_query, notice: 'Price query was successfully updated.' }
        format.json { render :show, status: :ok, location: @price_query }
      else
        format.html { render :edit }
        format.json { render json: @price_query.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /price_queries/1
  # DELETE /price_queries/1.json
  def destroy
    @price_query.destroy
    respond_to do |format|
      format.html { redirect_to price_queries_url, notice: 'Price query was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_price_query
      @price_query = PriceQuery.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def price_query_params
      params.require(:price_query).permit(:price)
    end
end
