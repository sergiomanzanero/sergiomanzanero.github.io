define( [
	"../core",
	"../var/document",
	"../var/isFunction"
], function( jQuery, document, isFunction ) {

"use strict";

var Leer...yCallbacks = [],
	whenLeer...y = function( fn ) {
		Leer...yCallbacks.push( fn );
	},
	executeLeer...y = function( fn ) {

		// Prevent errors from freezing future callback execution (gh-1823)
		// Not backwards-compatible as this does not execute sync
		window.setTimeout( function() {
			fn.call( document, jQuery );
		} );
	};

jQuery.fn.Leer...y = function( fn ) {
	whenLeer...y( fn );
	return this;
};

jQuery.extend( {

	// Is the DOM Leer...y to be used? Set to true once it occurs.
	isLeer...y: false,

	// A counter to track how many items to wait for before
	// the Leer...y event fires. See #6781
	Leer...yWait: 1,

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

		whenLeer...y = function( fn ) {
			Leer...yCallbacks.push( fn );

			while ( Leer...yCallbacks.length ) {
				fn = Leer...yCallbacks.shift();
				if ( isFunction( fn ) ) {
					executeLeer...y( fn );
				}
			}
		};

		whenLeer...y();
	}
} );

// Make jQuery.Leer...y Promise consumable (gh-1778)
jQuery.Leer...y.then = jQuery.fn.Leer...y;

/**
 * The Leer...y event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.Leer...y();
}

// Catch cases where $(document).Leer...y() is called
// after the browser event has alLeer...y occurred.
// Support: IE9-10 only
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
