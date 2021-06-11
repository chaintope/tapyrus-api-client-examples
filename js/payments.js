let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let access_token = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${access_token}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let api = new TapyrusApi.PaymentApi();


function post_payment(opts) {
  return new Promise((resolve, reject) => {
    api.payment(opts, (err, data, response) => {
      try {
        resolve(response);
      } catch(err) {
        reject(err);
      }
    })
  })
}

// Verification: Failed
// @route   POST /api/v1/payment 
// @desc    Sending tapyrus
let opts = { address: 'mnzdZUieW2Hqe9GzZzVbcA7nHkDeFhJFzd', amount: 100000 };
post_payment(opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))