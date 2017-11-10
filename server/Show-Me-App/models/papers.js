var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var papersSchema = new Schema({
	id : {type: String, required: true, max:100},
	title : {type: String, required: true, max:100},
	authors : [String],
	date : {type: Date, required: true}
});

papersSchema.virtual('name').get(function(){
	return this.title;
});

papersSchema.virtual('url').get(function(){
	return '/catalog/paper/' + this.id;
});

module.exports = mongoose.model('PaperModel', papersSchema);