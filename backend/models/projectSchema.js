const mongoose = require("mongoose");

// Creating a inatance of mongoose that is projectSchema
const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true, // Here required means its a mandotory field
  },
  projectname: {
    type: String,
    required: true, // Here required means its a mandotory field
  },
  projectdescription: {
    type: String,
    required: true, // Here required means its a mandotory field
  },
  tickets: {
    type: Array,
    // required: true, // Here required means its a mandotory field
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;