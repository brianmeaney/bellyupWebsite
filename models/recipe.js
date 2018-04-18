var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var recipeSchema = new Schema({
	ingredients: {type: String},
	url : {type: String}
});

module.exports = mongoose.model('Recipe', recipeSchema);