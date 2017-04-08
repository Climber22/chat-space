json.message do |json|
  json.body @message.body
  json.date @message.created_at
  json.user_name @message.user.name
end
