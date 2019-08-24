class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    respond_to do |format|
      winks = []
      @user.tracked_items.each do |item|
        winks << jsonify_tracked_item(item)
      end

      format.json { render json: {winks: winks, email: @user.email, id: @user.id} }
    end
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      msg = {success: true, id: @user.id, email: @user.email}
      render json: msg
    else
      msg = {success: false, error: 'That email is in use. Try logging in.'}
      if @user.errors && @user.errors.messages.first.last.first == "doesn't match Password"
        msg = {success: false, error: "Password doesn't match password confirmation."}
      end
      render json: msg
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    error = nil
    success = false
    @user = User.find(params[:id])
    if @user && @user.authenticate(params[:user][:password])
      if params[:user][:email]
        @user.email = params[:user][:email]

      end

      if params[:user][:new_password]
        @user.password = params[:user][:new_password]
        @user.password_confirmation = params[:user][:password_confirmation]
      end

      if @user.save
        success = true
      end
    else
      error = 'Wrong password';
    end

    render json: {success: success, error: error}
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def jsonify_tracked_item(item)
      return {
        id: item.id,
        url: item.url,
        name: item.name,
        threshold: item.threshold,
        queries: item.price_queries.map { |query| {price: query.price, date: query.created_at}}
      }
    end
end
