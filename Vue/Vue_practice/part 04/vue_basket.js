window.addEventListener('DOMContentLoaded',function(){
	Vue.component('probuct-list',{
		// template: `
		// 	<div :class="list_num">
		// 		<p :class="{hihi:check}">
		// 			<input type="checkbox" v-model="check">
		// 			 Product Name : <span class="kor">{{ name }}</span>,
		// 			 Product Price : {{ price }},
		// 			 Number of products : {{ amount }}
		// 		</p>
		// 	</div>
		// `,
		template: `
			<div class="prodt_list" :class="{select:check}">
				<input type="checkbox" v-model="check" class="check_box">
				<label>Name : <input disabled type="text" :value="name" class="kor"></label>
				<label>Price : <input disabled type="number" :value="plusPrice"></label>
				<label>Number : <input disabled type="number" :value="amount" class="num"></label>
				<button type="button" @click="addAmount">+</button>
				<button type="button" @click="minAmount">-</button>
				<button type="button" @click="delList" :data-index=index>Delete</button>
			</div>
		`,
		props: {
			index: Number,
			prodtN: Object
		},
		data(){
			return {
				list_num: null,
				check: this.prodtN.check,
				name: this.prodtN.name,
				price: this.prodtN.price,
				amount: this.prodtN.amount,
			}
		},
		methods:{
			addAmount:function(){
				if(10 <= this.amount){
					return alert('10개 이하만 구매 가능합니다.');
				}
				this.amount++;
			},
			minAmount:function(){
				if(1 >= this.amount){
					return alert('1개 이상 선택해주세요.');
				}
				this.amount--;
			},
			delList:function(e){
				this.$emit('click',e);
			},
		},
		mounted(){
			// this.list_num = 'num' + (this.index + 1);
			this.list_num = 'num' + this.index;
		},
		computed: {
			plusPrice: function(){
				return this.price * this.amount;
			},
		}
	});
	new Vue({
		el: "#app",
		data: {
			prodtName: null,
			prodtPrice: null,
			prodtNumber: null,
			totalPrice: null,
			prodtList:[
				{check: true, name: '가방', price: 29000, amount: 1},
				{check: true, name: '신발', price: 129000, amount: 2}
			]
		},
		methods: {
			addClick: function(){
				if(this.prodtName == null || this.prodtPrice == null || this.prodtNumber == null){
					return alert('값을 입력해주세요.');
				}else{
					this.prodtList.push(
						{check: true, name:this.prodtName, price:this.prodtPrice, amount:this.prodtNumber}
					);
					// console.log(this.prodtList[0].name);
					this.prodtName = null;
					this.prodtPrice = null;
					this.prodtNumber = null;
				}
			},
			DelClick: function(e){
				let dataIdx = e.target.dataset.index;
				this.prodtList.splice(dataIdx, 1);
			}
		},
		watch: {
			prodtNumber:function(){
				if(this.prodtNumber == '' || this.prodtNumber == null) return;
				if(10 < this.prodtNumber){
					alert('10개 이하만 구매 가능합니다.');
					return this.prodtNumber = 10;
				}else if(1 > this.prodtNumber){
					alert('1개 이상 구매 가능합니다.');
					return this.prodtNumber = 1;
				}
			}
		},
		// computed: {
		// 	totalPrice: function(){
		// 		for(i = 0; i < this.prodtList.length; i++){
		// 			console.log(this.prodtList[i].price)
		// 		}
		// 		console.log(this.prodtList[0].price)
		// 		return this.prodtList[0].price
		// 	}
		// }
	});

});