'use strict';

const categories = require("../data/categories.json");

for (let i = 0; i < categories.length; i++) {
  categories[i].createdAt = new Date();
  categories[i].updatedAt = new Date();
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", categories, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};