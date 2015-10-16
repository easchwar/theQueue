var React = require('react');
var socket = io();

module.exports = React.createClass({
  removeItem: function() {
    this.props.removeItem(this.props.item.id);
  },

  render: function() {
    return(
      <li onClick={this.removeItem}> {this.props.item.message} </li>
    );
  }
});
