// Create data set compatible with VirtualizedSelect
export function labelify(arr){
	var newarr = [];
	arr.sort();
	for (var i = 0; i< arr.length; i++){
		var obj = {};
		obj['label']=arr[i];
		obj['value']=arr[i];
		newarr.push(obj);
	}
	return newarr;
}

// Convert back to list
export function delabelify(arr){
	/*var newarr = [];
	for (var i = 0; i< arr.length; i++){
		newarr.push(arr[i]['value']);
	}*/
	return arr['value'];
}
