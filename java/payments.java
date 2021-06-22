import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.model.*;
import org.openapitools.client.api.PaymentApi;

public class Payments {
    public static void main(String[] args) {
        String accessToken = "";

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://localhost:3000/api/v1");
        defaultClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

        PaymentApi apiInstance = new PaymentApi(defaultClient);
        try {
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setAddress("mvZy7U661vyRwk2BHnZ1c5vBxg6jvQAhKK");
            paymentRequest.setAmount(100000);
            paymentRequest.setFee(10000);
            PaymentResponse paymentResponse = apiInstance.payment(paymentRequest);
            System.out.println(paymentResponse);
        } catch (ApiException e) {
            System.err.println("Exception when calling PaymentApi#payment");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}