
function needsNewAccessToken({ accessTokenVar, accessTokenExpiryVar, forClientIdVar, clientIdVar }) {
  const expiry = pm.collectionVariables.get(accessTokenExpiryVar);
  const token = pm.collectionVariables.get(accessTokenVar);
  const clientId = pm.variables.get(clientIdVar);
  const forClient = pm.collectionVariables.get(forClientIdVar);

  const isExpired = !expiry || expiry <= Date.now();
  const isMissing = !token || !forClient || forClient !== clientId;
  const isTokenEndpoint = pm.request.url.path.join('/').includes('/oauth2/token');

  return !isTokenEndpoint && (isExpired || isMissing);
}

function refreshAccessToken({
  accessTokenVar,
  accessTokenExpiryVar,
  forClientIdVar,
  clientIdVar,
  clientSecretVar,
  baseUrlVar
}, callback) {
  const clientId = pm.variables.get(clientIdVar);
  const clientSecret = pm.variables.get(clientSecretVar);
  const baseUrl = pm.variables.get(baseUrlVar);

  const request = {
    url: baseUrl + '/v1/oauth2/token',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: {
      mode: 'urlencoded',
      urlencoded: [{ key: 'grant_type', value: 'client_credentials' }]
    }
  };

  pm.collectionVariables.unset(accessTokenVar);
  pm.collectionVariables.unset(accessTokenExpiryVar);
  pm.collectionVariables.unset(forClientIdVar);

  pm.sendRequest(request, function (err, res) {
    if (res.code === 200) {
      const json = res.json();
      console.log("Saving the access_token");
      pm.collectionVariables.set(accessTokenVar, json.access_token);
      const expiry = new Date();
      expiry.setSeconds(expiry.getSeconds() + json.expires_in);
      pm.collectionVariables.set(accessTokenExpiryVar, expiry.getTime());
      pm.collectionVariables.set(forClientIdVar, clientId);
    } else {
      console.error("Failed to obtain access_token", err, res.code, res.headers.get('Paypal-Debug-Id'), res.json());
    }
    if (callback) callback();
  });
}

function storeAccessToken(responseJson, {
  accessTokenVar,
  accessTokenExpiryVar,
  forClientIdVar,
  clientIdVar
}) {
  const clientId = pm.variables.get(clientIdVar);

  pm.collectionVariables.set(accessTokenVar, responseJson.access_token);

  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + responseJson.expires_in);
  pm.collectionVariables.set(accessTokenExpiryVar, expiry.getTime());
  pm.collectionVariables.set(forClientIdVar, clientId);

  if (responseJson.client_metadata?.display_name) {
    console.log("Logged in using App =", responseJson.client_metadata.display_name);
  }
}

module.exports = {
  needsNewAccessToken,
  refreshAccessToken,
  storeAccessToken
};