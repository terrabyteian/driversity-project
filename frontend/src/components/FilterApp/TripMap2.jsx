import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

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
var markers = this.props.events.map(function(ev,idx){
	return (
		<Marker
			key={idx}
			lat={ev['geo_lat']}
			lng={ev['geo_long']}
			draggable={false} />
	);
});
var midIndex = Math.floor(this.props.events.length / 2);
return (
<Gmaps
	width={'1050px'}
	height={'600px'}
	lat={this.props.events[midIndex]['geo_lat']}
	lng={this.props.events[midIndex]['geo_long']}
	zoom={12}
	loadingMessage={'Loading map...'}
	params={{v: '3.exp', key: 'AIzaSyDcx3ptW3iGNmo-Yv8jHnVun1KjQAUqlCA'}}
	onMapCreated={this.onMapCreated}>
	{ markers }
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
