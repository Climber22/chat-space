  json.body message.body
  json.date message.created_at
  json.user_name message.user.name
  json.image message.image
  json.id message.id
  json.error_message message.errors.full_messages[0]
