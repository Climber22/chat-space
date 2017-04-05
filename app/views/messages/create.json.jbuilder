json.user do |json|
  json.name @message.user.name
end
json.message do |json|
  json.body @message.body
  json.date @message.created_at
end
