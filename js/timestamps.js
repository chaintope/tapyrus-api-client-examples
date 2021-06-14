let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let accessToken = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let api = new TapyrusApi.TimestampApi();

function addTimestamp(opts) {
  return new Promise((resolve, reject) => {
    api.addTImestamp(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(response);
    })
  })
}

function getTimestamps() {
  return new Promise((resolve, reject) => {
    api.getTimestamps((err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

// @route   POST /api/v1/timestamp 
// @desc    Genetate new timestamp
let opts = { content_hash: "9ccc644b03a88358a754962903a659a2d338767ee61674dde5434702a6256e6d", prefix: "app" }
addTimestamp(opts)
  .then(response => console.log(response))
  .catch(err => console.log(err))

// @route   GET /api/v1/timestamps 
// @desc    Get the list of timestamps
getTimestamps()
  .then(response => console.log(response))
  .catch(err => console.log(err))