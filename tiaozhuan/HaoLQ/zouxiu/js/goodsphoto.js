$(function(){
		
	$('#head button').click(function(){
		open('index.html','_self');
	})

	getPhoto();
	//获取商品实拍数据

})
function getPhoto(){
	var id1 = localStorage.getItem('goodID');
	$.ajax({
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:'jsonp',
	data:{goodsID:id1},
	jsonp:'callback',			
	success:function(callback){
			console.log(callback[0]);			
			var pho = JSON.parse(callback[0].imgsUrl);
			console.log(pho.length)
			for(var i=0;i<pho.length;i++){
				var $phobox = $('<div class="swiper-slide"><img src="'+pho[i]+'"/></div>');
				$phobox.appendTo($('.swiper-container .swiper-wrapper'));
			}
			var mySwiper = new Swiper('.swiper-container', {
					autoplay: 3000,//可选选项，自动滑动
					//pagination : '.swiper-pagination',
				})
		}
		
	
	});			
}