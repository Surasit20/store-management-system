var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _Users = require("./Users");
var _books_reviews = require("./books_reviews");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var books_reviews = _books_reviews(sequelize, DataTypes);


  return {
    SequelizeMeta,
    Users,
    books_reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
