var reqwest = require('reqwest');

module.exports = {
  fetch: function(cb) {
    reqwest({
      url: '/queue',
      method: 'get',
      success: function(resp) {
        cb(resp);
      },
      error: function(resp) {
        console.log(resp);
      }
    });
  },

  addItem: function(msg, cb) {
    reqwest({
      url: '/queue',
      method: 'post',
      data: msg,
      success: function(resp) {
        cb(resp);
      }.bind(this),
      error: function(resp) {
        console.log(resp);
      }
    });
  },

  completeItem: function(id, cb) {
    reqwest({
      url: '/complete',
      method: 'post',
      data: {id: id},
      success: function(resp) {
        cb(resp);
      },
      error: function(resp) {
        console.log(resp);
      }
    });
  }
};
