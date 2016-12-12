var mongoose = require('mongoose')

// schema
var postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  createdAt : { type: Date, default: Date.now},
  updatedAt : { type: Date }
});

function date2String(date) {
  var options = {
    year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  };
  return date.toLocaleDateString(options);
}

postSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

postSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};


// model & export
module.exports = mongoose.model('post', postSchema);
