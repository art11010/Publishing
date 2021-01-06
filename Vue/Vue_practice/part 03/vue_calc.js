window.addEventListener('DOMContentLoaded',function(){
	new Vue({
		el: "#ui_evtWrap",
		data: {
			selected : '전라남도',
			subsidyPrice: 1000,
			finalPrice: 190,
			imgName: 'img/map/map_jeolla-s.png',
			calcLoct : [
				{"location": "서울특별시", "subsidy": "680", "imgTitle":"map_seoul"},
				{"location": "부산광역시", "subsidy": "700", "imgTitle":"map_busan"},
				{"location": "대구광역시", "subsidy": "600", "imgTitle":"map_daegu"},
				{"location": "인천광역시", "subsidy": "670", "imgTitle":"map_incheon"},
				{"location": "광주광역시", "subsidy": "650", "imgTitle":"map_gwangju"},
				{"location": "대전광역시", "subsidy": "700", "imgTitle":"map_daejeon"},
				{"location": "울산광역시", "subsidy": "700", "imgTitle":"map_ulsan"},
				{"location": "세종특별자치시", "subsidy": "600", "imgTitle":"map_sejong"},
				{"location": "경기도", "subsidy": "650", "imgTitle":"map_gyeonggi"},
				{"location": "강원도", "subsidy": "770", "imgTitle":"map_gangwon"},
				{"location": "충청북도", "subsidy": "900", "imgTitle":"map_chungcheong-n"},
				{"location": "충청남도", "subsidy": "820", "imgTitle":"map_chungcheong-s"},
				{"location": "전라북도", "subsidy": "650", "imgTitle":"map_jeolla-n"},
				{"location": "전라남도", "subsidy": "1000", "imgTitle":"map_jeolla-s"},
				{"location": "경상북도", "subsidy": "900", "imgTitle":"map_gyeongsang-n"},
				{"location": "경상남도", "subsidy": "800", "imgTitle":"map_gyeongsang-s"},
				{"location": "제주특별자치도", "subsidy": "800", "imgTitle":"map_jeju"}
			]
		},
		methods: {
			clickMap: function(e){
				let loctleng = this.calcLoct.length;
				if(e.target.alt !== this.selected){
					for(let i = 0; i < loctleng; i++){
						if(e.target.alt == this.calcLoct[i].location){
							Vue.set(this.$data,"selected",this.calcLoct[i].location);
						}
					}
				}
			},
			hoverMap: function(e){
				// console.log(e.target.alt)
				let loctleng = this.calcLoct.length;
				for(let i = 0; i < loctleng; i++){
					if(e.target.alt == this.calcLoct[i].location){
						Vue.set(this.$data,"imgName",'img/map/' + this.calcLoct[i].imgTitle + '.png');
					}
				}
			}
		},
		updated: function() {
			let loctleng = this.calcLoct.length;
			for(let i = 0; i < loctleng; i++){
				if(this.$data.selected == this.calcLoct[i].location){
					Vue.set(this.$data,"subsidyPrice",this.calcLoct[i].subsidy);
					Vue.set(this.$data,"finalPrice",1190 - this.calcLoct[i].subsidy);
				}
			}
        },
	});
});