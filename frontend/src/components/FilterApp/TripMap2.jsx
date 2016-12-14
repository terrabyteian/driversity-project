import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {Gmaps, Marker, InfoWindow, Circle, Polyline} from 'react-gmaps';

class TripMap2 extends React.Component {
onMapCreated(map) {
map.setOptions({
disableDefaultUI: true
});
}

render() {
if (this.props.events.length > 0){

var noteworthyEvents = [];
var speedingCount = 0;
var accCount = 0;
var phoneCount = 0;
var brakeCount = 0;

var path = this.props.events.map(function(ev,idx){
	if (ev['event_type'] !== 'TripStart' && ev['event_type'] !== 'TripStop' && ev['event_type'] !== 'LocationUpdate'){
		noteworthyEvents.push(ev);
		if (ev['event_type'] === 'SpeedThresholdExceeded'){
			speedingCount +=1;
		}
		if (ev['event_type'] === 'RapidAcceleration'){
			accCount +=1;
		}
		if (ev['event_type'] === 'HardBraking'){
			brakeCount +=1;
		}
		if (ev['event_type'] === 'DriverDeviceHandling' || ev['event_type'] === 'GeneralPhoneHandling'){
			phoneCount +=1;
		}
	}
	return {lat: parseFloat(ev['geo_lat']), lng: parseFloat(ev['geo_long'])};
});

var speedMessages = noteworthyEvents.map(function(ev,idx){
return (
<InfoWindow 
	key={idx}
	lat={ev['geo_lat']}
	lng={ev['geo_long']}
	content={ev['event_type']}
/>
);
})

var midIndex = Math.floor(this.props.events.length / 2);

return (
<Row>
	<Col sm={5} md={5} className="pull-center">
		<Gmaps
			width={'600px'}
			height={'500px'}
			lat={this.props.events[midIndex]['geo_lat']}
			lng={this.props.events[midIndex]['geo_long']}
			zoom={12}
			loadingMessage={'Loading map...'}
			params={{v: '3.exp', key: 'AIzaSyDcx3ptW3iGNmo-Yv8jHnVun1KjQAUqlCA'}}
			onMapCreated={this.onMapCreated}>
			<Polyline
				path={path} />
			<InfoWindow 
				lat={this.props.events[0]['geo_lat']}
				lng={this.props.events[0]['geo_long']}
				content={'Trip Start'}
			/>
			<InfoWindow 
				lat={this.props.events.slice(-1)[0]['geo_lat']}
				lng={this.props.events.slice(-1)[0]['geo_long']}
				content={'Trip End'}
			/>
			{speedMessages}
		</Gmaps>
	</Col>
	<Col sm={2} md={2} className="pull-right">
		<h5>Speeding Count: {speedingCount}</h5>
		<h5>Rapid Accel. Count: {accCount}</h5>
		<h5>Hard Brake Count: {brakeCount}</h5>
		<h5>Phone Use Count: {phoneCount}</h5>
	</Col>
</Row>
);
}
return (<div></div>);
}
}

export default TripMap2;
