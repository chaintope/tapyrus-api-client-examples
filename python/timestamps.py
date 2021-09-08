import time
import openapi_client
from openapi_client.api import timestamp_api
from openapi_client.model.add_timestamp_request import AddTimestampRequest
from openapi_client.model.get_addresses_response import GetAddressesResponse
from pprint import pprint

access_token = ""

configuration = openapi_client.Configuration(
    host = "http://localhost:3000/api/v1"
)

with openapi_client.ApiClient(configuration, header_name="Authorization", header_value="Bearer "+access_token) as api_client:
    api_instance = timestamp_api.TimestampApi(api_client)

    try:
        # @route   POST /api/v1/timestamp 
        # @desc    Genetate new timestamp
        add_timestamp_request = AddTimestampRequest(
          content_hash="9ccc644b03a88358a754962903a659a2d338767ee61674dde5434702a6256e6d",
          prefix="app",
        )
        api_instance.add_timestamp(add_timestamp_request=add_timestamp_request)
        
        # @route   GET /api/v1/timestamps 
        # @desc    Get the list of timestamps
        get_timestamps_response = api_instance.get_timestamps()
        pprint(get_timestamps_response)
    except openapi_client.ApiException as e:
        print("Exception when calling AddressApi->address: %s\n" % e)