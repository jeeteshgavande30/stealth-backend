const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Schema to store user details
    
const members = new schema({
    MemberName:{
        type:String,
        default:''
    },  
    MemberID: {
        type: Number,
    }
    // person2:{
    //     type:schema.Types.ObjectId,
    //     ref:"dummy",
    // },
});
module.exports = mongoose.model('members',members);
