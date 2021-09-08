import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.model.*;
import org.openapitools.client.api.TimestampApi;

public class Timestamps {
    public static void main(String[] args) {
        String accessToken = "";

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://localhost:3000/api/v1");
        defaultClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

        TimestampApi apiInstance = new TimestampApi(defaultClient);
        try {
            AddTimestampRequest addTimestampRequest = new AddTimestampRequest();
            addTimestampRequest.setContentHash("9ccc644b03a88358a754962903a659a2d338767ee61674dde5434702a6256e6d");
            addTimestampRequest.setPrefix("app");
            apiInstance.addTimestamp(addTimestampRequest);
        } catch (ApiException e) {
            System.err.println("Exception when calling TimestampApi#addTimestamp");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}