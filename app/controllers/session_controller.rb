class SessionController < ApplicationController
    def create
        @user = User.find_by(email: params[:login][:email]);
        if @user && @user.authenticate(params[:login][:password])
            msg = {success: true, id: @user.id, email: @user.email}
            render json: msg
            return
        end

        msg = {success: false}
        render json: msg
    end

    def new
    end

    def destroy
    end
end
