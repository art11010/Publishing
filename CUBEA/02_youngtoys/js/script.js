$(function(){
	const visSlide = $('.visual_slide'),
		liElem = visSlide.find('li'),
		liL = liElem.length,
		barElem = visSlide.find('.bar_active');
	let slideCounter = 0,
		liW = liElem.outerWidth();

	$(window).resize(function(){
		liW = liElem.outerWidth();
        // $('.item_1').empty().append(liW);
	})
	// visSlide.css({'width':liW*liL});
	function slideHandler(){
		// visSlide.animate({left:-liW*slideCounter});
		slideCounter++;
		if(slideCounter==6){
			slideCounter = 0;
		}
		// console.log(slideCounter);
		// liElem.removeClass('active off on');
		// liElem.eq(slideCounter-1).addClass('active off').clearQueue().stop().animate({left:-liW},1000);
		// liElem.eq(slideCounter).addClass('active on').clearQueue().stop().animate({left:0},1000);
		// liElem.eq(slideCounter-1).addClass('active off');
		// liElem.eq(slideCounter).addClass('active on');
		motionHandler();

		barElem.clearQueue().stop().animate({width:'100%'},3000);
	}
	function motionHandler(){
		const visualElem =  $('.vImg');
		if(liElem.hasClass('item_1')){
			liElem.css({'background-position-x':'100%'});
			// 1
			// visualElem.css({'right':'-30px'});
			// 2
			visualElem.css({'right':'-27px'});
		}
	}
	// setInterval(slideHandler,3000);
	slideHandler();
});

