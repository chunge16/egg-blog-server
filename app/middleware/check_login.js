'use strict';

module.exports = () => {
  return async function checkLogin(ctx, next) {
    if (ctx.session.user) {
      await next();
    } else {
      ctx.status = 200;
      ctx.body = {
        status: 'fail',
        msg: '登录后才能操作',
      };
    }
  };
};
