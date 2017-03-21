class GroupsController < ApplicationController

  def index
    @message = ""
    @groups = current_user.groups
  end

  def edit
    @group = Group.find(params[:group_id])
  end

  def create
    group = Group.create(group_params)
    redirect_to controller: "messages", action: "index", group_id: group.id
  end

  def new
    @group = Group.new
  end

  private
  def group_params
    params.require(:group).permit(:name,:user_ids=>[])
  end
end
