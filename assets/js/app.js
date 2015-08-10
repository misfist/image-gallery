$(document).ready(function() {

	console.log('loaded');

	var imageData = getJSON( 'data/data.json' );

	//console.log( 'imageData: ', imageData );

	var collection = new imageCollection( imageData );

	//console.log( 'collection: ', collection );

	for( var i = 0; i < collection.items.length; i++) {

		imageList( collection.items[i] );

	}

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
function imageCollection( images ) {

	var self = this;
	this.items = [];

	$.each( images, function( index, key ) {

		self.items.push( new imageModel( images[index] ) );

		//console.log( new imageModel( images[index] ) );

	} );

}

function placeholderImage( images ) {

	var imgSrc = images.items[0].path;
	var imgTitle = images.items[0].title;

	return '<img src="' + imgSrc + '" alt="' + imgTitle + '">';

}


// Build Image List
function imageList( image, setName ) {

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

		//console.log( imageTag );

	} );

	var listItem = $( '<li>' );
	listItem.append( imageLink );

	$( '#image-list' ).append( listItem );

}


