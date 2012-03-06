$( function(){

	$('body').tagimator('show', {
		onBeforeStep: function( step, stack ) {
			
			console.log('step ' + step + ' done');

			if ( step === "1" ) {
				$(stack[0].el).html('.: New inserted title :.');
			}
		},
		onFinish: function() {
			console.log('All transitions done');
		}
	});

});