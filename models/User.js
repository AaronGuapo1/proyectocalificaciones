const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
username: {type:String,required:[true,'Por favor inserta un usuario'],unique:true},
password: {type:String,required: [true,'Por favor inserta una contraseña']},
role:{type:String,required:true}
});


UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
        })
        })


// export model
const User = mongoose.model('User',UserSchema);
module.exports =User