require 'rails_helper'

describe MessagesController do
  let(:user) {create(:user)}
  let(:group) {create(:group)}
  let(:message) {create(:message, group_id: group.id, user_id:user.id)}

  describe "GET #index" do
    describe "when user signed in" do

      before do
        sign_in user
        get :index, params: {group_id: group.id}
      end

      it "assigns the requested groups to @groups" do
        groups = user.groups
        expect(assigns(:groups)).to match(groups)
      end
      it "assigns the requested group to @group" do
        expect(assigns(:group)).to match(group)
      end
      it "assigns the requested message to @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it "assigns the requested messages to @messages" do
        messages = group.messages
        expect(assigns(:messages)).to match(messages)
      end
      it "renders the :index template" do
        expect(response).to render_template :index
      end
    end

    describe "when user didn't sign in" do
      it "redirects to user_session" do
        get :index, params: {group_id: group.id}
        expect(response).to redirect_to user_session_path
      end
    end
  end

  describe "POST #create" do
    describe "when user signed in" do

      before do
        sign_in user
      end

      describe "when body has content" do
        it "register new message" do
          message_c = attributes_for(:message, user_id: user.id, group_id: group.id)
          expect{post :create, params:{message: message_c, group_id: group.id}}.to change(Message, :count).by(1)
        end
        it "renders the :index template" do
          message_c = attributes_for(:message, user_id: user.id, group_id: group.id)
          post :create, params:{message: message_c, group_id: group.id}
          expect(response).to redirect_to group_messages_path(group)
        end
      end

      describe "when body is nil" do
        before do
          message_f = attributes_for(:message, body: nil, user_id: user.id, group_id: group.id)
          post :create, params:{message: message_f, group_id: group.id}
        end
        it "renders the :index template" do
          expect(response).to redirect_to group_messages_path(group)
        end
        it "makes error message when body of message is nil" do
          expect(flash[:alert]).not_to be_empty
        end
      end
    end
    describe "when user didn't sign in" do
      it "redirects to user_session" do
        message_c = attributes_for(:message, user_id: user.id, group_id: group.id)
        post :create, params:{message: message_c, group_id: group.id}
        expect(response).to redirect_to user_session_path
      end
    end
  end
end
