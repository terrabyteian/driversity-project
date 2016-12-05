import React from 'react';
import $ from 'jquery';
import VirtualizedSelect from 'react-virtualized-select'
import {labelify} from '../js/helpers'


class FilterApp extends React.Component {
  constructor() {
    super();
  }
  
  state = {
    clients:[],
    selectedClients:[],
  };

  getClients(){
    $.ajax({
      url: this.props.get_clients_api,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({clients:labelify(data)});
      }.bind(this),
      error: function(xhr,status,err){
        console.error(this.props.get_clients_api,status,err.toString());
      }.bind(this)
    });
  }

  componentDidMount(){
    ::this.getClients();
  }

  handleClientChange(values){
    this.setState({selectedClients:values});
  }

  render() {
    return (
      <div>
	      <VirtualizedSelect multi={true} value={this.state.selectedClients} options={this.state.clients} simpleValue={false} onChange={::this.handleClientChange} />
      </div>
    )
  }

}

FilterApp.defaultProps = {
	get_clients_api:"http://0.0.0.0:5000/clients"
}

export default FilterApp;
