let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let accessToken = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let api = new TapyrusApi.AddressApi();

function addAddress() {
  return new Promise((resolve, reject) => {
    api.address((err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

function getAddresses(opts) {
return new Promise((resolve, reject) => {
  api.addresses(opts, (err, data) => {
    if (err) reject(err);
    resolve(data);
  })
})
}

// @route   POST /api/v1/addresses 
// @desc    Generate new Address
addAddress()
  .then(data => console.log(data))
  .catch(err => console.log(err))

// @route   GET /api/v1/addresses 
// @desc    Get the list of addresses
let opts = { per: 10, page: 1 };
getAddresses(opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))