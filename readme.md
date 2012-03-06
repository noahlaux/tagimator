# tagimator

tagimator is a alternative approach to step based page transitions driven by special tag attributes in your HTML markup.

```html
<!-- Simple tagimator example markup -->
<div data-fx-step="1" data-fx="fade" data-fx-speed="500">
	This is a box
</div>
```

## Features

* Easy to use step based transitions
* Minified version comes build in with advanced features like easing
* Uses GPU accelerated transitions where possible for great perfomance across platforms (Mobile too!)
* Download or build your own custom transision [based on jQuery UI effects plugins standard](http://jqueryui.com/demos/effect/)

## Quick start

Bla bla bla

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

**JAVASCRIPT**

```javascript
$( function(){
	$('body').tagimator('show');
});
```

**JAVASCRIPT**

For a little more advanced use:

```javascript
$( function(){
	$('body').tagimator('show', function() {
		alert('All transitions done');
	});
});
```


* Source: http://github.com/noahlaux/tagimator
* Docs: http://github.com/noahlaux/tagimator/wiki
* Twitter: http://twitter.com/noahlaux

## License

### Major components:

* jQuery: MIT/GPL license

### Everything else:

The Unlicense (aka: public domain)