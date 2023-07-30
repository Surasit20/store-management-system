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
      allowNull: false
    },
    INSTALLMENTS_TIME: {
      type: DataTypes.TIME,
      allowNull: false
    },
    INSTALLMENTS_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    INSTALLMENTS_MONEY: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    INSTALLMENTS_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    INSTALLMENTS_IMAGE: {
      type: DataTypes.STRING(4000),
      allowNull: false
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
