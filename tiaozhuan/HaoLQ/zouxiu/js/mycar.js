$(function(){
			
	//获取购物车数据	
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		dataType:'jsonp',
		data:{userID:localStorage.getItem('userID')},
		jsonp:'callback',
		success:function(data){
			$('.wait').fadeOut();
			for(var i=0;i<data.length;i++){
				var oGoodsImg = $('<p class="goodsImg"><img src="'+data[i].goodsListImg+'"/></p>');				
		
				var oGoodsName = $('<p></p>');
				oGoodsName.text(data[i].goodsName);
				oGoodsName.addClass('goodsName');
				
				var oPrice_1 = $('<span></span');
				oPrice_1.text('单价：');
				var oB = $('<b></b>');
				oB.text(data[i].price);
				var oRed = $('<span></span');
				oRed.addClass('red');
				oB.appendTo(oRed);
				var goods_price = $('<p></p>');
				goods_price.addClass('goods_price');
				oPrice_1.appendTo(goods_price);
				oRed.appendTo(goods_price);
				
				var goodNum_1 = $('<span></span');
				goodNum_1.text('数量：');
				var numchange = $('<span></span>');
				numchange.addClass('numchange');
				var reducenum = $('<span></span>');
				reducenum.addClass('reducenum');
				reducenum.text('-');
				var num = $('<span></span>');
				num.addClass('num');
				num.text(data[i].number);
				var addnum = $('<span></span>');
				addnum.addClass('addnum');
				addnum.text('+');
				reducenum.appendTo(numchange);
				num.appendTo(numchange);
				addnum.appendTo(numchange);
				var goodsNum = $('<p></p>');
				goodsNum.addClass('goodsNum');
				goodNum_1.appendTo(goodsNum);
				numchange.appendTo(goodsNum);
				
				var goods_info = $('<div></div>');
				goods_info.addClass('goods_info');
				
				oGoodsName.appendTo(goods_info);
				goods_price.appendTo(goods_info);
				goodsNum.appendTo(goods_info);
				
				var oButton = $('<button class="delete"><img src="img/del.jpg" /> </button>');
				
				var goodsID = $('<span></span');
				goodsID.addClass('goodsID');
				goodsID.text(data[i].goodsID);
				
				var aList = $('<li></li>');
				oGoodsImg.appendTo(aList);
				goods_info.appendTo(aList);
				oButton.appendTo(aList);
				goodsID.appendTo(aList);
				aList.appendTo('#mycar_list >ul');
				var goodsImgH = oGoodsImg.height();
				oGoodsImg.width(goodsImgH);
			}
			goodNum();
		}
	});
	
	//商品数量	
	function goodNum(){
		
		//商品列表
		var $mycarList = $('#mycar_list >ul >li');
		//总价格容器
		var $goodPrice = $('#search .goodsPrice').find('span');
		//每种商品的数量
		var arr = [];
		//每种商品的价格
		var arr1 = [];
		
		var allcount = $mycarList.length;
		if(allcount > 0){
				$('#search').css('display','block');
				$('#mycar_list').css('display','block');
				$('#emptyCar').css('display','none');
				}
			else{
				$('#search').css('display','none');
				$('#mycar_list').css('display','none');
				$('#emptyCar').css('display','block');
			}
		//总价
		var allPrice = 0;
		//单价
		var bPrice = 0;
		for(var i=0;i<$mycarList.length;i++){
			arr[i] = 1;	
			arr1[i] = $mycarList.eq(i).find('.goods_price').find('b').text();
			var $index = 0;
			numchan();
			$mycarList.eq(i).find('.addnum').click(function(){				
				$index = $(this).parent().parent().parent().parent().index();
				arr[$index]++;
												
				numchan();				
			})
			$mycarList.eq(i).find('.reducenum').click(function(){				
				$index = $(this).parent().parent().parent().parent().index();
				arr[$index]--;
				if(arr[$index]<1){
					arr[$index] = 1;
				}
				numchan();			
			})			
			function numchan(){
				$bPrice = $mycarList.eq($index).find('.goods_price').find('b').text();
				arr1[$index] = $bPrice * arr[$index]; 
				$mycarList.eq($index).find('.num').text(arr[$index]);
				allcount = eval(arr.join('+'));
				allPrice = eval(arr1.join('+'));
				$('#search .goodsNum').find('span').text(allcount);	
				$('#search .goodsPrice').find('span').text('￥'+allPrice);	
			}						
		}		
	}
	
	$('#emptyCar button').click(function(){
		open('index.html','_self');
	})
	
})
