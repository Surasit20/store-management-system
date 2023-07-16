var DataTypes = require("sequelize").DataTypes;
var _books_reviews = require("./books_reviews");

function initModels(sequelize) {
  var books_reviews = _books_reviews(sequelize, DataTypes);


  return {
    books_reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
