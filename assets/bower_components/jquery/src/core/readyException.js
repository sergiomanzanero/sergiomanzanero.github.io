define( [
	"../core"
], function( jQuery ) {

"use strict";

jQuery.Leer...yException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};

} );
