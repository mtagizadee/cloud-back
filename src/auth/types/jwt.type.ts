export type TAccessTokenPayload = {
  id: number;
};

export type TRefreshTokenPayload = {
  id: number;

  /**
   * This salt is used to invalidate the pair of tokens
   * salt is going to be the secret key of the access token
   */
  salt: string;
};

export type TJwtPair = {
  accessToken: string;
  refreshToken: string;
};
