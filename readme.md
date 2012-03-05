# tagimator

tagimator is a alternative approach to step based page transitions driven by special tag attributes in your HTML markup.

## Quick start

Bla bla bla

## Features

* Easy to use step based transitions
* Minified version comes build in with advanced features like easing
* Uses GPU accelerated transitions where possible
* Download or build your own custom transision (based on jQuery UI effects plugins standard)

* Source: http://github.com/noahlaux/tagimator
* Docs: http://github.com/noahlaux/tagimator/wiki
* Twitter: http://twitter.com/noahlaux

## License

### Major components:

* jQuery: MIT/GPL license

### Everything else:

The Unlicense (aka: public domain)

**Handlebars.js:**

```html
<div data-fx-step="1" data-fx="fade">
	This is a box
</div>	

<div data-fx-step="1" data-fx="fade">
	<div data-fx-step="2" data-fx="slide" data-fx-direction="left" data-fx-speed="2000">
		This is a nested box
	</div>
	<div data-fx-step="2" data-fx="slide" data-fx-direction="right" data-fx-speed="2000">
		This is a nested box 2
	</div>
</div>
```


```javascript
var Photo = Backbone.Model.extend({

    // Default attributes for the photo
    defaults: {
      src: "placeholder.jpg",
      caption: "A default image",
      viewed: false
    },

    // Ensure that each photo created has an `src`.
    initialize: function() {
       this.set({"src": this.defaults.src});
    }

});
```