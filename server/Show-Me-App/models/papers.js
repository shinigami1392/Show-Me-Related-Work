var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var papersSchema = new Schema({
	paperId : {type: String, required: true, max:100},
	title : {type: String, required: true, max:100},
	author : [String],
	url : {type:String, required:true},
	date : {type: Date, required: true}
});

papersSchema.virtual('name').get(function(){
	return this.title;
});

// papersSchema.virtual('url').get(function(){
// 	return '/catalog/paper/' + this._id;
// });

module.exports = mongoose.model('PaperModel', papersSchema);