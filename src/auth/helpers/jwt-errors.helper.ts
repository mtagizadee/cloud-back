export class JwtErrors {
  static isTokenExpiredError(error: any): boolean {
    return error.name === 'TokenExpiredError';
  }
}
