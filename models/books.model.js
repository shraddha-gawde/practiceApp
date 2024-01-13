const { mongoose } = require("mongoose");
const bookSchema = mongoose.Schema({
    title:{
        type : String,
        require : true
    },
    genre:{
        type : String,
        require : true
    },
    author:{
        type : String,
        require : true
    },
    publishing_year:{
        type : Number,
        require : true
    }
},{
    versionKey: false
})

const bookModel= mongoose.model("book", bookSchema)

module.exports={
    bookModel
}