var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/MY_DB';

var findItems = function(db, callback) {
   var cursor = db.collection('items').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
         console.log(doc);
      } else {
         callback();
      }
   });
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

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findItems(db, function() {
      db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertItem(db, function() {
    db.close();
  });
});

