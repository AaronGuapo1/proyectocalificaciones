const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');


const ROLE={
    ADMIN: 'admin',
    BASIC: 'basic',
    MAESTRO: 'maestro'
}


module.exports =ROLE;