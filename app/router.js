'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt); // jwt 中间件
  app.resources('users', '/api/users', jwt, app.controller.user);

  router.post('/api/register', controller.auth.register); // 用户注册
  router.post('/api/login', controller.auth.login); // 用户登陆

};
