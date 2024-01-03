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
    INSTALLMENTS_MONEY: {
      type: DataTypes.DECIMAL(10,0),
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
        name: "INSTALLMENTS_MOTORCYCLE_ID_IDX",
        using: "BTREE",
        fields: [
          { name: "MOTORCYCLE_ID" },
        ]
      },
    ]
  });
};
