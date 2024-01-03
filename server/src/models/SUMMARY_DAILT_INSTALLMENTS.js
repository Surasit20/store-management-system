const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SUMMARY_DAILT_INSTALLMENTS', {
    SUMMARY_DAILT_INSTALLMENTS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    INSTALLMENTS_AMOUNT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "INSTALLMENTS_AMOUNT_ID"
    },
    MOTORCYCLE_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "MOTORCYCLE_ID"
    },
    SUMMARY_DAILT_INSTALLMENTS_DAILY_BALANCE: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SUMMARY_DAILT_INSTALLMENTS',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SUMMARY_DAILT_INSTALLMENTS_ID" },
        ]
      },
      {
        name: "INSTALLMENTS_AMOUNT_ID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "INSTALLMENTS_AMOUNT_ID" },
        ]
      },
      {
        name: "MOTORCYCLE_ID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MOTORCYCLE_ID" },
        ]
      },
    ]
  });
};
