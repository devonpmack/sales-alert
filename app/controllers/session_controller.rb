class SessionController < ApplicationController
    def create
        @user = User.find_by(email: params[:login][:email]);
        if @user && @user.authenticate(params[:login][:password])
            session[:id] = @user.id
        end
    end

    def new
        if !session[:id].nil?
            redirect_to '/profile'
        end
    end

    def destroy
        session[:id] = nil
    end
end
