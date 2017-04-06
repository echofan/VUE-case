$(function(){
	$('.coupon_tab  p').click(function(){
		console.log('111')
		var $index = $(this).index();
		$(this).addClass('red').siblings().removeClass('red');
		$('.coupon_conn').eq($index).show().siblings().hide();
		
	})
	
	$('#head button').click(function(){
		open('myshow.html','_self');
	})
})
