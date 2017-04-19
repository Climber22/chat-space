class UsersController < ApplicationController
  def search
    respond_to do |format|
      format.json {
        keyword = params[:user_name][:keyword]
        @users = User.where("name Like(?)","%#{keyword}%").where.not(id: current_user.id)
      }
    end
  end
end
