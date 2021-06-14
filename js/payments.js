let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let accessToken = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let api = new TapyrusApi.PaymentApi();


function postPayment(opts) {
  return new Promise((resolve, reject) => {
    api.payment(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

// @route   POST /api/v1/payment 
// @desc    Sending tapyrus
let opts = { address: 'mnzdZUieW2Hqe9GzZzVbcA7nHkDeFhJFzd', amount: 100000 };
postPayment(opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))