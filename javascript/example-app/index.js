const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.urlencoded({extended: true}));

const port = 3000;
const tapyrusApiHost = 'https://testnet-api.tapyrus.chaintope.com';

const { AuthorizationCode } = require('simple-oauth2');
const https = require('node:https');
const http = require('node:http');
const fs = require('node:fs');

const TapyrusApi = require('tapyrus_api');
const defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.basePath = `${tapyrusApiHost}/api/v1`;

// OAuth2 Client credentials. Modify for your own environment.
const client_id = '';
const client_secret = 'dummy';

let config = null;
// Client certificate
if (fs.existsSync('user.p12')) {
  const options = {
    pfx: fs.readFileSync('user.p12'),
    passphrase: '1234'
  };
  httpsAgent = new https.Agent(options);
  httpAgent = new http.Agent(options);
  defaultClient.requestAgent = httpsAgent;
  config = {
    client: {
      id: client_id,
      secret: client_secret
    },
    auth: {
      tokenHost: tapyrusApiHost,
      tokenPath: 'oauth2/v1/token',
      authorizeHost: tapyrusApiHost,
      authorizePath: 'oauth2/v1/authorize'
    },
    http: {
      agents: {
        https: httpsAgent,
        http: httpAgent,
        httpsAllowUnauthorized: httpsAgent
      }
    }
  };
} else {
  config = {
    client: {
      id: client_id,
      secret: client_secret
    },
    auth: {
      tokenHost: tapyrusApiHost,
      tokenPath: 'oauth2/v1/token',
      authorizeHost: tapyrusApiHost,
      authorizePath: 'oauth2/v1/authorize'
    }
  };
}



let client;
let accessToken;

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', async (req, res) => {
  if (typeof accessToken == "undefined") {
    res.send("<a href=\"/authorize\">authorize</a>")
  } else {
    let html = "<h1>Hello, Tapyrus API!</h1>"
    html += '<form action="/create_address" method="post"><button type="submit">Create Address</button></form>';
    html += '<h2>Payment</h2>'
      + '<form action="/payment" method="post">'
      + '<label>to address</label><input type="text" name="to_address" /><br/>'
      + '<label>amount</label><input type="text" name="amount"/><br/>'
      + '<label>fee</label><input type="text" name="fee" value="1000"/><br/>'
      + '<button type="submit">Pay!</button>'
      + '</form>';

    const userApi = new TapyrusApi.UserApi();
    userApi.getUserInfo({}, (error, data, response) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(data);

        html += '<h1>Balances</h1>';
        html += '<ul>';
        for (const tokenId in data.balances) {
          html += `<li>${tokenId}: ${data.balances[tokenId] || 0}</li>`;
        }
        html += '</ul>';

        html += '<h1>Addresses</h1>';
        html += '<ul>';
        for (const address of data.addresses) {
          html += `<li>${address}</li>`;
        }
        html += '</ul>';

        res.send(html);
      }
    });
  }
});

app.get('/authorize', async (req, res) => {
  client = new AuthorizationCode(config);
  const state = crypto.randomBytes(16).toString('base64').substring(0, 16);
  const authorizationUri = client.authorizeURL({
    redirect_uri: `http://localhost:${port}/cb`,
    scope: 'openid profile',
    state
  });
  res.redirect(authorizationUri);
});

app.get('/cb', async (req, res) => {
  response = await client.getToken({ code: req.query.code });
  accessToken = response.token['access_token'];
  defaultClient.defaultHeaders = {Authorization: `Bearer ${accessToken}`};
  res.redirect('/');
});

app.post('/create_address', (req, res) => {
  let addressApi = new TapyrusApi.AddressApi();
  addressApi.createAddress((error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      res.redirect('/');
    }
  });
});

app.post('/payment', (req, res) => {
  const paymentApi = new TapyrusApi.PaymentApi();
  const paymentRequest = TapyrusApi.PaymentRequest.constructFromObject({
    address: req.body.to_address,
    amount: req.body.amount,
    fee: req.body.fee
  });

  paymentApi.transfer({paymentRequest}, (error, data, response) => {
    if (error) {
      console.error(error);
      res.redirect('/');
    } else {
      console.log(JSON.stringify(data));
      res.redirect('/');
    }
  });
});