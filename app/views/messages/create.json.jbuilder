json.message do |message|
  json.partial! "message", message: @message
end
