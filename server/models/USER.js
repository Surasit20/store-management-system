const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER', {
    USER_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USER_FULLNAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_BIRTHDAY: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    USER_CODE_NUMBER: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_TELL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_OCCUPATION: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_HOUSE_NUMBER: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_GROUP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_ALLEY: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_ROAD: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_SUB_DISTRICT: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_DISTRICT: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_PROVINCE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_POSTAL_CODE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_USERNAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    USER_PASSWORD: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'USER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
};
