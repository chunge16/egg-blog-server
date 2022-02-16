'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { UUIDV4, UUID, DATE, STRING } = Sequelize;
    await queryInterface.createTable('blogs', {
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

  },

  down: async queryInterface => {
    await queryInterface.dropTable('blogs');
  },
};
