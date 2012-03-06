# tagimator

tagimator is a alternative approach to step based page element transitions, driven by special tag attributes in your HTML markup.

```html
<!-- Simple tagimator example markup -->
<div data-fx-step="1" data-fx="fade" data-fx-speed="500">
	This is a box
</div>
```

## Features

* Easy to use step based transitions (just basic HTML knowledge needed)
* Dead simple setup, include a javascript file, execute one command and BAM!
* Minified version comes build in with advanced features like easing
* Uses GPU accelerated transitions where possible for great perfomance across platforms (Mobile too!)
* Download or build your own custom transision based on [jQuery UI effects plugins](http://jqueryui.com/demos/effect/) standard
* Oh did I mention it works splendid in all browsers you throw at it ???

## Quick start

tagimator has two main simple methods ```show``` & ```hide```, which either runs the transitions and **show** the effected HTML elements, or **hide** them which, by default (can be changed by proving options), runs the transitions in the exact opposit order of which they were shown.

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

For a little more advanced use, you can fx hook into the transition callback fired when all transitions have finished:

```javascript
// Wait until jqeury has loaded and DOM is ready
$( function(){
	// Run transitions
	$('body').tagimator('show', function() {
		// This callback is fired when all transistions have finished
		alert('All transitions done');
	});
});
```

For a more custum setup you can provide options:

```javascript
// Wait until jqeury has loaded and DOM is ready
$( function(){
	// Run transitions
	$('body').tagimator('show', {
			speed: 500, // Default is 1000
			fx: 'slide' // default is fade
		},
		function() {
			// This callback is fired when all transistions have finished
			alert('All transitions done');
		}
	);
});
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