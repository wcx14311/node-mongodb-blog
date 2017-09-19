/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
	name:{type:String,unique:true},
	password:String,
	photo:{type:String,default:"/images/user/avatar2.png"},
	createdate:{type:Date,default:Date.now}
});

module.exports = mongoose.model('admin',userSchema);