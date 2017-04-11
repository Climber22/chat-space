class GroupsController < ApplicationController

  before_action :set_group, only:[:edit, :update]

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group), notice: "Successfully create group." }
        format.json
      end
    else
      respond_to do |format|
        format.html { render :new }
        format.json
      end
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "successfully update group"
    else
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
