const express = require("express")
const { bookModel } = require("../models/books.model")
// const { blacklistModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// const cookieparser = require("cookie-parser")
const { auth } = require("../middlewears/auth.middlewear")
const { access } = require("../middlewears/access.middlewear")

const bookRouter = express.Router()

bookRouter.get("/", auth, access(["reader", "librarian", "admin"]),async(req, res)=>{
    try{
        const book = await bookModel.find(req.query)
        res.status(200).json({books_data:book})
    }
    catch(err){
        res.status(400).json({error:err})
    }
})

bookRouter.post("/add", auth, access(["librarian", "admin"]),async(req, res)=>{
    const payload = req.body
    try{
        const book = new bookModel(payload)
        await book.save()
        res.status(200).json({msg:"Book added", addedBook: payload})
    }
    catch(err){
        res.status(400).json({error:err})
    }
})

bookRouter.patch("/update/:bookid", auth, access(["admin"]),async(req, res)=>{
    const bookid =req.params.bookid
    try{
        await bookModel.findByIdAndUpdate({ _id: bookid }, req.body);
       
        res.status(200).json({msg:"Book has been updated"})
    }
    catch(err){
        res.status(400).json({error:err})
    }
})

bookRouter.delete("/delete/:bookid", auth, access(["admin"]),async(req, res)=>{
    const bookid =req.params.bookid
    try{
        await bookModel.findByIdAndDelete({ _id: bookid });
        
        res.status(200).json({msg:"Book has been deleted"})
    }
    catch(err){
        res.status(400).json({error:err})
    }
})

module.exports={
    bookRouter
}