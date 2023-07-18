const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MOTORCYCLE_ID', {
    MOTORCYCLE_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MOTORCYCLE_BALANCE: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    MOTORCYCLE_PRICE: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    MOTORCYCLE_BRAND: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MOTORCYCLE_MODEL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MOTORCYCLE_COLOR: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MOTORCYCLE_REGISTRATION_NUMBER: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MOTORCYCLE_BUCKET_NUMBER: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MOTORCYCLE_IMAGE: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MOTORCYCLE_ID',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MOTORCYCLE_ID" },
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
