$(function(){
	var tapLiClick = $('ul.tap_1 li'),
	wrap = $('.wrap'),
	wrapShow = $('.wrap.show'),
	tap2LiClick = wrapShow.find('ul.tap_2 li'),
	imgShow = wrapShow.find('.img li');

	tapLiClick.click(function(){
		var thisIndex = $(this).index();
		wrap.removeClass("show");
		wrap.eq(thisIndex).addClass("show");
	});
	tap2LiClick.click(function(){
		var thisIndex = $(this).index();
		console.log(imgShow);
		imgShow.removeClass("show");
		imgShow.eq(thisIndex).addClass("show");
	});
	$(".tab li").click(function () {
		var num = $(".tab li").index(this);
		$(".tabContent").removeClass('active');
		$(".tabContent").eq(num).addClass('active');
		$(".tab li").removeClass('active');
		$(this).addClass('active')
	});

	$(".tab2 li").click(function () {
		var num = $(".tab2 li").index(this);
		$(".tabContent2").removeClass('active');
		$(".tabContent2").eq(num).addClass('active');
		$(".tab2 li").removeClass('active');
		$(this).addClass('active')
	});
});