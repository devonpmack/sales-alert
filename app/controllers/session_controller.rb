class SessionController < ApplicationController
    def create
        @user = User.find_by(email: params[:login][:email]);
        if @user && @user.authenticate(params[:login][:password])
            session[:id] = @user.id
            redirect_to '/profile'
        else
            redirect_to '/login'
        end
    end

    def new
        if !session[:id].nil?
            redirect_to 'My profile', 'profile'
        end
    end

    def destroy
        session[:id] = nil         
        redirect_to root_path
    end
end
