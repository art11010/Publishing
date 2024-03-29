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
				this.changeNum(finalPrev, finalNext, 800, 'final');
			},
			changeNum: function(start, end, duration, type){
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