
import { JWTHeader, JWTPayload } from './types';

export function isSandbox(): boolean {
    return pm.variables.get("base_url").includes("sandbox.paypal.com");
}

export function getPayPalDebugId(): string | undefined {
    if (pm && pm.response && pm.response.headers) {
        return pm.response.headers.get('Paypal-Debug-Id');
    }
    return undefined;
}

export function getJWT(iss: string, data: Record<string, any>, alg: string, secret?: string): string {
    const header: JWTHeader = { alg };
    const encodedHeader = base64Url(JSON.stringify(header));
    const payload: JWTPayload = { ...{ iss }, ...data };
    const encodedPayload = base64Url(JSON.stringify(payload));
    const token = `${encodedHeader}.${encodedPayload}`;
    const signature = alg && alg !== 'none'
        ? base64Url(CryptoJS.HmacSHA256(token, secret || '').toString())
        : '';
    
    return `${token}.${signature}`;
}

export function base64Url(source: string): string {
    return Buffer.from(source)
        .toString('base64')
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export function getAuthAssertionFor(client_id: string, sellerEmailOrPayerId: string): string {
    const data = { "payer_id": sellerEmailOrPayerId };
    return getJWT(client_id, data, "none");
}