'use strict';

const Service = require('egg').Service;

class User extends Service {
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
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      // this.ctx.throw(404, 'user not found');
      return {
        msg: '该用户不存在',
        status: 'fail',
      };
    }
    return {
      status: 'ok',
      msg: 'successful',
      data: user,
    };
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
    // return this.ctx.model.User.create(user);
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
}

module.exports = User;
