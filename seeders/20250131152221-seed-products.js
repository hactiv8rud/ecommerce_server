'use strict';

const products = require("../data/products.json");

for (let i = 0; i < products.length; i++) {
  products[i].createdAt = new Date();
  products[i].updatedAt = new Date();
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  }
};