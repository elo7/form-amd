/*eslint no-unused-vars: ["error", { "vars": "local" }]*/

//http://stackoverflow.com/a/14853974
window.arrayEquals = function(a, b) {
	'use strict';

	// if the other array is a falsy value, return
	if (!b)
		return false;

	// compare lengths - can save a lot of time
	if (a.length != b.length)
		return false;

	for (var i = 0, l=a.length; i < l; i++) {
		// Check if we have nested arrays
		if (a[i] instanceof Array && b[i] instanceof Array) {
			// recurse into the nested arrays
			if (!a[i].equals(b[i]))
				return false;
		}
		else if (a[i] != b[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}

	return true;
};
