const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SUMMARY_DAILT_INSTALLMENTS', {
    SUMMARY_DAILT_INSTALLMENTS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    INSTALLMENTS_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SUMMARY_DAILT_INSTALLMENTS_DAILY_BALANCE: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
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
        name: "INSTALLMENTS_ID",
        using: "BTREE",
        fields: [
          { name: "INSTALLMENTS_ID" },
        ]
      },
      {
        name: "USER_ID",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
};
