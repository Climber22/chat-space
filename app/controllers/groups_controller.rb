class GroupsController < ApplicationController

  def index
    @message = ""
    @groups = current_user.groups
  end

  def edit
  end
end
