'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required."
        },
        notEmpty: {
          args: true,
          msg: "Name is required."
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category is required."
        },
        notEmpty: {
          args: true,
          msg: "Category is required."
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image url is required."
        },
        notEmpty: {
          args: true,
          msg: "Image url is required."
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is required."
        },
        isNumeric: {
          args: true,
          msg: "Price must be numeric."
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock is required."
        },
        isNumeric: {
          args: true,
          msg: "Stock must be numeric."
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
    validate: {
      isPriceMinus() {
        if (this.price < 0) {
          throw new Error ("Price cannot be less than 0.");
        }
      },
      isStockMinus() {
        if (this.stock < 0) {
          throw new Error ("Stock cannot be less than 0.");
        }
      }
    }
  });
  return Product;
};