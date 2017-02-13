var mongoose = require('mongoose')

// schema
var blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  body: String,
  },
 { timestamps: true } // createdAt, updatedAt
);


// model & export
module.exports = mongoose.model('blog', blogSchema);
