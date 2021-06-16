import time
import openapi_client
from openapi_client.api import user_api
from openapi_client.model.userinfo_response import UserinfoResponse
from pprint import pprint

access_token = ""

configuration = openapi_client.Configuration(
    host = "http://localhost:3000/api/v1"
)

with openapi_client.ApiClient(configuration, header_name="Authorization", header_value="Bearer "+access_token) as api_client:
    api_instance = user_api.UserApi(api_client)

    try:
        # @route   POST /api/v1/userinfo 
        # @desc    Get User Info
        confirmation_only = True
        api_response = api_instance.userinfo(confirmation_only=confirmation_only)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling AddressApi->address: %s\n" % e)