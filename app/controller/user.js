'use strict';

const Controller = require('egg').Controller;
const createRule = {
  name: { type: 'string', required: true, allowEmpty: false },
  email: { type: 'email', required: true, allowEmpty: false },
  password: { type: 'string', required: true, allowEmpty: false },
};
class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.user.list(query);
  }

  async show() {
    const ctx = this.ctx;
    const user = await ctx.service.user.find(ctx.params.id);
    if (!user) {
      ctx.body = {
        msg: '该用户不存在',
        status: 'fail',
      };
    } else {
      const json = user.get({ plain: true });
      delete json.password;
      ctx.body = {
        status: 'ok',
        msg: '查找成功',
        data: json,
      };
    }
    ctx.status = 200;
  }

  // 用户注册
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);

    const [ model, created ] = await ctx.service.user.create(ctx.request.body);

    if (!created) {
      ctx.body = { status: 'fail', msg: '用户已存在' };
      ctx.status = 201;
      return;
    }
    ctx.status = 200;
    const json = model.get({ plain: true });
    delete json.password;
    ctx.body = {
      status: 'ok',
      msg: '注册成功',
      data: json,
    };

  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({ id, updates: body });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
  }

  // 用户登陆
  async login() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const data = await ctx.service.user.login(ctx.request.body);
    if (!data) {
      ctx.status = 401;
      ctx.body = {
        status: 'fail',
        msg: '用户名或密码错误',
      };
      return;
    }
    ctx.body = {
      status: 'ok',
      msg: '登录成功',
      data: {
        token: data,
      },
    };
  }

}

module.exports = UserController;
