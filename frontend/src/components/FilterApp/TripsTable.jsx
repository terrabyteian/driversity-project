import React from 'react';
import {Table,Column,Cell,TextCell} from 'fixed-data-table';

export default class TripsTable extends React.Component {
constructor(props) {
super(props);
}

render() {
if (this.props.data.length > 0){
var data = this.props.data;
return (
<Table
	rowHeight={50}
	rowsCount={this.props.data.length}
	width={1200}
	height={500}
	headerHeight={50}>
	<Column
		header={<Cell>ID</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["_id"]}</Cell>)}
		fixed={true}
		width={400}
	/>
	<Column
		header={<Cell>Score</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["score"]}</Cell>)}
		fixed={true}
		width={100}
	/>
	<Column
		header={<Cell>Duration (mins)</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["duration"]}</Cell>)}
		fixed={true}
		width={100}
	/>
	<Column
		header={<Cell>Distance (meters)</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["distance"]}</Cell>)}
		fixed={true}
		width={100}
	/>
	<Column
		header={<Cell>Start Time (Local)</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["start_time_local"]}</Cell>)}
		fixed={true}
		width={100}
	/>
	<Column
		header={<Cell>End Time (Local)</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["end_time_local"]}</Cell>)}
		fixed={true}
		width={100}
	/>
	<Column
		header={<Cell>Start Time</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["start_time"]}</Cell>)}
		fixed={true}
		width={150}
	/>
	<Column
		header={<Cell>End Time</Cell>}
		cell={props => (<Cell {...props}l>{this.props.data[props.rowIndex]["end_time"]}</Cell>)}
		fixed={true}
		width={150}
	/>
</Table>
);
}
return (
<div></div>
);
}

}
