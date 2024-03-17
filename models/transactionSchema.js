const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Schema to store user details
    
const transactionSchema = new schema({
    BookId:{
        type:schema.Types.ObjectId,
        ref:"books",
    },  
    MemberId:{
        type:schema.Types.ObjectId,
        ref:"members",
    },
    dateOfPurchase:{
        type:Date
    },
    dateOfReturn:{
        type:Date
    },
    returned : {
        type:Boolean,
        default:false
    }
});
module.exports = mongoose.model('transactionSchema',transactionSchema);
