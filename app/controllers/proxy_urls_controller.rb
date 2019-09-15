class ProxyUrlsController < ApplicationController
  before_action :set_proxy_url, only: [:show, :edit, :update, :destroy]

  # GET /proxy_urls
  # GET /proxy_urls.json
  def index
    @proxy_urls = ProxyUrl.all
  end

  # GET /proxy_urls/1
  # GET /proxy_urls/1.json
  def show
  end

  # GET /proxy_urls/new
  def new
    @proxy_url = ProxyUrl.new
  end

  # GET /proxy_urls/1/edit
  def edit
  end

  # POST /proxy_urls
  # POST /proxy_urls.json
  def create
    @proxy_url = ProxyUrl.new(proxy_url_params)

    respond_to do |format|
      if @proxy_url.save
        format.html { redirect_to @proxy_url, notice: 'Proxy url was successfully created.' }
        format.json { render :show, status: :created, location: @proxy_url }
      else
        format.html { render :new }
        format.json { render json: @proxy_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /proxy_urls/1
  # PATCH/PUT /proxy_urls/1.json
  def update
    respond_to do |format|
      if @proxy_url.update(proxy_url_params)
        format.html { redirect_to @proxy_url, notice: 'Proxy url was successfully updated.' }
        format.json { render :show, status: :ok, location: @proxy_url }
      else
        format.html { render :edit }
        format.json { render json: @proxy_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /proxy_urls/1
  # DELETE /proxy_urls/1.json
  def destroy
    @proxy_url.destroy
    respond_to do |format|
      format.html { redirect_to proxy_urls_url, notice: 'Proxy url was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_proxy_url
      @proxy_url = ProxyUrl.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def proxy_url_params
      params.require(:proxy_url).permit(:ip)
    end
end
