class GroupsController < ApplicationController

  before_action :set_group, only:[:edit, :update]

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
    @user = User.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_messages_path(@group), notice: "Successfully create group."
    else
      render :new
    end
  end

  def edit
    @user = User.new
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "successfully update group"
    else
      render :edit
    end
  end

  def search
    respond_to do |format|
      format.json {
        keyword = params[:user_name][:keyword]
        if(params[:action_before] == "new")
          @users = User.where("name Like(?)","%#{keyword}%").where.not(id: current_user.id)
        else
          group_id = params[:group][:id]
          @users_already = Group.find(group_id).users
          @users = User.where("name Like(?)","%#{keyword}%").where.not(id: current_user.id).where.not(id: @users_already.ids)
        end
      }
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
