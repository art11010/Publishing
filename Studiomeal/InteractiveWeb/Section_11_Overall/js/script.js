(function(){
	const stageElem = document.querySelector('.stage');
	const houseElem = document.querySelector('.house');
	const barElem = document.querySelector('.progress-bar');
	const mousePos = {x:0,y:0};
	let maxScrollValue;

	function resizeHendler(){
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}
	window.addEventListener('scroll',function(){
		const scrollPer = pageYOffset / maxScrollValue;
		let zMove = scrollPer * 980 - 490;
		houseElem.style.transform = 'translateZ('+ zMove +'vw)';
		// console.log(zMove);

		// progress bar
		barElem.style.width = scrollPer * 100 + 'vw';
	});

	window.addEventListener('mousemove',function(e){
		mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
		mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
		// console.log(mousePos);
		stageElem.style.transform = 'rotateX(' + mousePos.y*5 + 'deg) rotateY( ' + mousePos.x*5 + 'deg)'
	});

	window.addEventListener('resize',resizeHendler);
	resizeHendler();

	stageElem.addEventListener('click',function(e){
		new Character({
			xPos : e.clientX/ window.innerWidth * 100,
			speed : Math.random() * 0.5 + 0.2
		});
	});
})();