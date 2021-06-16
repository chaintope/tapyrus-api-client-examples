let TapyrusApi = require('tapyrus_api');

let accsessToken = "";
let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accsessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let apiInstance = new TapyrusApi.TimestampApi();

// @route   POST /api/v1/timestamp 
// @desc    Genetate new timestamp
let addTimestampOpts = {
  'addTimestampRequest': TapyrusApi.AddTimestampRequest.constructFromObject({
    content_hash: 'sss', 
    prefix: 'app'
  })
}
apiInstance.addTimestamp(addTimestampOpts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});


// @route   GET /api/v1/timestamps 
// @desc    Get the list of timestamps
apiInstance.getTimestamps((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});