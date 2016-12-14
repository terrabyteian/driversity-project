import React from 'react';
import $ from 'jquery';
import VirtualizedSelect from 'react-virtualized-select'
import {labelify,delabelify} from '../js/helpers'
import {Col} from 'react-bootstrap'
import TripsTable from './TripsTable'
import TripMap from './TripMap'
import TripMap2 from './TripMap2'
import ip from 'ip'

class FilterApp extends React.Component {
  constructor() {
    super();
  }
  
  state = {
    clients:[],
    selectedClient:{},
    users:[],
    selectedUser:{},
    trips: [],
    selectedTrip:'',
    events: [],
    average:0
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

  getUsers(){
    $.ajax({
      url: this.props.get_users_api + '/' + delabelify(this.state.selectedClient),
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({users:labelify(data)});
      }.bind(this),
      error: function(xhr,status,err){
        console.error(this.props.get_users_api,status,err.toString());
      }.bind(this)
    });
  }

  getTrips(){
    $.ajax({
      url: this.props.get_trips_api + '/' + delabelify(this.state.selectedUser),
      dataType: 'json',
      cache: false,
      success: function(data){
	var score = 0;
           for (let i=0; i<data.length; i++){
	    if (data[i]['score'] !== ""){
               score+=parseFloat(data[i]['score']);
            }
	}
	this.setState({trips:data,average:(score/data.length).toFixed(2)});
      }.bind(this),
      error: function(xhr,status,err){
        console.error(this.props.get_trips_api,status,err.toString());
      }.bind(this)
    });
  }

  getEvents(){
    $.ajax({
      url: this.props.get_events_api + '/' + this.state.selectedTrip,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({events:data});
      }.bind(this),
      error: function(xhr,status,err){
        console.error(this.props.get_trips_api,status,err.toString());
      }.bind(this)
    });
  }

  componentDidMount(){
    ::this.getClients();
  }

  handleClientChange(selectValue){
    this.setState({selectedClient:selectValue,selectedUser:{}},this.getUsers);
  }

  handleUserChange(value){
    this.setState({selectedUser:value,events:[]},this.getTrips);
  }

  handleTripChange(value,idx){
    this.setState({selectedTrip:value,selectedTripObj:this.state.trips[idx]},this.getEvents);
  }

  render() {
   return (
      <div>
	      <Col sm={6} md={6}>
		      <h3>Client</h3>
		      <VirtualizedSelect multi={false} value={this.state.selectedClient} options={this.state.clients} simpleValue={false} onChange={::this.handleClientChange} />
	      </Col>
	      <Col sm={6} md={6}>
		      <h3>User</h3>
		      <VirtualizedSelect multi={false} value={this.state.selectedUser} options={this.state.users} simpleValue={false} onChange={::this.handleUserChange} />
	      </Col>
	      <Col sm={12} md={12}><br/><hr/><br/>
		      <h3>Average Score: {this.state.average}</h3>
	      </Col>
	      <Col sm={4} md={4}>
	      	      <TripsTable onSelect={::this.handleTripChange} data={this.state.trips}/>
	      </Col>
	      <Col sm={7} md={7}>
		      <TripMap2 events={this.state.events} trip={this.state.selectedTripObj}/>
	      </Col>
      </div>
  )
  }

}

FilterApp.defaultProps = {
	get_clients_api:"http://"+ip.address()+":5000/clients",
	get_users_api:"http://"+ip.address()+":5000/users",
	get_trips_api:"http://"+ip.address()+":5000/trips",
	get_events_api:"http://"+ip.address()+":5000/events",
}

export default FilterApp;
