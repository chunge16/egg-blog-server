'use strict';

module.exports = app => {
  const { STRING, UUID, DATE, UUIDV4 } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      allowNull: false,
      defaultValue: UUIDV4,
      primaryKey: true,
      type: UUID,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: STRING,
    created_at: DATE,
    updated_at: DATE,
  });
  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Blog, { as: 'blog' });
  };
  return User;
};
