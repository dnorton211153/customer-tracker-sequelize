'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Company.belongsToMany(models.Customer, {
        through: "company_customer",
        as: "customers",
        foreignKey: "company_id",
      });
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};