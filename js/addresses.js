let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let access_token = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${access_token}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let api = new TapyrusApi.AddressApi();

function post_address() {
  return new Promise((resolve, reject) => {
    api.address((err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

function get_addresses(opts) {
return new Promise((resolve, reject) => {
  api.addresses(opts, (err, data) => {
    if (err) reject(err);
    resolve(data);
  })
})
}

// Verification: Success
// @route   POST /api/v1/addresses 
// @desc    Generate new Address
post_address()
  .then(data => console.log(data))
  .catch(err => console.log(err))

// Verification: Success
// @route   GET /api/v1/addresses 
// @desc    Get the list of addresses
let opts = { per: 10, page: 1 };
get_addresses(opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))