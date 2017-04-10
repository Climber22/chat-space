json.message do |json|
  json.body @message.body
  json.date @message.created_at
  json.user_name @message.user.name
  json.error_message @message.errors.full_messages[0]
end
