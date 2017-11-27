var model = require('./models.js');

var exports = module.exports = {};
exports.getDriver = function() {
	return model.createNeo4jModel();
}

