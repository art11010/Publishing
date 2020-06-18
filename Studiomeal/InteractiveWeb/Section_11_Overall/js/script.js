(function(){
	const bodyElem = document.querySelector('body');
	const houseElem = document.querySelector('.house');
	const barElem = document.querySelector('.progress-bar');
	let maxScrollValue;

	function resizeHendler(){
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	// 내가 만든 Bar
	// const barElem = document.createElement('div');
	// barElem.className = 'bar'
	// barElem.innerHTML = '<span></span>'
	// bodyElem.appendChild(barElem);

	// function iMadeBar(){
	// 	let barMove = scrollPer * 100;
	// 	console.log(barMove);
	// 	barElem.childNodes[0].style.width = barMove + 'vw';
	// }

	window.addEventListener('scroll',function(){
		const scrollPer = pageYOffset / maxScrollValue;
		let zMove = scrollPer * 980 - 490;
		houseElem.style.transform = 'translateZ('+ zMove +'vw)';
		// console.log(zMove);

		// progress bar
		barElem.style.width = scrollPer * 100 + 'vw';

		// 내가 만든 Bar
		// iMadeBar();
	});

	window.addEventListener('mousemove',function(e){
		console.log(e.clientX,e.clientY);
	});

	window.addEventListener('resize',resizeHendler);
	resizeHendler();
})();