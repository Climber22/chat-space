require 'rails_helper'

describe Message do
  it "is invalid without a body" do
    message = build(:message, body: "")
    message.valid?
    expect(message.errors[:body]).to include("can't be blank")
  end

  it "is valid with at body" do
    message = build(:message)
    message.valid?
    expect(message).to be_valid
  end
end
