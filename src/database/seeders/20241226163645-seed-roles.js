'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      {
        role_id: 1,
        role_name: 'CLIENT',
      },
      {
        role_id: 2,
        role_name: 'FREELANCER',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
