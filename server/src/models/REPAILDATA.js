const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('REPAILDATA', {
    REPAILDATA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MOTORCYCLE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    REPAILDATA_WISE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    REPAILDATA_SATUS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    REPAILDATA_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'REPAILDATA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "REPAILDATA_ID" },
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
