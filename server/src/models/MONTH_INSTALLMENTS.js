const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONTH_INSTALLMENTS', {
    MONTH_INSTALLMENTS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MONTH_INSTALLMENTS_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MONTH_INSTALLMENTS_TIME: {
      type: DataTypes.TIME,
      allowNull: true
    },
    MONTH_INSTALLMENTS_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    MONTH_INSTALLMENTS_MONEY: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    MONTH_INSTALLMENTS_IMAGE: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    INSTALLMENTS_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MONTH_INSTALLMENTS_COMMENT: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONTH_INSTALLMENTS',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MONTH_INSTALLMENTS_ID" },
        ]
      },
      {
        name: "INSTALLMENTS_ID",
        using: "BTREE",
        fields: [
          { name: "INSTALLMENTS_ID" },
        ]
      },
    ]
  });
};
