# tagimator

tagimator is a alternative approach to step based page element transitions, driven by special tag attributes in your HTML markup.

```html
<!-- Simple tagimator example markup -->
<div data-fx-step="1" data-fx="fade" data-fx-speed="500">
	This is a box...YAY!
</div>
```

## Features

* Easy to use step based transitions (just basic HTML knowledge needed)
* Dead simple setup, include a javascript file, execute one command and BAM!
* Minified version comes build in with advanced features like easing
* Uses GPU accelerated transitions where possible for great perfomance across platforms (Mobile too!)
* Download or build your own custom transision based on [jQuery UI effects plugins](http://jqueryui.com/demos/effect/) standard. The current available fx options are provided with the project for your convinience.

* Uses standard 'data' attributes, so no messy warnings in your IDE
* Oh did I mention it works splendid in all browsers you throw at it ???

## Quick start

**HTML**

```html
<!doctype html>
<body>
	<head>
		<title>tagimator simple demo</title>
	</head>
	<body>
		<!-- standard transistion use default speed, easing etc -->
		<div data-fx-step="1" data-fx="fade" class="box">
		    This is a box
		</div>
		<!-- Supports nested structures too -->
		<div data-fx-step="2" data-fx="fade" class="box">
		    <div data-fx-step="3" data-fx="slide" data-fx-direction="left" data-fx-speed="800" class="inner">
		        Nested box
		    </div>
		    <div data-fx-step="3" data-fx="slide" data-fx-direction="right" data-fx-speed="800" class="inner">
		        Nested box 2
		    </div>
		</div>​
	</body>
</html>
```

**Javascript**

tagimator has two main methods ```show``` & ```hide```, which either runs the transitions and **show** the effected HTML elements, or **hide** them which, by default (can be changed by proving options), runs the transitions in the exact opposit order of which they were shown.

To start transitions on the above HTML simply include the following in your javascript:

```javascript
// Wait until jqeury has loaded and DOM is ready
$( function(){
	// Run transitions
	$('body').tagimator('show');
});
```


see working example here: [simple demo on fiddlejs](http://jsfiddle.net/noahlaux/WveFK/)

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/noahlaux/WveFK/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Advanced uses

For a little more advanced use, you can fx hook into the callback fired when all transitions have finished:

```javascript
// Wait until jqeury has loaded and DOM is ready
$( function(){
	// Run transitions
	$('body').tagimator('show', {
		// This callback is fired when all transistions have finished
		onFinish: function() {
			alert('All transitions done');
		}
	);
});
```

For a more custum setup you can provide options, which are all optional and have default fallbacks:

```javascript
// Wait until jqeury has loaded and DOM is ready
$( function(){
	// Run transitions
	$('body').tagimator('show', {
		speed: 		500, // Default is 1000
		fx: 		'slide', // default is fade
		easing: 	'easeIn' // default is easeInOutCubic,
		// Fired before a step have been finished, and pass the current step and stack as arguments
		onBeforeStep: function( step, stack ) {
			// Log current step
			console.log('step ' + step + ' done');

			// Evaulate if we are on step 1 (remember steps are strings!)
			if ( step === "1" ) {
				// Since a fx stack step holds an array of items, make sure we only want the first here, which is the title
				$(stack[0].el).html('.: New inserted title :.');
			}
		},
		// Fired when all transistions have finished
		onFinish: function() {
			alert('All transitions done');
		}
	);
});
```

## Available event hooks

* ```onBeforeStep( step, stack )``` Fired before a step is about to render, and pass the current step and stack as arguments
* ```onAfterStep( step, stack )``` Fired when a step have been finished, and pass the current step and stack as arguments
* ```onFinish``` Fired when all transitions have finished

## The stack object

When you hook into either ```onBeforeStep``` or ```onAfterStep``` you're passed a ```stack``` array with objects representing the current stack items. Here's the layout:

```javascript
{
	el:         {Object}, // HTML element
	fx:         {String}, // String with transition name (default: 'fade')
	speed:      {Number}, // fx speed (default: 1000)
	options:    {
	    direction:  {String}, // Direction of slide (default: 'left')
	    easing:     {String} // Easing to use (default: 'easeInOutCubic')
}
```

## Available attributes

```data-fx```, ```data-fx-step```, ```data-fx-speed```, ```data-fx-direction```, ```data-fx-easing```

## More info

* Source: http://github.com/noahlaux/tagimator
* Docs: http://github.com/noahlaux/tagimator/wiki
* Twitter: http://twitter.com/noahlaux

## License

### Major components:

* jQuery: MIT/GPL license

### Everything else:

The Unlicense (aka: public domain)