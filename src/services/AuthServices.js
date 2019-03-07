/* eslint-disable no-unused-expressions */

'use-strict';

import jwt from 'jsonwebtoken';
import config from '../config';

class AuthServices {
  generateToken = async data => jwt.sign(data, config.SALT_KEY, { expiresIn: '1d' });

  // eslint-disable-next-line
  decodeToken = async token => await jwt.verify(token, config.SALT_KEY);

  authorize = async ({ body, query, headers }, res, next) => {
    const token = body.token || query.token || headers['x-access-token'];
    !this.isTokenValid(token) ? this.sendResponse(res, 401, 'unauthorized') : next();
  };

  isAdmin = async ({ body, query, headers }, res, next) => {
    const token = body.token || query.token || headers['x-access-token'];

    if (!this.isTokenValid(token)) this.sendResponse(res, 401, 'unauthorized');

    else !this.isTokenAdmin(token) ? this.sendResponse(res, 403, 'forbidden') : next();
  };

  isTokenEmpty = token => !!token;

  isTokenValid = (token) => {
    const isValid = [];
    jwt.verify(token, config.SALT_KEY, error => isValid.push(error));
    const [valid] = isValid;
    return !valid;
  };

  isTokenAdmin = (token) => {
    try {
      const isValid = [];
      jwt.verify(token, config.SALT_KEY, (error, { roles }) => isValid.push(roles.includes('admin')));
      const [valid] = isValid;
      return valid;
    } catch (error) {
      return false;
    }
  };

  sendResponse = (res, statusCode, message) => res.status(statusCode).json({ message });
}

export default AuthServices;
