json.updateMessages do
  json.array!(@update_messages) do |message|
    json.partial!(message)
  end
end
