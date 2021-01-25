window.addEventListener('DOMContentLoaded',function(){
	Vue.component('probuct-list',{
		template: `
			<div class="prodt_list" :class="{select:this.check}">
				<input type="checkbox" v-model="check" class="check_box" :id="index">
				<label :for="index"></label>
				<label>Name : <input disabled type="text" :value="prodtN.name" class="kor" ref="input"></label>
				<label>Price : <input disabled type="number" :value="plusPrice"></label>
				<label>Number : <input disabled type="number" :value="prodtN.number" class="num"></label>
				<button type="button" @click="plusnumber">+</button>
				<button type="button" @click="minnumber">-</button>
				<button type="button" @click="delList" class="del">Delete</button>
			</div>
		`,
		props: {
			index: Number,
			prodtN: Object
		},
		data(){
			return {
				check: this.prodtN.check,
			}
		},
		methods:{
			plusnumber:function(){
				if(50 <= this.prodtN.number){
					return alert('50개 이하만 구매 가능합니다.');
				}
				this.prodtN.number++;
			},
			minnumber:function(){
				if(1 >= this.prodtN.number){
					return alert('1개 이상 선택해주세요.');
				}
				this.prodtN.number--;
			},
			delList:function(){
				this.$emit('totalfn', 'delete', null, this.index);
			}
		},
		mounted(){
			this.$emit('totalfn', 'mounted', this.plusPrice);
		},
		watch: {
			plusPrice: function(e){
				this.$emit('totalfn', 'plusPrice', e, this.index);
			},
			check: function(e){
				this.$emit('totalfn', 'check', this.plusPrice, this.index, e);
				this.prodtN.check = this.check;
			}
		},
		computed: {
			plusPrice: function(){
				Vue.set(this.$data,	"check", this.prodtN.check);
				return this.prodtN.price * this.prodtN.number;
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
			totalPrice: 0,
			prodtList:[
				{check: true, name: '가방', price: 29000, number: 1},
				{check: true, name: '신발', price: 129000, number: 2},
			],
		},
		methods: {
			addClick: function(){
				if(this.prodtName == null || this.prodtPrice == null || this.prodtNumber == null){
					return alert('값을 입력해주세요.');
				}else{
					this.prodtList.push(
						{check: true, name:this.prodtName, price:this.prodtPrice, number:this.prodtNumber}
					);
					this.prodtName = null;
					this.prodtPrice = null;
					this.prodtNumber = null;
					this.$refs.pName.focus();
				}
			},
			totalPricefn: function(type, plus, idx, bool){
				if(type == 'mounted'){
					this.totalPriceArray.push(plus);
				}else if(type == 'check'){
					if(bool == false){
						this.totalPriceArray.splice(idx, 1, null);
					}else if(bool == true){
						this.totalPriceArray.splice(idx, 1, plus);
					}
				}else if(type == 'delete'){
					this.prodtList.splice(idx, 1);
					this.totalPriceArray.splice(idx, 1);
				}else if(type == 'plusPrice'){
					this.totalPriceArray.splice(idx, 1, plus);
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
			prodtPrice:function(){
				if(this.prodtPrice == '' || this.prodtPrice == null) return;
				if(99999999999999 < this.prodtPrice){
					alert('정확한 가격을 입력해주세요.');
					return this.prodtPrice = 99999999999999;
				}else if(1 > this.prodtPrice){
					alert('정확한 가격을 입력해주세요.');
					return this.prodtPrice = 1;
				}
			},
			prodtNumber:function(){
				if(this.prodtNumber == '' || this.prodtNumber == null) return;
				if(50 < this.prodtNumber){
					alert('50개 이하만 구매 가능합니다.');
					return this.prodtNumber = 50;
				}else if(1 > this.prodtNumber){
					alert('1개 이상 구매 가능합니다.');
					return this.prodtNumber = 1;
				}
			},
		},
		mounted(){
			this.$refs.pName.focus();
		},
	});
});