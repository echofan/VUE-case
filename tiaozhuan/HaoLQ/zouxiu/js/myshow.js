$(function(){
	var $head = $('.per_head').height();
	$('.per_head').width($head);
	
	if(localStorage.getItem('userID')){
		$('.per_name >.per_name_2').text(localStorage.getItem('userID'));
		$('.per_sub').css('display','none');
	}
})
