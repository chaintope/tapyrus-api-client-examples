import time
import openapi_client
from openapi_client.api import token_api
from openapi_client.model.issue_token_request import IssueTokenRequest
from openapi_client.model.reissue_token_request import ReissueTokenRequest
from openapi_client.model.transfer_token_request import TransferTokenRequest
from openapi_client.model.token_response import TokenResponse
from pprint import pprint

access_token = ""

configuration = openapi_client.Configuration(
    host = "http://localhost:3000/api/v1"
)

with openapi_client.ApiClient(configuration, header_name="Authorization", header_value="Bearer "+access_token) as api_client:
    api_instance = token_api.TokenApi(api_client)

    try:
        # @route   POST /api/v1/tokens/issue 
        # @desc    Issue new token
        issue_token_request = IssueTokenRequest(
          amount=10000,
          token_type=1,
        )
        issue_token_response = api_instance.issue_token(issue_token_request=issue_token_request)
        pprint(issue_token_response)

        # @route   GET /api/v1/tokens 
        # @desc    Get the list of tokens
        confirmation_only = True
        get_tokens_response = api_instance.get_tokens(confirmation_only=confirmation_only)
        pprint(get_tokens_response)

        # @route   POST /api/v1/tokens/:token_id/reissue 
        # @desc    Reissue Token
        reissue_token_id = "c10d1a693eaa0542c9bcbb4d2d5046f1d00cff87c2ddf0337e370723574db06543"
        reissue_token_request = ReissueTokenRequest(
            amount=3000
        )
        api_response = api_instance.reissue_token(reissue_token_id, reissue_token_request=reissue_token_request)
        pprint(api_response)

        # @route   POST /api/v1/tokens/:token_id/transfer 
        # @desc    Transfer some tokens
        transfer_token_id = "c188cc44abd93d573c80b06a8fa6c3ad011c3b288b6d85982862238b0a3170f0e6"
        transfer_token_request = TransferTokenRequest(
          address="n26cW7UHhFEbv9evj3iQJR6Uc8BGcqxUuZ",
          amount=100
        )
        transfer_token_response = api_instance.transfer_token(transfer_token_id, transfer_token_request)
        pprint(transfer_token_response)

        # @route   DELETE /api/v1/tokens/:token_id/burn 
        # @desc    Burn some tokens
        burn_token_id = "c110f99e21f087c84d4f93b02b3c07e6b1c53671e6ef05301e0d2e4912ba9f97d0"
        amount = 100
        burn_token_response = api_instance.burn_token(burn_token_id, amount=amount)
        pprint(burn_token_response)
    except openapi_client.ApiException as e:
        print("Exception when calling AddressApi->address: %s\n" % e)