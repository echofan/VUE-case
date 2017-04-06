$(function () {
	//banner图片获取

	$.ajax({
		url: 'http://datainfo.duapp.com/shopdata/getBanner.php',
		dataType: "jsonp",
		jsonp: "callback",
		success: function (res) {
			//  console.log(res);
			$(".wait").fadeOut();
			var oul = $("#banner>ul");
			var arr = JSON.parse(res[0].goodsBenUrl);
			for (var i = 0; i < res.length; i++) {
				var aImg = $('<img src="' + arr[i] + '"/>')
				aImg.appendTo($aBan[i]);
			}
		}
	});
	//banner切换
	var $aBan = $("#banner>ul>li");
	var $pBan = $("#banner>p>span");
	var $i = 0;
	play();

	function play() {
		$aBan.eq($i).fadeIn(500).siblings().fadeOut(500);
		$pBan.eq($i).css('background', 'red').siblings().css('background', '#fff');
	}
	myPlay();

	function myPlay() {
		setInterval(move, 2000);

		function move() {
			$i++;
			play();
			if ($i > 3) {
				$i = 0;
				play();
			}
		}
	}

	//商品获取部分



	// $('.lis').live('click',function(){
	// 	var $index1= $(this).index();	
	// 	$index=$(this).find("#classID").text();
	// 	console.log($index);
	// 	localStorage.setItem("#classID",$index);
	// 	open("goodsintro.html",'_self');

	// })
	// 	getIntro()

	// //获取商品介绍数据
	// function getIntro(){
	// 	var id1=localStorage.getItem('#classID');
	// 	$.ajax({
	// 	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	// 	dataType:'jsonp',
	// 	data:{goodsID:id1},
	// 	jsonp:'callback',			
	// 	success:function(callback){
	// 		// console.log(res);
	// 	var img_he = $('<img src="'+callback[0].goodsListImg+'"/>');
	// 			img_he.appendTo($('#goods_info_conn > .goodsImg'));

	// 			$('#goods_info_conn .goods_name_1').text('￥'+callback[0].price);
	// 			$('#goods_info_conn .goods_name_2').text(callback[0].goodsName);
	// 			$('#marketprice').find('s').text('￥'+parseInt(callback[0].price/callback[0].discount*10));
	// 			$('#dis').text(callback[0].discount +'折');
	// 			$('#buynum').text(callback[0].buynumber+'人购买');	
	// 		}	
	// 	});
	// }



	//vue.js
	var vm = new Vue({
		el: '#app',
		data: {
			datas: []
		},
		methods: {
			get: function () {
				this.$http.jsonp('http://datainfo.duapp.com/shopdata/getGoods.php').then(function (data) {
					//   console.log(data.body);
					vm.datas = data.body;
					console.log(vm.datas);
				})
				$(".lis").live('click', function () {
					var $index = $(this).find("#classID").text();
					console.log($index);
					localStorage.setItem("#classID", $index);
					open("goodsintro.html", '_self');
				})

			}

		}

	});
	vm.get();

//页面跳转
function pages(){
		$('#foot > ul > li').eq(0).click(function(){
			open('index.html','_self');
		})
		$('#foot > ul > li').eq(1).click(function(){
			open('classify.html','_self');
		})
		$('#foot > ul > li').eq(2).click(function(){
			if(localStorage.getItem('userID')){
				open('mycar.html','_self');
			}
			else{
				open('enter.html','_self');
			}
			
		})
		$('#foot > ul > li').eq(3).click(function(){
			open('myshow.html','_self');
		})
		
		$('#foot > ul > li').eq(4).click(function(){
			if(localStorage.getItem('userID')){
				open('more.html','_self');
			}
			else{
				open('enter.html','_self');
			}
		})
		
		$('#intro_tab > p').eq(0).click(function(){
			open('goodsintro.html','_self');
		})
		$('#intro_tab > p').eq(1).click(function(){
			open('goodsdetails.html','_self');
		})
		$('#intro_tab > p').eq(2).click(function(){
			open('goodsphoto.html','_self');
		})
	}
	pages();
});