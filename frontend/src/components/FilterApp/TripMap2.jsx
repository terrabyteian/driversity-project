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

onDragEnd(e) {
console.log('onDragEnd', e);
}

onCloseClick() {
console.log('onCloseClick');
}

onClick(e) {
console.log('onClick', e);
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

console.log(this.props.events.length)

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
/*return (
<Gmaps
width={'800px'}
height={'600px'}
lat={coords.lat}
lng={coords.lng}
zoom={12}
loadingMessage={'Be happy'}
params={{v: '3.exp', key: 'AIzaSyDcx3ptW3iGNmo-Yv8jHnVun1KjQAUqlCA'}}
onMapCreated={this.onMapCreated}>
<Marker
lat={coords.lat}
lng={coords.lng}
draggable={true}
onDragEnd={this.onDragEnd} />
<InfoWindow
lat={coords.lat}
lng={coords.lng}
content={'Hello, React :)'}
onCloseClick={this.onCloseClick} />
<Circle
lat={coords.lat}
lng={coords.lng}
radius={500}
onClick={this.onClick} />
</Gmaps>
);*/
}
return (<div></div>);
}
}

export default TripMap2;
