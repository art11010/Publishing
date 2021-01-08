window.addEventListener('DOMContentLoaded',function(){
	new Vue({
		el: "#ui_evtWrap",
		data: {
			calcLoct: [],
			selected : '전라남도',
			subsidyPrice: '1,000',
			finalPrice: 190,
			imgName: 'img/map/map_jeolla-s.png',
		},
		methods: {
			hoverMap: function(e){
				this.changeMap(e.target.dataset.index);
			},
			selectOpt: function(e){
				this.changeAll(e.target.selectedIndex);
			},
			clickMap: function(e){
				this.changeAll(e.target.dataset.index);
			},
			changeMap: function(idxNum){
				Vue.set(this.$data,	"imgName",		'img/map/' + this.calcLoct[idxNum].imgTitle + '.png');
			},
			changeAll: function(idxNum){
				Vue.set(this.$data,	"selected", 	this.calcLoct[idxNum].location);
				Vue.set(this.$data,	"imgName",		'img/map/' + this.calcLoct[idxNum].imgTitle + '.png');

				let subsidyPrev;
				if(this.subsidyPrice == '1,000'){
					subsidyPrev = Number(this.subsidyPrice.replace(/,/g, ''));
				}else{
					subsidyPrev = Number(this.subsidyPrice);
				}
				let subsidyNext = Number(this.calcLoct[idxNum].subsidy);
				let finalPrev = Number(this.finalPrice);
				let finalNext = Number(1190 - subsidyNext);
				this.changeNum(subsidyPrev, subsidyNext, 800, 'subsidy');
				// this.changeNum(finalPrev, finalNext, 800, 'final');
			},
			changeNum: function(start, end, duration, type){
				let startStr = String(start);
				let startArray = [];
				let endStr = String(end);
				let endArray = [];
				// for(let i = startStr.length; i < startStr.length; --i){
				for(let i = startStr.length; i > 0; i--){
					let startDivi = startStr.substring(i,i-1)
					startArray.push(startDivi);
					// console.log(startArray)
				}
				for(let i = endStr.length; i > 0; i--){
					let endDivi = endStr.substring(i,i-1)
					endArray.push(endDivi);
					// console.log(endArray)
				}
				console.log(startArray)
				console.log(endArray)
				for(let i = endStr.length; i > 0; i--){
					if (startArray[i-1] === endArray[i-1]) return;
					let range2 = startArray[i-1] - endArray[i-1];
					let current2 = startArray[i-1];
					let increment2 = endArray[i-1] > startArray[i-1] ? 1 : -1;
					let stepTime2 = Math.abs(Math.floor(duration / range2));
					let timer2 = setInterval(function() {
						current2 += increment2;
						console.log(current2)
						if (current2 == endArray[i-1]) {
							clearInterval(timer2);
						}
					}, stepTime2);
					// if{
					// 	console.log('hi')
					// }
				}



				if (start === end) return;
				let range = end - start;
				let current = start;
				let increment = end > start ? 1 : -1;
				let stepTime = Math.abs(Math.floor(duration / range));
				that = this;
				let timer = setInterval(function() {
					current += increment;
					if(type == 'subsidy'){
						Vue.set(that.$data,	"subsidyPrice",	current);
					}else{
						Vue.set(that.$data,	"finalPrice",	current);
					}
					if (current == end) {
						that.subsidyPrice = that.subsidyPrice.toLocaleString()
						clearInterval(timer);
					}
				}, stepTime);
			}
		},
		created() {
			that = this;
			axios.get('vue_calc.json')
				.then(function(e){
					Vue.set(that.$data,	"calcLoct",	e.data);
				});
		},
	});
});