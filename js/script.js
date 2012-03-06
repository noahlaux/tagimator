$( function(){

	$('body').tagimator('show', {
		onAfterStep: function( step ) {
			console.log('step', step);
		},
		onFinish: function() {
			console.log('All transitions done');
		}
	});

});