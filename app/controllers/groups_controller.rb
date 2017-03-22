class GroupsController < ApplicationController

  def index
    @message = ""
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create
    group = Group.new(group_params)
    status = group.save
    if status then
    redirect_to controller: "messages", action: "index", group_id: group.id, notice: "Successfully create group."
    else
      redirect_to new_group_path,notice: "Unfortunately, you failed to create group. Please try again."
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    @group.update(group_params)
    redirect_to  group_messages_path(group_id: params[:id]), notice: "successfully update group"
  end

  private
  def group_params
    params.require(:group).permit(:name,user_ids:[])
  end
end
