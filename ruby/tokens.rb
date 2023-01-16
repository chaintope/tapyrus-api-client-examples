require 'openapi_client'

OpenapiClient.configure do |config|
  # You can change the host name and port number
  # config.host = 'localhost:3000'
end

access_token = "

api_client = OpenapiClient::ApiClient.new()
api_client.default_headers = { 'Authorization' => "Bearer #{access_token}" }
api_instance = OpenapiClient::TokenApi.new(api_client)



begin
  # @route  POST /api/v1/tokens /issue 
  # @desc   Issue tokens
  issue_token_opts = {
  issue_token_request: OpenapiClient::IssueTokenRequest.new({amount: 100}) }
  issue_token_result = api_instance.issue_token(issue_token_opts)
  p issue_token_result

  # @route    GET /api/v1/tokens 
  # @desc     Get the list of tokens
  confirmation_only_opts = { confirmation_only: true }
  result = api_instance.get_tokens(confirmation_only_opts)
  p result

  # @route   POST /api/v1/tokens/:token_id/reissue 
  # @desc    Reissue Token
  reissue_token_id = 'c3ec2fd806701a3f55808cbec3922c38dafaa3070c48c803e9043ee3642c660b46'
  opts = {
    reissue_token_request: OpenapiClient::ReissueTokenRequest.new({amount: 100})
  }
  reissue_token_result = api_instance.reissue_token(reissue_token_id, reissue_token_request)
  p reissue_token_result

  # @route   POST /api/v1/tokens/:token_id/reissue
  # @desc    Transfer some tokens
  transfer_token_id = 'c3ec2fd806701a3f55808cbec3922c38dafaa3070c48c803e9043ee3642c660b46'
  transfer_token_result = api_instance.transfer_token(transfer_token_id, transfer_token_request)
  p transfer_token_result

  # @route   DELETE /api/v1/tokens/:token_id/burn 
  # @desc    Burn some tokens
  burn_token_id = 'c3ec2fd806701a3f55808cbec3922c38dafaa3070c48c803e9043ee3642c660b46'
  burn_token_opts = { amount: 500 }
  data, status_code = api_instance.burn_token_with_http_info(burn_token_id, burn_token_opts)
  p status_code # => 2xx
  p data # => nil

rescue OpenapiClient::ApiError => e
  puts "Exception when calling AddressApi->address: #{e}"
end