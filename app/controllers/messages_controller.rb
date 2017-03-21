class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    @group_menbers = Group.find(params[:group_id]).users.pluck(:name).join(" ")
    @message = ""
  end

  def create
  end
end
