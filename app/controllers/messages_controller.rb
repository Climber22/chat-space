class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    @message = ""
  end

  def create
  end
end
