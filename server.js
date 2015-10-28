var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/MY_DB';

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/nice', function(req, res) {
  res.json({'nice': 'so great'});
});

app.get('/queue', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('items').find();
    var result = []; 
    cursor.each(function(err, doc) {
      console.log(arguments);
      if (doc !== null) {
        result.push(doc);
      } else {
        // all done, set the response and close the connection
        res.json(result);
        db.close();
      }
    });
  });
});

app.post('/queue', function(req, res) {
  var data = {
    'message': req.body.message,
    'id': req.body.id,
    'author': 'anon' 
  };
  MongoClient.connect(url, function(err, db) {
    db.collection('items').insertOne(data, function(err, result) {
      assert.equal(null, err);
      console.log('inserted doc');
      res.json(data);
      db.close();
    });
  });
});

app.post('/complete', function(req, res) {
  var id = req.body.id;
  MongoClient.connect(url, function(err, db) {
    db.collection('items').deleteOne({id: id}, function(err, results) {
      res.json({id: id});
      db.close();
    });
  });
});

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('add item', function(msg){
    socket.broadcast.emit('add item', msg);
  });

  socket.on('remove item', function(msg) {
    socket.broadcast.emit('remove item', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});
