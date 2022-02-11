'use strict';
const crypto = require('crypto');

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
  hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  },
};
