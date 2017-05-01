class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json {@update_messages = get_update_messages}
    end
  end

  def create
    group = Group.find(params[:group_id])
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(group) }
        format.json
      end
    else
      respond_to do |format|
        format.html { redirect_to group_messages_path(group), alert: @message.errors.full_messages[0] }
        format.json
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end

  def get_update_messages
    current_message_id = params[:currentMessageId].to_i
    if(current_message_id != Message.last.id)
      update_messages = Message.where(id: (current_message_id+1)..(Message.last.id)).to_a
      return update_messages
    end
  end
end
