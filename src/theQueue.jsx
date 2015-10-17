require('./css/app.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Queue = require('./components/queue.jsx');

$(function() {
  ReactDOM.render(<Queue />, document.querySelector('#content'));
});
