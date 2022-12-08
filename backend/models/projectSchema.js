const mongoose = require("mongoose");

// here we created Schema object
const Schema = mongoose.Schema;

// Creating a inatance of mongoose that is projectSchema
const projectSchema = new Schema({
  projectId: {
    type: Number,
    required: true,
  },
  projectname: {
    type: String,
    required: true,
  },
  projectdescription: {
    type: String,
    required: true,
  },
  // tickets: {
  //   type: Array,
  //   // required: true,
  // },
  created_by: {
    type: Number,
    // required: true,
  },
  created_date: {
    type: Date,
    // default: Date.now
  },
  updated_date: {
    type: Date,
    required: true,
  },
});

const ticketSchema = new Schema({
  ticketId: {
    type: Number,
    required: true,
  },
  projectId: {
    type: Number,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
  },
  ticketname: {
    type: String,
    required: true,
  },
  ticketdescription: {
    type: String,
    required: true,
  },
  created_by: {
    type: Number,
    // required: true,
  },
  assign_to: {
    type: Number,
    // required: true,
  },
  acceptance_criteria: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
  created_date: {
    type: Date,
    // default: Date.now
  },
  updated_date: {
    type: Date,
    required: true,
  },
});

const UserSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    // default: Date.now
  },
  updated_date: {
    type: Date,
    required: true,
  },
});

const CategorySchema = new Schema({
  // projectId: {
  //   type: Number,
  //   required: true
  // },
  category_id: {
    type: Number,
  },
  category_name: {
    type: String,
  },
  // ticketId: {
  //   type: Number
  // },
  created_date: {
    type: Date,
    // default: Date.now
  },
  updated_date: {
    type: Date,
    required: true,
  },
});

const TagSchema = new Schema({
  projectId: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
  },
  ticketId: {
    type: Number,
  },
  created_date: {
    type: Date,
    // default: Date.now
  },
  updated_date: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);
const Project = mongoose.model("Projects", projectSchema);
const Ticket = mongoose.model("tickets", ticketSchema);
const Category = mongoose.model("categories", CategorySchema);
const Tag = mongoose.model("tags", TagSchema);

module.exports = { Project, User, Ticket, Category, Tag };
