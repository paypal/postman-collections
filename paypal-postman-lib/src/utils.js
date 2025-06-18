
function isSandbox() {
    return pm.variables.get("base_url").includes("sandbox.paypal.com");
}

function getPayPalDebugId() {
    if(pm && pm.response && pm.response.headers) {
        return pm.response.headers.get('Paypal-Debug-Id');
    } 
}

function getJWT(iss, data, alg, secret) {
    
    const header = { alg };
    const encodedHeader = base64url(JSON.stringify(header));
    const payload = { ...{ iss }, ...data };
    const encodedPayload = base64url(JSON.stringify(payload));
    const token = `${encodedHeader}.${encodedPayload}`;
    const signature = alg && alg !== 'none'
        ? base64url(CryptoJS.HmacSHA256(token, secret || '').toString())
        : '';
    
    return `${token}.${signature}`;
}

function base64Url(source) {
    return Buffer.from(source)
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_').toString('base64');
}

function getAuthAssertionFor(client_id, sellerEmailOrPayerId) {
    let data = { "payer_id" : sellerEmailOrPayerId };
    return getJWT(client_id, data, "none");
}


module.exports = {
  isSandbox,
  getPayPalDebugId,
  base64Url,
  getJWT,
  getAuthAssertionFor
};