$(function(){
	phClickHandler();
	touchHandler();
});


function phClickHandler(){
	var	phDot = $('.ph2_dot'),
		phDotLi = phDot.find('li'),
		phSlide = $('.ph2_slide'),
		phSlideLi = phSlide.find('li');

	phDotLi.click(function(){
		var dotNum = $(this).index();
			dotMinus = dotNum - 1;
		if(phSlideLi.eq(dotNum).hasClass('on')){return;}
		phDotLi.removeClass('on');
		phDotLi.eq(dotNum).addClass('on');
		phSlideLi.removeClass('on').css({'z-index':'','width':''});
		phSlideLi.eq(dotMinus).css({'z-index':1});
		phSlideLi.eq(dotNum).addClass('on').css({'width':0,'z-index':2}).stop().clearQueue().animate({'width':'100%'},1000);
	});
}

function touchHandler(){
	var	phDot = $('.ph2_dot'),
		phDotLi = phDot.find('li'),
		phSlide = $('.ph2_slide'),
		phSlideLi = phSlide.find('li');

	// phSlideLi.on('touchstart', function(e){
	// 	phDot.eq(0).html('touch start');
	// });
	phSlide.bind("touchstart",function(e){
		// e.preventDefault();
		alert('hi');
	});
}