/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var articleSchema = new Schema({
	name:String,
	content:String,
	user:String,
	createdate:{type:Date,default:Date.now}
});

module.exports = mongoose.model('article',articleSchema);