const bookSchema = require("../models/books")
const memberSchema = require("../models/members")
const transactionSchema = require("../models/transactionSchema")

exports.addBook = async (req, res) => {
    try {
        const { BookName, BookID, NumberOfCopies } = req.body;
        const book = await bookSchema.find({ BookID })
        if (book.length) {
            return res.status(409).send("Book with ID already exists")
        }
        const bookData = new bookSchema({ BookName, BookID, NumberOfCopies })
        await bookData.save()
        res.status(201).save("Book added successfully !!")
    } catch (err) {
        console.log(err);
        res.status(400).send("Error in Saving Book Data" + err);
    }
}

exports.getAllBooks = async(req,res) =>{
    try{
        const {startIndex, count} = req.query
        const books = await bookSchema.find().skip(startIndex || 0).limit(count|| 20) 
        return res.status(200).send(books) // for pagination
    } catch (err) {
        console.log(err);
        res.status(400).send("Error in Saving Book Data" + err);
    }
}

exports.assignBook = async (req, res) => {
    try {
        const { BookId, MemberId, returnAfter } = req.body;
        const book = await bookSchema.findById(BookId)
        const member = await memberSchema.findById(MemberId)

        if (!book) {
            return res.status(404).send("Book not found")
        }
        if (book?.NumberOfCopies == 0) {
            return res.status(400).send("Book out of stock")
        }
        if (!member) {
            return res.status(404).send("Member does not exists")
        }

        let d1 = new Date()
        let d2 = new Date()
        d2.setDate(d2.getDate() + returnAfter)
        const transaction = new transactionSchema({ BookId, MemberId, dateOfPurchase: d1, dateOfReturn: d2 })
        book.NumberOfCopies -= 1;
        await book.save()
        await transaction.save()
        res.status(200).send("Transaction Successful");
    }catch(e){
        console.log(e);
        res.status(400).send("Failed to checkout")
    }
}

exports.getBooksOfMembers = async(req,res) =>{
    try{
        const {MemberId}=req.params
        const transactions = await transactionSchema.find({MemberId,returned:false}).populate("BookId")
        let totalFine = 0;
        const books = transactions.map(transaction=>{
            const book = {...transaction.BookId._doc};
            if(new Date() > new Date(transaction.dateOfReturn)){
                const overdue = Math.floor(Math.abs(new Date() - new Date(transaction.dateOfReturn)) / (1000 * 3600 * 24) )
                book.overdue = overdue
                totalFine += (overdue * 50)
            }
            return book
        })
        res.status(200).send({totalFine,books})
    }catch(e){
        console.log(e);
        res.status(400).send("Failed to fetch books")
    }
}

exports.returnBook = async (req, res) => {
    try {
        const { BookId, MemberId} = req.body;
        const transaction = await transactionSchema.findOne({BookId, MemberId});

        if (!transaction) {
            return res.status(404).send("Book never taken")
        }
        if (transaction.returned == true) {
            return res.status(400).send("Book already returned")
        }
        
        const book = await  bookSchema.findById(BookId);
        book.NumberOfCopies += 1
        await book.save()

        transaction.returned = true;
        await transaction.save();

        res.status(200).send("returned Successfully !!");
    }catch(e){
        console.log(e);
        res.status(400).send("Failed to checkout")
    }
}