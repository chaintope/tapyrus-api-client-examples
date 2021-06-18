require 'openapi_client'

OpenapiClient.configure do |config|
  # You can change the host name and port number
  # config.host = 'localhost:3000'
end

access_token = ""

api_client = OpenapiClient::ApiClient.new()
api_client.default_headers = { 'Authorization' => "Bearer #{access_token}" }
api_instance = OpenapiClient::UserApi.new(api_client)

begin
  # @route   POST /api/v1/userinfo 
  # @desc    Get User Info
  confirmation_only_opts = { confirmation_only: true }
  result = api_instance.userinfo(confirmation_only_opts)
  p result
rescue OpenapiClient::ApiError => e
  puts "Exception when calling AddressApi->address: #{e}"
end