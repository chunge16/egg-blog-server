'use strict';

const Service = require('egg').Service;

class Blog extends Service {
  constructor(ctx) {
    super(ctx);
    this.blogAttributes = [
      [ 'blog_id', 'blogId' ],
      [ 'user_id', 'userId' ],
      'content',
      [ 'created_at', 'createdAt' ],
    ];
  }
  // list
  async list({ offset = 0, limit = 10, userId }) {
    const { ctx } = this;
    const options = {
      offset,
      limit,
      where: {},
      attributes: this.blogAttributes,
      include: [
        {
          model: ctx.model.User,
          as: 'user',
          attributes: { exclude: [ 'password', 'created_at', 'updated_at' ] },
        },
      ],
      order: [[ 'created_at', 'desc' ]],
    };
    if (userId) {
      options.where.user_Id = userId;
    }
    return this.ctx.model.Blog.findAndCountAll(options);
  }

  async find(id) {
    const { ctx } = this;
    return this.ctx.model.Blog.findByPk(id, {
      attributes: this.blogAttributes,
      include: [{
        model: ctx.model.User,
        as: 'user',
        attributes: [ 'name' ],
      }],
    });
  }

  async create(options) {
    return this.ctx.model.Blog.create(options);
  }

  async update(blog_id, user_id, updates) {

    return this.ctx.model.Blog.update(updates, {
      where: {
        blog_id,
        user_id,
      },
    });
  }

  async destroy({ blogId, userId }) {
    return this.ctx.model.Blog.destroy({
      where: {
        blog_Id: blogId,
        user_Id: userId,
      },
    });

  }
}

module.exports = Blog;
