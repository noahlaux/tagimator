/**
 * jQuery tagimator
 *
 * @version 1.0
 *
 * @author Noah Laux (noahlaux@gmail.com)
 *
 * @dependency
 *  jquery
 *  jquery.effects.core.js
 */
(function( $, undefined ) {

    var methods = {
        /**
         * Initialized with the provided options, and create fx stack from selector elements
         *
         * @private
         *
         * @param  {Object} options Options for overiding the defaults
         * @param {Boolean} doHide Used for hiding the transisions
         *
         * @return {Array}
         */
        init: function( options, doHide ) {

            // Create some defaults, extending them with any options that were provided
            methods.settings = $.extend( {
                'speed':        1000,
                'fx':           'fade',
                'easing':       'easeInOutCubic',
                'method':       'show'
            }, options);
            
            // Setup event handling hooks
            if ( options ) {
                methods.onBeforeStep    = ( options.onBeforeStep ) ? options.onBeforeStep : null;
                methods.onAfterStep     = ( options.onAfterStep ) ? options.onAfterStep : null;
                methods.onFinish        = ( options.onFinish ) ? options.onFinish : null;
            }

            // Fx stack
            methods.fxStack = {};
            
            var self    = this,
                items   = {};

            // Return each element for changing
            return this.each( function(){

                if ( doHide ) {
                    items = $( self ).find('.fxApplied');
                } else {
                    // Check if our root objects have the data-fx property, else select all children
                    items = ( $( self.selector + '[data-fx]').length === 0 ) ? $( self ).find('[data-fx]').not('.fxApplied') : $( self.selector + '[data-fx]').not('.fxApplied');
                }

                 if ( !doHide ) {
                    // Hide all fx elements, so we can show them later with crazy fx
                    $( items ).not('.fxApplied').hide();
                }
                
                // Create fx stack which holds elements for transition
                methods.createFxStack( items ) ;

            });

        },
        /**
         * Shows all elements with their repective transisions
         *
         * @public
         *
         * @return N/A
         */
        show: function() {
            
            // Put dom elements in transition stack
            methods.init.apply( this, arguments );

            // Run transition steps
            methods.parseSteps( 'show' );
        },
        /**
         * Hide all elements with their repective transisions
         *
         * @public
         *
         * @return N/A
         */
        hide: function() {
            
            // Put dom elements in transition stack
            methods.init.apply( this, [this, true] );

            // Reverse the fx stack
            methods.fxStack = methods.reverseStack( methods.fxStack );

            // Run transition steps
            methods.parseSteps( 'hide' );
        },
        /**
         * Removes the fx applied flag on all children
         * this is jQuery selector
         *
         * @public
         *
         * @return N/A
         */
        reset: function( ) {
            $( this.children() ).removeClass('fxApplied');
        },
        /**
         * Parse each step in fx stack with transitions
         *
         * @private
         *
         * @param {Object} method 'show' | 'hide'
         *
         * @return N/A
         */
        parseSteps: function( method ) {

            // Placeholder for fx queue
            var fxQ = $({});

            // Go through each stack in fx steps
            $.each( methods.fxStack ,function( i, stack ) {
                
                // Add transitions queue with current steps transitions
                fxQ.queue( 'transitions', function( next ) {

                    // Call function for before step
                    if ( methods.onBeforeStep ) {
                        methods.onBeforeStep( i, stack );
                    }
                    
                    $.when( methods.transitions( stack , method ) )
                        .done( function() {
                            // Call function for after step
                            if ( methods.onAfterStep ) {
                                methods.onAfterStep( i, stack );
                            }
                            // All element transitions on step is resolved, continue to next
                            next();
                        })
                        .fail( function( e, item ) {
                            // log error
                            console.log( e, item );
                        });
     
              });
            });

            // Add end to queue and call callback function if any
            fxQ.queue( 'transitions', function() {
                if ( methods.onFinish ) {
                    methods.onFinish();
                }
            });

            // Run transition queue
            fxQ.dequeue('transitions');

        },
        /**
         * Run transitions
         *
         * @private
         *
         * @param  {Object} items
         * @param  {String} method show | hide
         *
         * @return {Function} promise
         */
        transitions: function( items, method ) {

            var d = $.Deferred();
        
            $.each( items, function( i, item ) {
                
                // Check if effect exists
                if ( !$.effects[ item.fx ] ) {
                    d.reject( 'Effect "' + item.fx + '" does not exits. Did you include the jqeury.effect.' + item.fx + '.js ? ', item );
                    return false;
                }

                // Apply transitions to objects
                item.el[ method ](
                    // Named effect
                    item.fx,
                    // Provide options
                    item.options,
                    // Set Speed
                    parseInt( item.speed, 10 ),
                    // Transition done
                    function () {

                        // Flag/unflag tag transition state
                        if ( method === 'show' ) {
                            item.el.addClass('fxApplied');
                        } else {
                            item.el.removeClass('fxApplied');
                        }

                        // if we're at final item resolve delegation
                        if ( i ==  ( items.length - 1 ) ) {
                            d.resolve( item );
                        }
                    }
                );
            });
           
            return d.promise();

        },
        /**
         * Creates fx stack
         *
         * @private
         *
         * @param  {Object} items
         *
         * @return N/A
         */
        createFxStack: function( items ) {

            // Find all fx elements
            items
                // Put all steps into local object for later parsing
                .each( function( i, item ) {

                    var el = $( item );

                    // Create new fx step in stack
                    if ( !methods.fxStack[ el.attr('data-fx-step') ]) {
                        methods.fxStack[ el.attr('data-fx-step') ] = [];
                    }

                    // Push transitions details into step
                    methods.fxStack[ el.attr('data-fx-step') ].push({
                        el:         el,
                        fx:         el.attr('data-fx'),
                        speed:      el.attr('data-fx-speed') ? el.attr('data-fx-speed') : methods.settings.speed,
                        options:    {
                            direction:  el.attr('data-fx-direction'),
                            easing:     el.attr('data-fx-easing') ? el.attr('data-fx-easing') : methods.settings.easing
                        }
                    });

                });

        },
        /**
         * Reverse the order of the fx stack
         *
         * @param  {Object} items
         * @return {Object}
         */
        reverseStack: function( items ) {

            var sorted = {},
                key, a = [];

            for ( key in items ) {
                if ( items.hasOwnProperty(key) ) {
                    a.push( key );
                }
            }

            a.reverse();

            for ( key = 0; key < a.length; key++ ) {
                sorted[key + 1 ] = items[  a[key] ];
            }
            return sorted;

        }
    };

    $.fn.tagimator = function( method ) {
    
        if ( methods[ method ] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tagimator' );
        }
  };

})( jQuery );