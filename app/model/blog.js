'use strict';

module.exports = app => {
  const { STRING, UUID, DATE, UUIDV4 } = app.Sequelize;

  const Blog = app.model.define('blog', {
    blog_id: {
      allowNull: false,
      defaultValue: UUIDV4,
      primaryKey: true,
      type: UUID,
    },
    user_id: {
      allowNull: false,
      type: STRING,
    },
    content: {
      type: STRING,
      defaultValue: '',
      allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Blog.prototype.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts' });
  };

  return Blog;
};
