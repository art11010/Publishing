window.addEventListener('DOMContentLoaded',function(){
	new Vue({
		el: "#app",
		data: {
			prodts: [
				{name: '토트백', price: 999000},
				{name: '런닝화', price: 10000}
			],
			prodtName: null,
			prodtPrice: null,
		},
	});
});