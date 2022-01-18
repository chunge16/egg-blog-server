'use strict';

module.exports = app => {
  app.resources('users', '/api/users', app.controller.user);
  // app.resources('posts', '/posts', app.controller.post);
};
