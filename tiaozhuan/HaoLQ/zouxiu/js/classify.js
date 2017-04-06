$(function(){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		success:function(data){
			var arr = JSON.parse(data);
			for(var i=0;i<arr.length;i++){
				var oJiao = $('<span>></span>');
				var oA = $('<a></a>');
				
				oA.text(arr[i].className);
				var aLi = $('<li></li>');
				oJiao.appendTo(aLi);
				oA.appendTo(aLi);
				aLi.appendTo($('#classify_list > ul'));
			}
		}
	});
	
	$('#head button').click(function(){
		open('index.html','_self');
	})
})
