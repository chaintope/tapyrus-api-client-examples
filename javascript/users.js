let TapyrusApi = require('tapyrus_api');

let accsessToken = "";
let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accsessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

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
