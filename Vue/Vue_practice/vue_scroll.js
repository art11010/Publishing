window.addEventListener('DOMContentLoaded',function(){
	Vue.component('section-compo',{
		template: `
			<section :id="id" :class="bgColors" class="fullpage">
				<h1>{{ id }}</h1>
			</section>
		`,
		props: {
			index: Number
		},
		data(){
			return {
				id: null,
				uuid: 0,
				bgColors: ['red', 'green', 'blue', 'purple']
			}
		},
		mounted(){
			this.id = 'section' + (this.index + 1);
			const bgLength = this.bgColors.length;

			// 랜덤
			// let randomNum = Math.floor(Math.random()*bgLength);
			// this.bgColors = this.bgColors[randomNum];

			// 순서대로
			let orderNum = this.index;
			if(orderNum >= bgLength){
				orderNum = orderNum % bgLength;
			}
			this.bgColors = this.bgColors[orderNum];
		}
	});
	new Vue({
		el: '#app',
		data: {
			sections:['section-compo', 'section-compo', 'section-compo', 'section-compo'],
			activeIndex: null,
			offsets: [],
			inMove: false,
		},
		methods: {
			btnClick: function(e){
				let idx = e.target.dataset.index;
				let location = document.querySelectorAll('.fullpage')[idx].offsetTop;
				window.scroll({
					top: location,
					behavior: 'smooth'
				});
			},
			addSection: function(){
				this.sections.push('section-compo');
			},
			delSection: function(){
				let sectNum = this.sections.length;
				if(sectNum == 1){
					return
				}else{
					if(this.activeIndex == sectNum-1){
						return
					}else{
						this.sections.splice(sectNum-1, 1);
					}
				}
			},
			pageScroll: function(e){
				if(e.wheelDelta < 120 && !this.inMove) {
					this.moveUp();
				}else if(e.wheelDelta > -120 && !this.inMove) {
					this.moveDown();
				}
			},
			moveDown(){
				let sectNum = this.sections.length;
				this.inMove = true;
				if(this.activeIndex == 0){
					this.activeIndex = sectNum;
				};
				this.activeIndex--;
				this.scrollToSection(this.activeIndex);
			},
			moveUp(){
				let sectNum = this.sections.length;
				this.inMove = true;
				this.activeIndex++;
				if(this.activeIndex == sectNum){
					this.activeIndex = 0;
				};
				this.scrollToSection(this.activeIndex);
			},
			scrollToSection(activeNum){
				let fullPage = document.querySelectorAll('.fullpage');
				window.scroll({
					top: fullPage[activeNum].offsetTop,
					behavior: 'smooth'
				});
				setTimeout(() => {
					this.inMove = false;
				}, 500);
			}
		},
		computed: {
			btnNum: function(){
				let sectNum = this.sections.length;
				return sectNum;
			}
		},
		mounted(){
			let fullPage = document.querySelectorAll('.fullpage');
			let sectNum = this.sections.length;
			for(let i = 0; i < sectNum; i++){
				let sectTop = fullPage[i].offsetTop;
				this.offsets.push(sectTop);
				if(window.scrollY >= this.offsets[i]){
					this.activeIndex = i;
				}
			}
		},
		created: function(){
			window.addEventListener('mousewheel', this.pageScroll);
		},
		destroyed: function(){
			window.removeEventListener('mousewheel', this.pageScroll);
		}
	});
});