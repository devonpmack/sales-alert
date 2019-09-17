class ApplicationController < ActionController::Base
  before_action :authenticate_request

  private

  def authenticate_request
    # byebug
    # @authenticated = AuthorizeApiRequest.call(request.headers).result
    # render json: { error: 'Not Authorized' }, status: 401 unless @authenticated
  end
end
