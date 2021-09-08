import time
import openapi_client
from openapi_client.api import payment_api
from openapi_client.model.payment_response import PaymentResponse
from openapi_client.model.payment_request import PaymentRequest
from pprint import pprint

access_token = ""

configuration = openapi_client.Configuration(
    host = "http://localhost:3000/api/v1"
)

with openapi_client.ApiClient(configuration, header_name="Authorization", header_value="Bearer "+access_token) as api_client:
    api_instance = payment_api.PaymentApi(api_client)

    try:
        # @route   POST /api/v1/payment 
        # @desc    Sending tapyrus
        payment_request = PaymentRequest(
          address="mz8AEDt1KVbE4wUpWm1oQGbY37A7uxj3GU",
          amount=10000,
          fee=10000,
        ) 
        payment_response = api_instance.payment(payment_request=payment_request)
        pprint(payment_response)
    except openapi_client.ApiException as e:
        print("Exception when calling AddressApi->address: %s\n" % e)