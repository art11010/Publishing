window.addEventListener('DOMContentLoaded',function(){
	Vue.component('probuct-list',{
		template: `
			<div class="prodt_list" :class="{select:this.check}" :data-index=index>
				<input type="checkbox" v-model="check" class="check_box">
				<label>Name : <input disabled type="text" :value="this.prodtN.name" class="kor"></label>
				<label>Price : <input disabled type="number" :value="plusPrice"></label>
				<label>Number : <input disabled type="number" :value="this.prodtN.amount" class="num"></label>
				<button type="button" @click="addAmount">+</button>
				<button type="button" @click="minAmount">-</button>
				<button type="button" @click="delList">Delete</button>
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
			}
		},
		methods:{
			addAmount:function(){
				if(10 <= this.prodtN.amount){
					return alert('10개 이하만 구매 가능합니다.');
				}
				this.prodtN.amount++;
			},
			minAmount:function(){
				if(1 >= this.prodtN.amount){
					return alert('1개 이상 선택해주세요.');
				}
				this.prodtN.amount--;
			},
			delList:function(e){
				this.$emit('delete', this._uid);
			}
		},
		mounted(){
			this.$emit('toto', this.plusPrice);
		},
		watch: {
			plusPrice: function(e){
				this.$emit('toto', e, this._uid);
			},
			check: function(e){
				this.$emit('toto', this.plusPrice, this._uid, e);
			}
		},
		computed: {
			plusPrice: function(){
				return this.prodtN.price * this.prodtN.amount;
			},
		},
	});
	new Vue({
		el: "#app",
		data: {
			prodtName: null,
			prodtPrice: null,
			prodtNumber: null,
			totalPriceArray:[],
			totalPrice: null,
			prodtList:[
				// {check: true, name: '가방', price: 29000, amount: 1},
				// {check: true, name: '신발', price: 129000, amount: 2},
			],
		},
		methods: {
			addClick: function(){
				if(this.prodtName == null || this.prodtPrice == null || this.prodtNumber == null){
					return alert('값을 입력해주세요.');
				}else{
					this.prodtList.push(
						{check: true, name:this.prodtName, price:this.prodtPrice, amount:this.prodtNumber}
					);
					this.prodtName = null;
					this.prodtPrice = null;
					this.prodtNumber = null;
				}
			},
			DelClick: function(uid){
				uid = uid-1;
				this.prodtList.splice(uid, 1);
				this.totalPriceArray.splice(uid, 1);
				this.sumFn();
			},
			totalPricefn: function(p,uid,bool){
				if(!uid){
					this.totalPriceArray.push(p);
				}else{
					this.totalPriceArray.splice(uid-1, 1, p);
				}
				if(bool == false){
					this.totalPriceArray.splice(uid-1, 1, null);
				}
				this.sumFn();
			},
			sumFn: function(){
				let sum = this.totalPriceArray.reduce((stack, el)=>{
					return stack + el;
				}, 0);
				Vue.set(this.$data,	"totalPrice", sum);
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
			},
		}
	});

});