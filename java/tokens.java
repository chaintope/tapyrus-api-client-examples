import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.model.*;
import org.openapitools.client.api.TokenApi;
import java.util.ArrayList;
import java.util.List;

public class Tokens {
    public static void main(String[] args) {
        String accessToken = "";

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("http://localhost:3000/api/v1");
        defaultClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

        TokenApi apiInstance = new TokenApi(defaultClient);
        try {
            IssueTokenRequest issueTokenRequest = new IssueTokenRequest();
            issueTokenRequest.setAmount(10000);
            issueTokenRequest.setTokenType(1);
            TokenResponse issueTokenResponse = apiInstance.issueToken(issueTokenRequest);
            System.out.println(issueTokenResponse);

            String reissueTokenId = "c14a1faf8089c2e2843438caa85cfc943b47d26a1e4dd5b279c72b4b4da4d67161";
            ReissueTokenRequest reissueTokenRequest = new ReissueTokenRequest();
            reissueTokenRequest.setAmount(1000);
            TokenResponse reissueTokenResponse = apiInstance.reissueToken(reissueTokenId, reissueTokenRequest);
            System.out.println(reissueTokenResponse);

            String transferTokenId = "c14a1faf8089c2e2843438caa85cfc943b47d26a1e4dd5b279c72b4b4da4d67161";
            TransferTokenRequest transferTokenRequest = new TransferTokenRequest();
            transferTokenRequest.setAmount(10000);
            transferTokenRequest.setAddress("mvZy7U661vyRwk2BHnZ1c5vBxg6jvQAhKK");
            TokenResponse transferTokenResponse = apiInstance.transferToken(transferTokenId, transferTokenRequest);
            System.out.println(transferTokenResponse);

            Boolean confirmationOnly = true;
            List<GetTokensResponse> getTokensResponse = apiInstance.getTokens(confirmationOnly);
            System.out.println(getTokensResponse);

            String burnTokenId = "c1a3078839cd51dfba9e2abe2233b20fe4496854132ba5a9ebc226a13d8278aec7";
            Integer amount = 1000;
            apiInstance.burnToken(burnTokenId, amount);
        } catch (ApiException e) {
            System.err.println("Exception when calling TokenApi#burnToken");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}