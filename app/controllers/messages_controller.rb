class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages
  end

  def create
    group = Group.find(params[:group_id])
    message = Message.new(message_params)
    if message.save
      redirect_to group_messages_path(group)
    else
      flash[:alert] = message.errors.full_messages
      redirect_to group_messages_path(group)
    end
  end

  private
  def message_params
    params.require(:message).permit(:body).merge(user_id: current_user.id, group_id: params[:group_id])
  end
end
