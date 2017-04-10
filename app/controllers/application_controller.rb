class ApplicationController < ActionController::Base
   # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :flash_to_headers

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys:[:name])
    devise_parameter_sanitizer.permit(:account_update, keys:[:name])
  end

  private
    def flash_to_headers
      return unless request.xhr?
      response.headers["X-Message"] = flash_message
      response.headers["X-Message-Type"] = flash_type.to_s
      flash.discard
    end

    def flash_message
      [:error, :alert, :notice].each do |type|
        return flash[type] unless flash[type].blank?
      end
    end

    def flash_type
      [:error, :alert, :notice].each do |type|
        return type unless flash[type].blank?
      end
    end
end
