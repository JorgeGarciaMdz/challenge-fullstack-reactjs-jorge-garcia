'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Operations', [
      {
        concept: "fletes",
        amount: 12,
        typeOperation: "INGRESO",
        user_id: 1,
        updatedAt: "2021-10-23T14:47:34.433",
        createdAt: "2021-10-23T14:47:34.433"
      },
      {
        concept: "viaticos",
        amount: 10,
        typeOperation: "EGRESO",
        user_id: 1,
        updatedAt: "2021-10-23T14:47:34.433",
        createdAt: "2021-10-23T14:47:34.433"
      },
      {
        concept: "viandas",
        amount: 8,
        typeOperation: "EGRESO",
        user_id: 1,
        updatedAt: "2021-10-23T14:47:34.433",
        createdAt: "2021-10-23T14:47:34.433"
      },
      {
        concept: "fletes",
        amount: 12,
        typeOperation: "INGRESO",
        user_id: 2,
        updatedAt: "2021-10-23T14:47:34.433",
        createdAt: "2021-10-23T14:47:34.433"
      },
      {
        concept: "viaticos",
        amount: 10,
        typeOperation: "EGRESO",
        user_id: 2,
        updatedAt: "2021-10-23T14:47:34.433",
        createdAt: "2021-10-23T14:47:34.433"
      },
      {
        concept: "viandas",
        amount: 8,
        typeOperation: "EGRESO",
        user_id: 2,
        updatedAt: "2021-10-23T14:47:34.433",
        createdAt: "2021-10-23T14:47:34.433"
      }
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
