'use strict';
const { hash } = require("../helpers/bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.History);
      this.belongsToMany(models.Product, {
        through: "Carts",
        foreignKey: "UserId"
      });
      this.belongsToMany(models.Product, {
        through: "Wishlists",
        foreignKey: "UserId"
      });
    }
    getFullName() {
      return `${this.first_name} ${this.last_name}`;
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Firstname is required."
        },
        notEmpty: {
          args: true,
          msg: "Firstname is required."
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required."
        },
        notEmpty: {
          args: true,
          msg: "Email is required."
        },
        isEmail: {
          args: true,
          msg: "Email is invalid."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is required."
        },
        notEmpty: {
          args: true,
          msg: "Password is required."
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: ["admin", "customer"],
          msg: "Role is invalid."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    validate: {
      isPasswordMinLength (){
        if(this.password !== "" && this.password.length < 6) {
          throw new Error ("Password must contain at least 6 characters.");
        }
      }
    }
  });

  User.beforeCreate((instance, options) => {
    let hashed = hash(instance.password);
    instance.password = hashed;
    
    if (!instance.last_name) {
      instance.last_name = instance.first_name;
    }
    instance.role = "customer";
  });
  return User;
};