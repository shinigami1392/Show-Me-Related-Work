var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
/*
var papersSchema = new Schema({
	paperId : {type: String, required: true, max:100},
	title : {type: String, required: true, max:500},
	author : [String],
	doi: {type: String, required: true, max:50},
	stream: {type: String, required: true, max:50},
	abstract: {type: String, required: false, max:1000},
	reference: {type: Object},
	link : {type:String, required:true},
	publicationYear : {type: String, required: true}
});
*/

var papersSchema = new Schema({
	id:{type: String, required: true, max:100},
	doi: {type: String, required: true, max:50},
	domainId : {type: String, required:true},
	title : {type: String, required: true, max:500},
	publicationTitle : {type: String, required: false, max:500},
	authors : [String],
	stream: {type: String, required: true, max:50},
	abstract: {type: String, required: false, max:1000},
	reference: {type: Object},
	link : {type:String, required:true},
	publicationYear : {type: String, required: true}
});


papersSchema.virtual('name').get(function(){
	return this.title;
});

// papersSchema.virtual('url').get(function(){
// 	return '/catalog/paper/' + this._id;
// });

module.exports = mongoose.model('PaperModel', papersSchema);