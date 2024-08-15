const { query } = require("express");
const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  console.log("Userid", req.user.id);
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log(contacts);
  if (!contacts) {
    res.status(400);
    throw new Error("Error while fetching data from db");
  }
  res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No data was found");
  }
  if (contact.user_id != req.user.id) {  
    res.status(401);
    throw new Error("Unauthorized request");
  }
  res.status(200).json(contact);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const crateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  if (!contact) {
    res.status(400);
    throw new Error("Failed to create new Contact");
  }
  console.log("Successfully created new contact");
  res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No data was found");
  }
  if (contact.user_id != req.user.id) {  
    res.status(401);
    throw new Error("Unauthorized request");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: query }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No data was found to delete");
  }
  if (contact.user_id != req.user.id) {  
    res.status(401);
    throw new Error("Unauthorized request");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  getContact,
  crateContact,
  updateContact,
  deleteContact,
};
