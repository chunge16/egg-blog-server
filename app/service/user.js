'use strict';

const Service = require('egg').Service;

class User extends Service {
  constructor(ctx) {
    super(ctx);
    this.attributes = [ 'id', 'name', 'email' ];
  }
  async list({ offset = 0, limit = 10 }) {
    const data = this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
    if (!data) {
      return {
        status: 'ok',
        msg: 'successful',
        data: [],
      };
    }
    return {
      status: 'ok',
      msg: 'successful',
      data,
    };
  }

  async find(id) {
    return this.ctx.model.User.findByPk(id);
  }

  async create(user) {
    return this.ctx.model.User.findOrCreate({
      where: {
        email: user.email,
      },

      defaults: {
        name: user.name,
        password: user.password,
      },
    });
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      return {
        msg: '该用户不存在',
        status: 'fail',
      };
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }

  // 用户登陆
  async login(body) {
    const { email } = body;
    const user = await this.ctx.model.User.findOne({
      where: { email },
      attributes: this.attributes,
    });
    if (!user) return null;

    return user;
  }
}

module.exports = User;
