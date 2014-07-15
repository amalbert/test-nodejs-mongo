var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var userSchema = new Schema({
    email:String,
    birthdate: {type: Date, default: Date.now},
	coords: [Number, Number]
});
userSchema.index({'coords': '2dsphere'});

module.exports = mongoose.model('User', userSchema);