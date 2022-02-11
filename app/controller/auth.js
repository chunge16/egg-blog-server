'use strict';
const Controller = require('egg').Controller;
const ms = require('ms');
const createRule = {
  name: { type: 'string', required: true, allowEmpty: false },
  email: { type: 'email', required: true, allowEmpty: false },
  password: { type: 'string', required: true, allowEmpty: false },
};

const loginRule = {
  email: { type: 'email', required: true, allowEmpty: false },
  password: { type: 'string', required: true, allowEmpty: false },
};
class AuthController extends Controller {
  // 用户登陆
  async login() {
    const { ctx } = this;
    ctx.validate(loginRule, ctx.request.body);
    const data = await ctx.service.user.login(ctx.request.body);
    // 用户是否存在
    if (!data) {
      ctx.status = 401;
      ctx.body = {
        status: 'fail',
        msg: '该用户不存在',
      };
      return;
    }
    // 密码是否正确
    const json = data.get({ plain: true });
    if (json.password !== ctx.helper.hash(ctx.request.body.password)) {
      ctx.status = 401;
      ctx.body = {
        status: 'fail',
        msg: '密码错误',
      };
      return;
    }
    // 是否7天记住登录
    if (ctx.request.body.rememberMe) ctx.session.maxAge = ms('7d');

    ctx.session.user = json;
    delete json.password;
    ctx.body = {
      status: 'ok',
      msg: '登录成功',
      data: {
        ...json,
      },
    };
  }

  // 用户注册
  async register() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    const data = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: this.ctx.helper.hash(ctx.request.body.password),
    };

    const [ model, created ] = await ctx.service.user.create(data);

    if (!created) {
      ctx.body = { status: 'fail', msg: '用户已存在' };
      ctx.status = 201;
      return;
    }

    const json = model.get({ plain: true });
    ctx.session.user = json;
    delete json.password;

    ctx.status = 200;
    ctx.body = {
      status: 'ok',
      msg: '注册成功',
      data: json,
    };
  }

  // 用户退出登录
  async loginOut() {
    const { ctx } = this;
    ctx.status = 200;
    if (ctx.session.user) {
      ctx.session.user = null;
      ctx.body = {
        status: 'ok',
        msg: '注销成功',
      };
    } else {
      ctx.body = {
        status: 'fail',
        msg: '当前用户尚未登录',
      };
    }
  }
}

module.exports = AuthController;
