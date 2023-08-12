var DataTypes = require("sequelize").DataTypes;
var _INSTALLMENTS = require("./INSTALLMENTS");
var _MONTH_INSTALLMENTS = require("./MONTH_INSTALLMENTS");
var _MOTORCYCLE = require("./MOTORCYCLE");
var _REPAILDATA = require("./REPAILDATA");
var _SUMMARY_DAILT_INSTALLMENTS = require("./SUMMARY_DAILT_INSTALLMENTS");
var _USER = require("./USER");

function initModels(sequelize) {
  var INSTALLMENTS = _INSTALLMENTS(sequelize, DataTypes);
  var MONTH_INSTALLMENTS = _MONTH_INSTALLMENTS(sequelize, DataTypes);
  var MOTORCYCLE = _MOTORCYCLE(sequelize, DataTypes);
  var REPAILDATA = _REPAILDATA(sequelize, DataTypes);
  var SUMMARY_DAILT_INSTALLMENTS = _SUMMARY_DAILT_INSTALLMENTS(sequelize, DataTypes);
  var USER = _USER(sequelize, DataTypes);


  return {
    INSTALLMENTS,
    MONTH_INSTALLMENTS,
    MOTORCYCLE,
    REPAILDATA,
    SUMMARY_DAILT_INSTALLMENTS,
    USER,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
