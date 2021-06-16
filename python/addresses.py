import time
import openapi_client
from openapi_client.api import address_api
from pprint import pprint

access_token = ""

configuration = openapi_client.Configuration(
    host = "http://localhost:3000/api/v1"
)

with openapi_client.ApiClient(configuration, header_name="Authorization", header_value="Bearer "+access_token) as api_client:
    api_instance = address_api.AddressApi(api_client)

    try:
        # @route   POST /api/v1/addresses 
        # @desc    Generate new Address
        address_response = api_instance.address()
        pprint(address_response)

        # @route   GET /api/v1/addresses 
        # @desc    Get the list of addresses
        per = 10
        page = 1
        get_addresses_response = api_instance.get_addresses(per=per, page=page)
        pprint(get_addresses_response)
    except openapi_client.ApiException as e:
        print("Exception when calling AddressApi->address: %s\n" % e)