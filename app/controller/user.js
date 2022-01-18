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
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

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
}

module.exports = UserController;
