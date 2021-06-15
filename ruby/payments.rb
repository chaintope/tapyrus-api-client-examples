require 'openapi_client'

OpenapiClient.configure do |config|
  # You can change the host name and port number
  # config.host = 'localhost:3000'
end

access_token = "ya29.a0AfH6SMCCXiqb-VmA6XMquR6XWX57hv08BO3RvV_5EsbZR3ojuyMgZ3A2q7VLLUJJj7_e8k0zb0dLVo3DdU2FV8du6sNObLblY16gBMe4IhQNoyT0-8WcZyk1HmjT9Qfs7iRRW0rcpXQzPDdmDqB-nvGw1FuL"

api_client = OpenapiClient::ApiClient.new()
api_client.default_headers = { 'Authorization' => "Bearer #{access_token}" }
api_instance = OpenapiClient::PaymentApi.new(api_client)

begin
  # @route   POST /api/v1/payment 
  # @desc    Sending tapyrus
  payment_request_opts = {
    payment_request: OpenapiClient::PaymentRequest.new({
      address: 'mnpLDGG9iuyyyRzrdtXPnmugx9Zqr9CZgg', 
      amount: 100_000,
       fee: 1_000
    })
  }
  payment_result = api_instance.payment(payment_request_opts)
  p payment_result
rescue OpenapiClient::ApiError => e
  puts "Exception when calling AddressApi->address: #{e}"
end