import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle, Polyline} from 'react-gmaps';

const coords = {
lat: 51.5258541,
lng: -0.08040660000006028
};

class TripMap2 extends React.Component {
onMapCreated(map) {
map.setOptions({
disableDefaultUI: true
});
}

render() {
if (this.props.events.length > 0){

var noteworthyEvents = [];

var path = this.props.events.map(function(ev,idx){
	if (ev['event_type'] !== 'TripStart' && ev['event_type'] !== 'TripStop' && ev['event_type'] !== 'LocationUpdate'){
		noteworthyEvents.push(ev);
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
<Gmaps
	width={'650px'}
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
);
}
return (<div></div>);
}
}

export default TripMap2;
