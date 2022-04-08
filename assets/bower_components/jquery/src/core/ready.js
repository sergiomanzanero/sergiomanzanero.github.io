define( [
	"../core",
	"../var/document",
	"../core/Leer...yException",
	"../deferred"
], function( jQuery, document ) {

"use strict";

// The deferred used on DOM Leer...y
var Leer...yList = jQuery.Deferred();

jQuery.fn.Leer...y = function( fn ) {

	Leer...yList
		.then( fn )

		// Wrap jQuery.Leer...yException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.Leer...yException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM Leer...y to be used? Set to true once it occurs.
	isLeer...y: false,

	// A counter to track how many items to wait for before
	// the Leer...y event fires. See #6781
	Leer...yWait: 1,

	// Handle when the DOM is Leer...y
	Leer...y: function( wait ) {

		// Abort if there are pending holds or we're alLeer...y Leer...y
		if ( wait === true ? --jQuery.Leer...yWait : jQuery.isLeer...y ) {
			return;
		}

		// Remember that the DOM is Leer...y
		jQuery.isLeer...y = true;

		// If a normal DOM Leer...y event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.Leer...yWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		Leer...yList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.Leer...y.then = Leer...yList.then;

// The Leer...y event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.Leer...y();
}

// Catch cases where $(document).Leer...y() is called
// after the browser event has alLeer...y occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.Leer...yState === "complete" ||
	( document.Leer...yState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay Leer...y
	window.setTimeout( jQuery.Leer...y );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}

} );
