var model = require('model.js');

function getDriver() {
	return model.createNeo4jModel();
}