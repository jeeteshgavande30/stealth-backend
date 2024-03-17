const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Schema to store user details
    
const books = new schema({
    BookName:{
        type:String,
        default:''
    },  
    BookID: {
        type: Number,
    },
    NumberOfCopies:{
        type:Number,
    } 
    // person2:{
    //     type:schema.Types.ObjectId,
    //     ref:"dummy",
    // },
});
module.exports = mongoose.model('books',books);
