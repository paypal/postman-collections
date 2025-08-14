import { needsNewAccessToken, refreshAccessToken, storeAccessToken } from "./auth";
import { isSandbox, getPayPalDebugId, base64Url, getJWT, getAuthAssertionFor } from "./utils";

export const paypalPostman = {
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

export * from "./auth";
export * from "./utils";
export * from "./types";