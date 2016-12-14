var mongoose = require('mongoose')

// schema
var blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  body: String,
  },
 { timestamps: true } // createdAt, updatedAt
);

// function date2String(date) {
//   var options = {
//     year: 'numeric', month: 'short',
//     day: 'numeric', hour: '2-digit', minute: '2-digit'
//   };
//   return date.toLocaleDateString(options);
// }
//
// blogSchema.methods.getCreatedAt = function() {
//   return date2String(this.createdAt);
// };
//
// blogSchema.methods.getUpdatedAt = function() {
//   return date2String(this.updatedAt);
// };

// model & export
module.exports = mongoose.model('blog', blogSchema);
