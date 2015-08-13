$(document).ready(function() {

	console.log('loaded');

	// Load the data and assign to imageData var

	var imageData = getJSON( 'data/dataCollections.json' );

	// Get collection name from the data-collection attribute on the #image-list tag

	var collectionName = $( '#image-list' ).attr( 'data-collection' );

	// If there is not data-collection attribute or it's blank, display an error and bail out.

	if( ! collectionName ) {
		console.error( 'Unable to get collectionName from the data-collection attribute on tag with ID #image-list.' );

		return;
	}

	//console.log( Object.keys( imageData ) );

	// If data-collection attribute doesn't match one of the collection names in the data file, display an error and bail out.

	if( ! (collectionName in imageData) ) {

		console.error( 'The collection name given in the data-collection attribute didn\'t match any collections in the data set. Please check that the attribute and colleciton name are identical.' );

		return;

	}

	//console.log( 'collectionName ', collectionName );

	// Create new collection based on collectionName attribute - must be exact match

	var collection = new imageCollection( imageData, collectionName );



	//console.log ( 'collection ', collection );

	for( var i = 0; i < collection.items.length; i++) {

		imageList( collection.items[i] );

	}

	// Load placeholder image (first in collection)

	$( '#feature-image' ).html( placeholderImage( collection ) );

	
});

// Get JSON

var getJSON = function( url ) {

	var json = new XMLHttpRequest();

	json.open( 'GET', url, false );

	json.send( null );

	var data = JSON.parse( json.responseText );

	return data;
}


// MY MODELS AND COLLECTIONS

// Model
function imageModel( image ) {

	this.title = image.title;
	this.path = image.path;
	this.description = image.description;
	this.set = image.set;

}

// Collection
function imageCollection( images, collection ) {

	var self = this;
	this.items = [];
	
	$.each( images[collection], function( index, key ) {

		self.items.push( new imageModel( key ) );

	} );

}

function placeholderImage( images ) {

	var imgSrc = images.items[0].path;
	var imgTitle = images.items[0].title;

	return '<img src="' + imgSrc + '" alt="' + imgTitle + '">';

}


// Build Image List
function imageList( image ) {

	// <li><a href="#"><img src="{image.path}" alt="{image.title}"></a></li>

	// image.title;
	// image.path;
	// image.description;
	// image.set;

	var imageTag = $( '<img>' ).attr({
		src: image.path,
		alt: image.title
	});

	//console.log( 'imageTag: ', imageTag );

	var imageLink = $( '<a>' ).attr( 'href', '' );
	imageLink.append( imageTag );

	//console.log( 'imageLink: ', imageLink );

	$( imageLink ).on( 'click', function( event ) {

		event.preventDefault();

		$( '#feature-image img' ).remove();

		// Tried using imageTag variable
		// The image was loaded in the right place, but the image was being removed from the list item
		// Creating a string object like this works, though it seems kinda dirty
		var featureImage = '<img src="' + image.path + '" alt="' + image.title + '">';

		$( '#feature-image' ).html( featureImage );

		// Need to write out the description too

		//console.log( imageTag );

	} );

	var listItem = $( '<li>' );
	listItem.append( imageLink );

	$( '#image-list' ).append( listItem );

}

