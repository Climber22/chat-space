class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    group = Group.find(params[:group_id])
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(group) }
        format.json { render :create }
      end
    else
      respond_to do |format|
        format.html { redirect_to group_messages_path(group), alert: @message.errors.full_messages[0] }
        format.json { render :create}
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:body).merge(user_id: current_user.id, group_id: params[:group_id])
  end
end
