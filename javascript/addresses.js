let TapyrusApi = require('tapyrus_api');

let accsessToken = "";
let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accsessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'


// @route   POST /api/v1/addresses 
// @desc    Generate new Address
let apiInstance = new TapyrusApi.AddressApi();
apiInstance.address((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});


// @route   GET /api/v1/addresses 
// @desc    Get the list of addresses
let opts = {
  'per': 10,
  'page': 1 
};
apiInstance.getAddresses(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});