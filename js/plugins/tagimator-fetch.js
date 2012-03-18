/**
 * Tagimator plugin - Fetch
 *
 * Makes tagimator able to fetch external pages with tagimator markup
 *
 * @version  1.0
 * @author Noah Laux (noahlaux@gmail.com)
 *
 * @dependency
 *  jQuery.tagimator (http://github.com/noahlaux/tagimator)
 */

( function( $ , namespace, undefined ){

    var methods = {
            /**
             * Render each segment
             *
             * @param {Array} segments HTML elemens
             *
             * @return N/A
             */
            renderSegments: function( segments ) {

                var self = this;

                if ( segments.length > 0 ) {
                    
                    // Make segments relative to make bounderies, and hide overflown content
                    // TODO make this optional
                    segments
                        .css({
                            'position': 'relative',
                            'overflow': 'hidden'
                        });

                    segments.each( function( i, segment ) {

                        // Find each fragment
                        $( segment ).find('.tagimator-fragment').each( function( j, fragment ) {
                            
                            // Render fragment
                            self.renderFragment( fragment );
                            
                        });

                    });

                }

            },
            /**
             * Render a fragment
             *
             * @param {Object} fragment HTML element
             *
             * @return N/A
             */
            renderFragment: function( fragment ) {

                // Generate unique identifier used for CSS and tag id
                var self = this,
                    guid = this.getGuid();

                $( fragment )
                    .attr('id', 'tagimator_' + guid )
                    .addClass('fx-rendered');

                this.fetch( $( fragment ).data('url'), function( html ) {
                    
                    $('head').find('style').append( self.parseCSS( html, guid ) );

                    $( fragment )
                        // Put fragment into segment
                        .append( self.parseHTML( html ) )
                        // Start fragment
                        .tagimator('show');

                });

            },
            /**
             * Fetch the tagimator fragment from url
             *
             * @param  {String}   url      Url to fragment
             * @param  {Function} callback
             *
             * @return N/A
             */
            fetch: function( url, callback ) {
                var self = this;

                $.ajax({
                    url: url,
                    success: function( data ) {
                        callback( data );
                    },
                    error: function( jqXHR, textStatus, errorThrown ) {
                        callback( '<div class="tagimator-error"><p>can not render: ' + url + '</p><p>reason: ' + errorThrown + '</p></div>');
                    }
                });
            },
            /**
             * Strips out various HTML bits and pieces
             *
             * @param  {String} html HTML to parse
             *
             * @return {String} parsed HTML
             */
            parseHTML: function( html ) {
                
                return html
                    // Strip all script tags to ensure no javascript injections
                    .replace(/<script.*?>[\s\S]*?<\/.*?script>/, '')
                    // Strip all style tags
                    .replace(/<style.*?>[\s\S]*?<\/.?style>/, '' );

            },
            /**
             * Parses CSS
             *
             * @param  {String} html HTML to be processed
             * @param  {String} guid unique identifier pr fragment
             *
             * @return {String}
             */
            parseCSS: function( html, guid ) {

                // TODO this takes for granted that we have style in header REWRITE!!
                // rewrite so it can take linked stylesheets as well
                var style       = html.match(/<style.*?>[\s\S]*?<\/.?style>/)[0].replace(/(<style>|<?<\/style>)/,''),
                    prefixedCSS = this.prefixCSS( style, '#tagimator_' + guid );

                return prefixedCSS;

            },
            /**
             * Prefix all CSS classes (both classes, id's and elements like body)
             *
             * @param  {String} css    Raw CSS to prefix (without style tags!)
             * @param  {String} prefix Prefix string
             *
             * @return {String} prefixed CSS
             */
            prefixCSS: function( css, prefix ) {
               
               // TODO This regex works on all classes, tags and ids, but only in a max 2 nested heiraki, so rewrite!!!
               var algoritm = /(=|"|\[|\]|\:|[a-z0-9_\-]|#|\.)(([_a-zA-Z0-9]|=|\[|\]|\"|\:|\.)*(\s)*([_a-zA-Z0-9-]|\[|\=|\"|\]\:|\.|#)*)(?=[^}]+\{)/gi;

               return css.replace( algoritm, prefix + ' $1$2' );
            },
            /**
             * Generate GUID
             *
             * @return {String}
             */
            getGuid: function() {
                function S4() {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                }
                return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            }
        };

    // Look if we have segments to render
    if ( $('.tagimator-segment').not('.fx-rendered').length > 0 ) {
        methods.renderSegments( $('.tagimator-segment').not('.fx-rendered') );
    }

})( jQuery, this );