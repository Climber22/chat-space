
CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => ENV['AWS_ACCESS_KEY_ID'],
    :aws_secret_access_key  => ENV['AWS_SECRET_ACCESS_KEY'],
    :region                 => ENV['ap-northeast-1'],
    path_style: true
  }
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_public     = true
  config.fog_attributes = {'Cache-Control' => 'public, max-age=86400'}
  onfig.remove_previously_stored_files_after_update = false
  config.fog_directory = ENV['AWS_S3_BUCKET']
  config.asset_host = ENV['AWA_S3_URL']

end
