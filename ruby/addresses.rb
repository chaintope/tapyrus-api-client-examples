require 'openapi_client'

OpenapiClient.configure do |config|
  # You can change the host name and port number
  # config.host = 'localhost:3000'
end

access_token = ""

api_client = OpenapiClient::ApiClient.new()
api_client.default_headers = { 'Authorization' => "Bearer #{access_token}" }
api_instance = OpenapiClient::AddressApi.new(api_client)

begin
  # @route   POST /api/v1/addresses 
  # @desc    Generate new Address
  get_addresses_opts = {
    per: 10,
    page: 1 
  }
  add_address_result = api_instance.address()
  p add_address_result

  # @route   GET /api/v1/addresses 
  # @desc    Get the list of addresses
  get_addresses_result = api_instance.get_addresses(get_addresses_opts)
  p get_addresses_result
rescue OpenapiClient::ApiError => e
  puts "Exception when calling AddressApi->address: #{e}"
end