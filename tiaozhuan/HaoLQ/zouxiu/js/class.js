
//获取商品介绍数据

var vm = new Vue({
		el: '#app',
		data: {
			datas:[],
			pho:[]
		},
		methods: {
			opens: function () {
				var id1 = localStorage.getItem('#classID');
				console.log(id1);
				this.$http.jsonp('http://datainfo.duapp.com/shopdata/getGoods.php', {
					params: {
						goodsID: id1
					}
				}).then(function (data) {
					console.log(data.body);
			        vm.datas=data.body;
					vm.pho=JSON.parse(data.body.goodsBenUrl);
				});
			}

		}

	});
	vm.opens();
