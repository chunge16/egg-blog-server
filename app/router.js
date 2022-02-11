'use strict';

module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin();
  app.resources('blogs', '/api/blog', checkLogin, app.controller.blog);

  router.post('/api/register', controller.auth.register); // 用户注册
  router.post('/api/login', controller.auth.login); // 用户登陆

};
