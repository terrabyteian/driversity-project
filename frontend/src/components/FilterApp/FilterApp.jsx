import React from 'react';
import $ from 'jquery';
import VirtualizedSelect from 'react-virtualized-select'


class FilterApp extends React.Component {
  constructor() {
    super();
  }
  
  state = {
    clients:[]
  };

  getClients(){
    $.ajax({
      url: this.props.get_clients_api,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({clients:data});
      }.bind(this),
      error: function(xhr,status,err){
        console.error(this.props.get_clients_api,status,err.toString());
      }.bind(this)
    });
  }

  componentDidMount(){
    ::this.getClients();
  }

  render() {
    return (
      <div>
        Foobar
      </div>
    )
  }

}

FilterApp.defaultProps = {
	get_clients_api:"http://0.0.0.0:5000/clients"
}

export default FilterApp;
