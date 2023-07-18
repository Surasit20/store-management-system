var DataTypes = require("sequelize").DataTypes;
var _INSTALLMENTS = require("./INSTALLMENTS");
var _MOTORCYCLE_ID = require("./MOTORCYCLE_ID");
var _REPAILDATA = require("./REPAILDATA");
var _SUMMARY_DAILT_INSTALLMENTS = require("./SUMMARY_DAILT_INSTALLMENTS");
var _USER = require("./USER");

function initModels(sequelize) {
  var INSTALLMENTS = _INSTALLMENTS(sequelize, DataTypes);
  var MOTORCYCLE_ID = _MOTORCYCLE_ID(sequelize, DataTypes);
  var REPAILDATA = _REPAILDATA(sequelize, DataTypes);
  var SUMMARY_DAILT_INSTALLMENTS = _SUMMARY_DAILT_INSTALLMENTS(sequelize, DataTypes);
  var USER = _USER(sequelize, DataTypes);


  return {
    INSTALLMENTS,
    MOTORCYCLE_ID,
    REPAILDATA,
    SUMMARY_DAILT_INSTALLMENTS,
    USER,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
