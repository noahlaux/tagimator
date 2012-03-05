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
         * [init description]
         *
         * @param  {Object} options [description]
         *
         * @return {Array}
         */
        init: function( options, doHide ) {

            // Create some defaults, extending them with any options that were provided
            methods.settings = $.extend( {
                'speed':        1000,
                'fx':           'fade',
                'easing':       'easeInOutCubic',
                'currentStep':  1,
                'method':       'show',
                'onTransitionBeforeStep' : methods.onTransitionBeforeStep
            }, options);
            
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
                    items = ( $( self.selector + '[data-fx]').length === 0 ) ? $( self ).find('[data-fx]') : $( self.selector + '[data-fx]');
                }
                
                // Find all fx elements
                items
                    // Put all steps into local object for later parsing
                    .each( function( i, item ) {

                        var el = $( item );

                        // Create new fx step in stack
                        if ( !methods.fxStack[ el.attr('data-fxstep') ]) {
                            methods.fxStack[ el.attr('data-fxstep') ] = [];
                        }

                        methods.fxStack[ el.attr('data-fxstep') ].push({
                            el:         el,
                            fx:         el.attr('data-fx'),
                            speed:      el.attr('data-fxspeed') ? el.attr('data-fxspeed') : methods.settings.speed,
                            options:    {
                                direction:  el.attr('data-fxdirection'),
                                easing:     el.attr('data-fxeasing') ? el.attr('data-fxeasing') : methods.settings.easing
                            }
                        });

                    });

                    if ( !doHide ) {
                        // Hide all fx elements, so we can show them later with crazy fx
                        $( items ).hide();
                    }
            
            });

        },
        /**
         * Shows all elements with their repective transisions
         *
         * @param {Integer} item
         * @param {Function} callback
         *
         * @return N/A
         */
        show: function( callback ) {

            // Put dom elements in transition stack
            methods.init.apply( this, arguments );

            methods.parseSteps( 'show', callback );
        },
        /**
         * Local method to show transitions
         *
         * @param  {[type]}   item     [description]
         * @param  {Function} callback [description]
         *
         * @return {[type]}
         */
        hide: function( callback ) {
            
            methods.init.apply( this, [this, true] );

            methods.fxStack = $( methods.fxStack ).toArray().reverse()[0];

            methods.parseSteps( 'hide', callback );
        },
        /**
         * Local method to show transitions
         *
         * @private
         *
         * @param  {[type]}   item     [description]
         * @param  {Function} callback [description]
         *
         * @return {[type]}
         */
        transitions: function( items, method ) {

            var d = $.Deferred();
        
            $.each( items, function( i, item ) {
                 // Check if effect exists
                if ( !$.effects[ item.fx ] ) {
                    d.reject('effect "' + fx + '" is not declared on element ', item );
                }

                // Apply transitions to objects
                item.el[ method ](
                    // Named effect
                    item.fx,
                    // Provide options
                    item.options,
                    // Set Speed
                    parseInt( item.speed, 10 ),
                    // Call next step
                    function () {
                        item.el.addClass('fxApplied');
                        if ( i ==  ( items.length - 1 ) ) {
                            d.resolve(item);
                        }
                    }
                );
            });
           
            return d.promise();

        },
        /**
         * [parseSteps description]
         *
         * @param  {Object} method 'show' | 'hide'
         *
         * @return N/A
         */
        parseSteps: function( method, callback ) {
                            
            // Call function for Before transition
            if ( this.onTransitionBeforeStep ) {
                this.onTransitionBeforeStep( step );
            }

            // Placeholder for fx queue
            var fxQ = $({});

            // Go through each stack in fx steps
            $.each( methods.fxStack ,function( i, stack ) {
                
                // Add transitions queue with current steps transitions
                fxQ.queue( 'transitions', function( next ) {
                    
                   $.when( methods.transitions( stack , method ) ).done( function() {
                        // All element transitions on step is resolved, continue to next
                        next();
                   });
     
              });
            });

            // Add end to queue and call callback function if any
            fxQ.queue( 'transitions', function() {
                if ( callback ) {
                    callback();
                }
            });

            // Run transition queue
            fxQ.dequeue('transitions');

        },
        /**
         * Removes the fx applied flag on all children
         * this is jQuery selector
         *
         * @return N/A
         */
        reset: function( ) {
            $( this.children() ).removeClass('fxApplied');
        }
    };

    $.fn.tagimator = function( method ) {
    
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tagimator' );
        }
  };

})( jQuery );