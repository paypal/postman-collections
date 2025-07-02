export interface AccessTokenConfig {
  accessTokenVar: string;
  accessTokenExpiryVar: string;
  forClientIdVar: string;
  clientIdVar: string;
}

export interface RefreshTokenConfig extends AccessTokenConfig {
  clientSecretVar: string;
  baseUrlVar: string;
}

export interface PostmanVariables {
  get(key: string): string;
}

export interface PostmanCollectionVariables {
  get(key: string): string;
  set(key: string, value: string | number): void;
  unset(key: string): void;
}

export interface PostmanRequest {
  url: {
    path: string[];
  };
}

export interface PostmanResponse {
  headers: {
    get(key: string): string;
  };
}

export interface PostmanRequestConfig {
  url: string;
  method: string;
  header: Record<string, string>;
  body: {
    mode: string;
    urlencoded: Array<{ key: string; value: string }>;
  };
}

export interface PostmanSendRequestCallback {
  (error: any, response: any): void;
}

export interface PostmanGlobals {
  variables: PostmanVariables;
  collectionVariables: PostmanCollectionVariables;
  request: PostmanRequest;
  response?: PostmanResponse;
  sendRequest(config: PostmanRequestConfig, callback: PostmanSendRequestCallback): void;
}

export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  client_metadata?: {
    display_name?: string;
  };
}

export interface JWTHeader {
  alg: string;
}

export interface JWTPayload {
  iss: string;
  [key: string]: any;
}

declare global {
  const pm: PostmanGlobals;
  const CryptoJS: {
    HmacSHA256(message: string, secret: string): {
      toString(): string;
    };
  };
}