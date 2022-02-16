'use strict';
const Controller = require('egg').Controller;
const createRule = {
  content: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
class BlogController extends Controller {

  // 获取全部博客
  async index() {
    const { ctx } = this;
    const userId = ctx.session.user.id;
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 10;
    const offset = (page - 1) * limit;
    console.log('ctx.query', ctx.query);
    // TODO 参数校验
    try {
      const { count, rows } = await ctx.service.blog.list({
        offset,
        limit,
        userId,
      });
      ctx.body = {
        status: 'ok',
        msg: '获取成功',
        total: count,
        totalPage: Math.ceil(count / limit),
        page,
        data: rows,
      };
      ctx.status = 200;
    } catch (err) {
      ctx.status = 200;
      ctx.body = {
        status: 'fail',
        msg: '获取失败',
        total: 0,
        totalPage: 0,
        page: 0,
        data: [],
      };
    }


  }
  // 基于ID获取单个博客
  async show() {
    const { ctx } = this;
    const blogId = ctx.params.id;
    const data = await ctx.service.blog.find(blogId);
    console.log('show-data', data);

    if (!data) {
      ctx.body = {
        status: 'fail', msg: '博客不存在',
      };
      return;
    }
    const json = data.get({ plain: true });
    console.log('show-json', json);

    ctx.body = {
      status: 'ok',
      msg: '获取成功',
      data: json,
    };
    ctx.status = 200;
  }
  // 创建博客
  async create() {
    const { ctx } = this;
    const content = ctx.request.body.content;
    const options = {
      user_id: ctx.session.user.id,
      content,
    };
    ctx.validate(createRule, ctx.request.body);
    try {
      const data = await ctx.service.blog.create(options);
      console.log('create', data);
      ctx.status = 200;
      if (!data) {
        ctx.body = {
          status: 'fail', msg: '创建失败',
        };
        return;
      }
      const json = data.get({ plain: true });
      console.log('create-json', json);
      ctx.body = {
        status: 'ok',
        msg: '获取成功',
        data: json,
      };
    } catch (e) {
      ctx.status = 200;
      ctx.body = {
        status: 'fail', msg: '创建失败',
      };
    }

  }
  // 修改博客
  async update() {
    const ctx = this.ctx;
    const blogId = ctx.params.id;
    const userId = ctx.session.user.id;
    const updates = {
      content: ctx.request.body.content,
    };
    ctx.validate(createRule, ctx.request.body);
    try {
      const [ affectRow ] = await ctx.service.blog.update(blogId, userId, updates);
      ctx.status = 200;
      if (affectRow === 0) {
        ctx.body = {
          status: 'fail', msg: '博客不存在或你没有权限',
        };
        return;
      }
      const data = await ctx.service.blog.find(blogId);
      ctx.body = {
        status: 'ok',
        msg: '修改成功',
        data,
      };
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        status: 'fail', msg: '修改失败',
      };
    }
  }

  // 删除博客
  async destroy() {
    const { ctx } = this;
    const blogId = ctx.params.id;
    const userId = ctx.session.user.id;
    console.log('blogId', blogId);
    console.log('userId', userId);
    try {
      const affectRow = await ctx.service.blog.destroy({ blogId, userId });
      console.log('affectRow', affectRow);
      if (affectRow === 0) {
        ctx.status = 200;
        ctx.body = {
          status: 'fail', msg: '博客不存在或你没有权限',
        };
        return;
      }
      ctx.body = {
        status: 'ok', msg: '删除成功',
      };
    } catch (e) {
      console.log('e', e);
      ctx.status = 200;
      ctx.body = {
        status: 'fail', msg: '删除失败',
      };
    }
  }
}

module.exports = BlogController;
