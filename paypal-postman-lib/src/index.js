import { needsNewAccessToken, refreshAccessToken, storeAccessToken } from "./auth";
import { isSandbox, getPayPalDebugId, base64Url, getJWT, getAuthAssertionFor } from "./utils";

const paypalPostman = {
    needsNewAccessToken,
    refreshAccessToken,
    storeAccessToken,
    isSandbox,
    getPayPalDebugId,
    base64Url,
    getJWT,
    getAuthAssertionFor
};

export default paypalPostman;