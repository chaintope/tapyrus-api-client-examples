let TapyrusApi = require('tapyrus_api');
const https = require('node:https');
const http = require('node:http');
const fs = require('node:fs');

let accsessToken = "";
let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accsessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

// Client certificate
if (fs.existsSync('user.p12')) {
  const options = {
    pfx: fs.readFileSync('user.p12'),
    passphrase: '1234'
  };
  httpsAgent = new https.Agent(options);
  defaultClient.requestAgent = httpsAgent;
}

let apiInstance = new TapyrusApi.TokenApi();


// @route   POST /api/v1/tokens/issue 
// @desc    Issue tokens
let issueTokenRequestOpts = {
  'issueTokenRequest': TapyrusApi.IssueTokenRequest.constructFromObject({amount: 200, token_type: 1})
}
apiInstance.issueToken(issueTokenRequestOpts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});


// @route   GET /api/v1/tokens 
// @desc    Get the list of tokens
let getTokensOpts = {
  'confirmationOnly': true
};
apiInstance.getTokens(getTokensOpts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});


// @route   POST /api/v1/tokens/:token_id/reissue 
// @desc    Reissue some tokens
let reissueTokenId = "";
let reissueTokenOpts = {
  'reissueTokenRequest': TapyrusApi.ReissueTokenRequest.constructFromObject({amount: 1000})
};
apiInstance.reissueToken(reissueTokenId, reissueTokenOpts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});

// @route   PUT /api/v1/tokens/:token_id/transfer 
// @desc    Transfer some tokens
let transferTokenId = "c12f7f6e72781c55305572dba9df78e13ee44d0e996f87b0d632db8089c57c0e3d";
let transferTokenRequest = TapyrusApi.TransferTokenRequest.constructFromObject({address: "mnpLDGG9iuyyyRzrdtXPnmugx9Zqr9CZgg", amount: 200})
apiInstance.transferToken(transferTokenId, transferTokenRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});


// @route   DELETE /api/v1/tokens/:token_id/burn 
// @desc    Burn some tokens
let burnTokenId = "c1309cb194cb9e8efaecc3ecaf8e426a0e3303b041ece155981d30872568a9058f"; 
let burnTokenOpts = {
  'amount': 500
};
apiInstance.burnToken(burnTokenId, burnTokenOpts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});