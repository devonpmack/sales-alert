class HomeController < ApplicationController
  user = User.find(session[:id]);

  if user
    @current_user = {id: user.id, email: user.email}
  else
    @current_user = nil
  end
end
