import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.model.*;
import org.openapitools.client.api.AddressApi;

public class Addresses {
    public static void main(String[] args) {
        String accessToken = "";

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://localhost:3000/api/v1");
        defaultClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

        AddressApi apiInstance = new AddressApi(defaultClient);
        try {
            String addAddressResponse = apiInstance.address();
            System.out.println(addAddressResponse);

            Integer per = 10;
            Integer page = 1;
            GetAddressesResponse getAddressesResponse = apiInstance.getAddresses(per, page);
            System.out.println(getAddressesResponse);
        } catch (ApiException e) {
            System.err.println("Exception when calling AddressApi#getAddresses");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}