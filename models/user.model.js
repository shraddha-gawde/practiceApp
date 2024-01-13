
const { mongoose } = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    password:{
        type : String,
        require : true,
        unique : true
    },
    role:{
        type : String,
        enum :["reader", "librarian", "admin"],
        default : "reader"
    }
},{
    versionKey: false
})

const userModel= mongoose.model("user", userSchema)

module.exports={
    userModel
}