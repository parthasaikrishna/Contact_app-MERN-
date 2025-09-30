const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// it gets single contact
//it uses GET API call
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
     res.json({contact});
    res.send({"message":` contact of ${req.params.id}`});
   
});

// it gets all contacts
//it uses GET API call
//@private access
const getContacts = asyncHandler(async (req,res)=>{
    let contacts = await Contact.find({userId: req.user.id});
    res.json(contacts);
})

// it creates new contact
//it uses POST API call
//@private access
const createContact = asyncHandler(async (req,res)=>{
    const {email,name,contact} = req.body;
    if(!name || !email || !contact){
       // Correct way to throw an error
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const create = await Contact.create({
        name,
        email,
        contact,
     userId: req.user.id
    })
    // res.json({"message":"create contact"});
    res.send(create);
})

// it updates existing contact using :id
//it uses PUT API call
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
          res.status(404);
        throw new Error("contact not found")
    }

    if(contact.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("you don't have a permit to change other contact details")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json({"message":`updated contact ${updatedContact}`});
})

// it deletes single contact using :id
//it uses GET API call
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
          res.status(404);
        throw new Error("contact not found")
    }
     if(contact.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("you don't have a permit to delete other contact details")
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({"message":`Deleted contact ${contact}`});
});

module.exports = {getContact,getContacts,createContact,updateContact,deleteContact}