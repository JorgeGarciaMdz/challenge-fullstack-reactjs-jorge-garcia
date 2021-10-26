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
    await queryInterface.bulkInsert('Users', [{
      name: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      birthday: '1990-10-09',
      dni: 12345,
      password: 'johndoe123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Harry',
      lastName: 'Postre',
      email: 'harry@postre.com',
      birthday: '2000-10-09',
      dni: 123345,
      password: 'harrypostre',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Peter',
      lastName: 'Parker',
      email: 'peter@parker.com',
      birthday: '1900-10-09',
      dni: 432345,
      password: 'peterparker',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
