class RegistrationsController < Devise::RegistrationsController
  clear_respond_to
  respond_to :json

  # before_action :create
end
