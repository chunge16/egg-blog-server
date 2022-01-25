'use strict';
const crypto = require('crypto');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
  getTokenInfo(jwt, auth, secret) {
    // 判断请求头是否包含token
    if (
      auth.authorization &&
      auth.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = auth.authorization.split(' ')[1];
      let decode = '';
      if (token) {
        decode = jwt.verify(token, secret);
      }
      return decode;
    }
    return;
  },
  hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  },
};
