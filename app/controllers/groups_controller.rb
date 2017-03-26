class GroupsController < ApplicationController

  before_action :set_group, only:[:edit, :update]

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create
    group = Group.new(group_params)
    if group.save
      redirect_to group_messages_path(group), notice: "Successfully create group."
    else
      flash.now[:alert] = "Unfortunately, you failed to create group. Please try again."
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "successfully update group"
    else
      flash.now[:alert] = "Unfortunately, you failed to edit group. Please try again."
    render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name,user_ids:[])
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
