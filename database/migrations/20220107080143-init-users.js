'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * db:migrate 的时候调用
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userName: STRING(30),
      email: STRING,
      password: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    /**
     * db:migrate:undo 时候调用
     **/
    await queryInterface.dropTable('users');
  },
};
