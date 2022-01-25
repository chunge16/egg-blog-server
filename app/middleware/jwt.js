'use strict';

module.exports = options => {
  return async function jwt(ctx, next) {
    const authorization = ctx.request.header.authorization;
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const token = authorization.split(' ')[1];
      try {
        ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          status: 'fail',
          msg: 'token无效',
        };
        return;
      }

    } else {
      ctx.status = 401;
      ctx.body = {
        status: 'fail',
        msg: 'token不存在',
      };
    }
  };
};
