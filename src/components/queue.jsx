var React = require('react');
var Item = require('./item.jsx');
var socket = io();

module.exports = React.createClass({
  getInitialState: function() {
    return { list: [], formInput: "" };
  },

  componentDidMount: function() {
    socket.on('add item', function(item) {
      this.addItem(item);
    }.bind(this));

    socket.on('remove item', function(id) {
      this.removeItem(id);
    }.bind(this));
  },

  handleInput: function(e) {
    this.setState({formInput: e.currentTarget.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.formInput === "") { return; }

    var item = {
      id: (new Date()).getTime(),
      message: this.state.formInput 
    };

    socket.emit('add item', item); 
    this.addItem(item);
    this.setState({ formInput: "" });
  },

  addItem: function(item) {
    console.log(item);
    this.state.list.push(item);
    this.setState({list: this.state.list});
  },

  removeItem: function(id) {
    console.log(id);
    var list = this.state.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        this.state.list.splice(i, 1);
        socket.emit('remove item', id);
        this.setState({list: this.state.list});
        break; 
      }
    }
  },

  render: function() {
    return(
      <div>
        <h1> The Queue </h1>
        <div className="queue">
          <ul>
            {
              this.state.list.map(function(item,id) {
                return( <Item key={item.id} color={id % 2 === 0 ? 'cornflowerblue' : 'aliceblue'} removeItem={this.removeItem} item={item} />)
              }.bind(this))
            }
          </ul>
          <br/>
          <h3> Ask your question! </h3>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleInput} value={this.state.formInput} /> 
          </form>
        </div>
      </div>
      );
  }
});
