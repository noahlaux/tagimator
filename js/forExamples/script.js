// Wait until jqeury has loaded and DOM is ready
$( function(){
	// Run transitions
	$('body').tagimator('show', {
		// Fired before a step have been finished, and pass the current step and stack as arguments
		onBeforeStep: function( step, stack ) {
			
			// Log current step
			console.log('step ' + step + ' done');

			// Evaulate if we are on step 1 (remember steps are strings!)
            if ( step === "1" ) {
                // Since a fx stack step can hold many items, we only want the first here which is the title
                $(stack[0].el).html('.: New inserted title :.');
            }
            
		},
		// This callback is fired when all transistions have finished
		onFinish: function() {
			console.log('All transitions done');
		}
	});

});