window.onload = function(){
	//字体变化
	font_size();
	window.onresize = function(){
		font_size();
	}
	
	//页面跳转
	pages();
	
	
	//商品搜索
	$('#search input').keyup(function(){
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
			dataType:'jsonp',
			data:{selectText:$('#search input').val()},
			jsonp:'callback',
			success:function(callback){
				console.log(callback);
				var $searchList = $('#search ul');
				$searchList.show();
				for(var i=0;i<callback.length;i++){
					var goodID = $('<span></span>');
					goodID.text(callback[i].goodsID);
					var aLi = $('<li></li>');
					
					aLi.text(callback[i].goodsName);
					goodID.appendTo(aLi);
					aLi.appendTo($searchList);
				}
				goIntro();
			}
		})
	})
	
	$('body').click(function(){
		$('#search ul').hide();
	})
	
	//商品搜索跳转
	function goIntro(){
		$('#search ul li').click(function(){
			$('#search ul').hide();
			var $index = $(this).index();
			localStorage.setItem('goodID',$(this).find('span').text());
			open('goodsintro.html','_self');
		})
	}
	
	
	//加入购物车
	var $goodsList = $('#goodsList >ul >li');
	var $goodsID = 0;
	var $goodsName = '';
	var $number = 1;
	for(var i=0;i<$goodsList.length;i++){		
		$goodsList.eq(i).find('.goods_conn').find('button').click(function(ev){
			ev.stopPropagation();
			if(localStorage.getItem('userID')){
				var $index = $(this).parent().parent().index();
				$goodsID = $goodsList.eq($index).find('.goodsID').text();
				getCar($goodsID,$number);
			}
			else{
				open('enter.html','_self');
			}
			
		})
		
	}
			
	//删除购物车商品
	var $mycarList = $('#mycar_list >ul >li');
	for(var i=0;i<$mycarList.length;i++){
		$mycarList.eq(i).find('.delete').click(function(){
			$number = 0;
			var $index = $(this).parent().index();
			$goodsID = $mycarList.eq($index).find('.goodsID').text();			
			getCar($goodsID,$number);
			$mycarList.eq($index).css('display','none');
			open('mycar.html','_self');
		})
	}
	
	
	
	//查看商品介绍
	$goodsList.click(function(){
		var $index1 = $(this).index();		
		$goodsID = $(this).find('.goodsID').text();
		localStorage.setItem('goodID',$goodsID);
		open('goodsintro.html','_self');
		
	})
	getIntro();
	getDetails();
	
	
}

//获取商品介绍数据
function getIntro(){
	var id1 = localStorage.getItem('goodID');
	$.ajax({
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:'jsonp',
	data:{goodsID:id1},
	jsonp:'callback',			
	success:function(callback){
		console.log(callback);
			var img_he = $('<img src="'+callback[0].goodsListImg+'"/>');
			img_he.appendTo($('#goods_info_conn > .goodsImg'));
			
			$('#goods_info_conn .goods_name_1').text('￥'+callback[0].price);
			$('#goods_info_conn .goods_name_2').text(callback[0].goodsName);
			$('#marketprice').find('s').text('￥'+parseInt(callback[0].price/callback[0].discount*10));
			$('#dis').text(callback[0].discount +'折');
			$('#buynum').text(callback[0].buynumber+'人购买');			
		}	
	});
}

//获取商品详情数据

function getDetails(){
	var id1 = localStorage.getItem('goodID');
	$.ajax({
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:'jsonp',
	data:{goodsID:id1},
	jsonp:'callback',			
	success:function(callback){
			var img_he = $('<img src="'+JSON.parse(callback[0].goodsBenUrl)[0]+'"/>');
			img_he.appendTo($('#goods_details > .details_img'));
			$('#goods_details .details_text p').text(callback[0].detail);
			
		}
	
	});
}



//加入购物车

function getCar($goodsID,$number){
	$.get(
		'http://datainfo.duapp.com/shopdata/updatecar.php',
		getInfo($goodsID,$number),
		function(data){
			console.log(data);		
		}
	)
}

function getInfo($goodsID,$number){
	var obj1 = {
		userID:localStorage.getItem('userID'),
		goodsID:$goodsID,
		number:$number
	}
	return obj1;
}


//字体大小变化
function font_size(){
	var screenWid = document.body.clientWidth/1440;		
	var nowFont = screenWid*0.625;
	var oHtml = document.getElementsByTagName("html")[0];
	oHtml.style.fontSize = 100*nowFont + "%";
}


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