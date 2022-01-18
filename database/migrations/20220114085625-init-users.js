'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { UUIDV4, UUID, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
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
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  },
};
