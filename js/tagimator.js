/**
 * jQuery tagimator
 *
 * @version 1.1
 *
 * @author Noah Laux (noahlaux@gmail.com)
 *
 * @dependency
 *  jquery
 *  jquery.effects.core.js
 */
( function( $, undefined ) {

    var methods = {
        /**
         * Initialized with the provided options, and create fx stack from selector elements
         *
         * @private
         *
         * @param {Object} options Options for overiding the defaults
         * @param {Boolean} doHide Used for hiding the transisions
         *
         * @return {Array}
         */
        init: function( options ) {

            // Create some defaults, extending them with any options that were provided
            methods.settings = $.extend( {
                'speed':    1000,
                'fx':       'fade',
                'easing':   'easeInOutCubic',
                'method':   'show'
            }, options);
            
            // Setup event handling hooks
            if ( options ) {
                methods.onBeforeStep    = ( options.onBeforeStep ) ? options.onBeforeStep : null;
                methods.onAfterStep     = ( options.onAfterStep ) ? options.onAfterStep : null;
                methods.onFinish        = ( options.onFinish ) ? options.onFinish : null;
            }

            // Return for changing
            return this;

        },
        /**
         * Shows all elements with their repective transisions
         *
         * @public
         *
         * @return N/A
         */
        show: function() {
            
            // Check if our root objects have the data-fx property, else select all children
            var includeSelfElement  = $( this ).filter('[data-fx]'),
                items               = ( includeSelfElement.length === 0 ) ? $( this ).find('[data-fx]').not('.fxApplied') : includeSelfElement.not('.fxApplied'),
                // Create fx stack which holds elements for transition
                fxStack             = methods.createFxStack( items );

            // Hide all fx elements, so we can show them later with crazy fx
            $( items ).not('.fxApplied').hide();

            // Run transition steps
            methods.parseSteps( 'show', fxStack );
        },
        /**
         * Hide all elements with their repective transisions
         *
         * @public
         *
         * @return N/A
         */
        hide: function() {

            // Select all elements which has already been rendered before including the selector
            var includeSelfElement  = $( this ).filter('.fxApplied[data-fx]'),
                items               = ( includeSelfElement.length === 0 ) ? $( this ).find('.fxApplied') : includeSelfElement,
                // Reverse the fx stack to show them backwards
                fxStack             = methods.reverseStack( methods.createFxStack( items ) );

            // Run transition steps
            methods.parseSteps( 'hide', fxStack );
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
        parseSteps: function( method, fxStack ) {

            // Placeholder for fx queue
            var fxQ = $({});

            // Go through each stack in fx steps
            $.each( fxStack ,function( i, stack ) {
                
                // Add transitions queue with current steps transitions
                fxQ.queue( 'transitions', function( next ) {

                    // Call function for before step
                    if ( methods.onBeforeStep ) {
                        methods.onBeforeStep( i, stack );
                    }
                    
                    $.when( methods.transitions( stack , method ) )
                        // Transition done
                        .done( function() {
                            
                            // Call function for after step
                            if ( methods.onAfterStep ) {
                                methods.onAfterStep( i, stack );
                            }

                            // All element transitions on step is resolved, continue to next
                            next();
                        })
                        // Transition fail
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

                        // If item ask to run another transition
                        if ( item.outGoto ) {

                            // TODO describe/comment this flow better
                            var elements = ( item.outGoto === 'self' ) ? item.el : $( item.outGoto );
                            
                            $.each( elements, function( i, element ) {

                                var $element = $( element );

                                if ( $element.is(':hidden') ) {
                                    $( $element ).tagimator('show');
                                } else {
                                    $( $element ).tagimator('hide');
                                }
                              
                            });

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
         * @return {Object} fxStack
         */
        createFxStack: function( items ) {

            var fxStack = {};

            // Find all fx elements
            items
                // Put all steps into local object for later parsing
                .each( function( i, item ) {

                    var el = $( item );

                    // Create new fx step in stack
                    if ( !fxStack[ el.attr('data-fx-step') ]) {
                        fxStack[ el.attr('data-fx-step') ] = [];
                    }

                    // Push transitions details into step
                    fxStack[ el.attr('data-fx-step') ].push({
                        el:         el,
                        fx:         el.attr('data-fx'),
                        speed:      el.attr('data-fx-speed') ? el.attr('data-fx-speed') : methods.settings.speed,
                        outGoto:    el.attr('data-fx-out-goto') ? el.attr('data-fx-out-goto') : null,
                        options:    {
                            direction:  el.attr('data-fx-direction'),
                            easing:     el.attr('data-fx-easing') ? el.attr('data-fx-easing') : methods.settings.easing
                        }
                    });

                });

            return fxStack;

        },
        /**
         * Reverse the order of the fx stack
         *
         * @param  {Object} items
         *
         * @return {Object} items in reversed order
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

            var itemsLength = a.length;

            for ( key = 0; key < itemsLength; key++ ) {
                sorted[ key + 1 ] = items[ a[key] ];
            }

            return sorted;

        }
    };

    /**
     * Bridge
     *
     * @param  {String} method
     *
     * @return {Function} chosen method
     */
    $.fn.tagimator = function( method ) {

        if ( methods[ method ] ) {
            // Initialize
            methods.init.apply( this, Array.prototype.slice.call( arguments, 1 ) );
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tagimator' );
        }
    };

})( jQuery );