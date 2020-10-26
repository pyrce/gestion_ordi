'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.createTable(
      'users',
      {
        id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
      },
      nom: {
        type: Sequelize.STRING,
      },
        login: {
          type: Sequelize.STRING,
        },
        password:{
            type:Sequelize.STRING
        }
      }
    )
    },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.dropTable('user');

  }
};
