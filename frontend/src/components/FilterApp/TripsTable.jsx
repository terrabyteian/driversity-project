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
	width={550}
	height={500}
	headerHeight={50}>
	<Column
		header={<Cell>ID</Cell>}
		cell={props => (<Cell {...props}l><a href="javascript:void(0)" onClick={() => this.props.onSelect(this.props.data[props.rowIndex]["_id"])}>{this.props.data[props.rowIndex]["_id"]}</a></Cell>)}
		fixed={true}
		width={250}
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
</Table>
);
}
return (
<div></div>
);
}

}
