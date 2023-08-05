const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INSTALLMENTS', {
    INSTALLMENTS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MOTORCYCLE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    INSTALLMENTS_NO: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    INSTALLMENTS_TIME: {
      type: DataTypes.TIME,
      allowNull: true
    },
    INSTALLMENTS_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    INSTALLMENTS_MONEY: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    INSTALLMENTS_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    INSTALLMENTS_IMAGE: {
      type: DataTypes.STRING(4000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'INSTALLMENTS',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "INSTALLMENTS_ID" },
        ]
      },
      {
        name: "MOTORCYCLE_ID",
        using: "BTREE",
        fields: [
          { name: "MOTORCYCLE_ID" },
        ]
      },
    ]
  });
};
