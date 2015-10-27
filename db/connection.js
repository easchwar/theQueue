var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/MY_DB';

var findItems = function(db, callback) {
  var cursor = db.collection('items').find( );
  return cursor;
};

var insertItem = function(db, callback) {
  db.collection('items').insertOne({
    "question": "did it?",
    "body": "work?",
    "author": "eric"
  }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the items collection.");
    callback(result);
  });
};

module.exports = {
  all: function(cb) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      items = findItems(db);
      console.log(items);
      cb(items);
    });
  },

  find: function(id) {
  },

  insert: function(item) {
  },

  remove: function(id) {
  },
};
