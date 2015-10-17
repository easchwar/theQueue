var React = require('react');
var socket = io();

module.exports = React.createClass({
  removeItem: function() {
    this.props.removeItem(this.props.item.id);
  },

  render: function() {
    return(
      <li className="item" style={{listStyle: 'none', background: this.props.color}} >
        <span>
          {this.props.item.message} 
        </span> 
        <button 
          style={{float: 'right'}} 
          onClick={this.removeItem}> 
            Complete! 
        </button>
      </li>
    );
  }
});
