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

let apiInstance = new TapyrusApi.UserApi();


// @route   GET /api/v1/userinfo 
// @desc    Get User Info
let opts = {
  'confirmationOnly': true
};
apiInstance.userinfo(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});
