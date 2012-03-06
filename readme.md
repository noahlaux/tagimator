# tagimator

tagimator is a alternative approach to step based page transitions driven by special tag attributes in your HTML markup.

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

## Quick start

tagimator has two main simple methods ```show``` & ```hide```, which either runs the transitions and 'show' the effected HTML elements, or 'hide' them which, by default (can be changed by proving options), runs the transitions in the exact opposit order of which they were shown.

**HTML**

```html
<!doctype html>
<body>
	<head>
		<title>tagimator simple demo</title>
	</head>
	<body>
		<!-- standard transistion use default speed, easing etc -->
		<div data-fx-step="1" data-fx="fade">
			This is a box
		</div>
		<!-- Supports nested structures too -->
		<div data-fx-step="1" data-fx="fade">
			<div data-fx-step="2" data-fx="slide" data-fx-direction="left" data-fx-speed="2000">
				This is a nested box
			</div>
			<div data-fx-step="2" data-fx="slide" data-fx-direction="right" data-fx-speed="2000">
				This is a nested box 2
			</div>
		</div>
	</body>
</html>
```

**Javascript**

To start transitions on the above HTML simply include the following:

```javascript
$( function(){
	$('body').tagimator('show');
});
```

## Advanced uses

For a little more advanced use, you can hook into the transition callback fired when all transitions have finished:

```javascript
$( function(){
	$('body').tagimator('show', function() {
		alert('All transitions done');
	});
});
```

## Available tags

```data-fx```, ```data-fx-step```, ```data-fx-speed```, ```data-fx-direction```, ```data-fx-easing```


* Source: http://github.com/noahlaux/tagimator
* Docs: http://github.com/noahlaux/tagimator/wiki
* Twitter: http://twitter.com/noahlaux

## License

### Major components:

* jQuery: MIT/GPL license

### Everything else:

The Unlicense (aka: public domain)