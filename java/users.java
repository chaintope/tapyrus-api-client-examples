import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.model.*;
import org.openapitools.client.api.UserApi;

public class Users {
    public static void main(String[] args) {
        String accessToken = "";

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://localhost:3000/api/v1");
        defaultClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

        UserApi apiInstance = new UserApi(defaultClient);
        try {
            Boolean confirmationOnly = true;
            UserinfoResponse userinfoResponse = apiInstance.userinfo(confirmationOnly);
            System.out.println(userinfoResponse);
        } catch (ApiException e) {
            System.err.println("Exception when calling UserApi#userinfo");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}