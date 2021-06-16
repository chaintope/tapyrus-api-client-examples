require 'openapi_client'

OpenapiClient.configure do |config|
  # You can change the host name and port number
  # config.host = 'localhost:3000'
end

access_token = "ya29.a0AfH6SMCCXiqb-VmA6XMquR6XWX57hv08BO3RvV_5EsbZR3ojuyMgZ3A2q7VLLUJJj7_e8k0zb0dLVo3DdU2FV8du6sNObLblY16gBMe4IhQNoyT0-8WcZyk1HmjT9Qfs7iRRW0rcpXQzPDdmDqB-nvGw1FuL"

api_client = OpenapiClient::ApiClient.new()
api_client.default_headers = { 'Authorization' => "Bearer #{access_token}" }
api_instance = OpenapiClient::TimestampApi.new(api_client)

begin
  # @route   POST /api/v1/timestamp 
  # @desc    Genetate new timestamp
  add_timestamp_opts = {
    add_timestamp_request: OpenapiClient::AddTimestampRequest.new({content_hash: '9ccc644b03a88358a754962903a659a2d338767ee61674dde5434702a6256e6d'}) 
  }
  add_timestamp_responses = api_instance.add_timestamp_with_http_info(add_timestamp_opts)
  p add_timestamp_responses[1]

  # @route   GET /api/v1/timestamps 
  # @desc    Get the list of timestamps
  result = api_instance.get_timestamps
  p result
rescue OpenapiClient::ApiError => e
  puts "Exception when calling AddressApi->address: #{e}"
end