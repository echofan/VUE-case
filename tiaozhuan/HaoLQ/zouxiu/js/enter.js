$(function(){

	$('#sub1').click(function(){
		if($('#name').val()!="" && $('#pwd').val()!=""){
			submitUser();
		}		
	})
	$('#sub2').click(function(){
		location.href="login.html";   
	})
	$('#head button').click(function(){
		open('myshow.html','_self');
	})
})



function submitUser(){
	$.get(
		"http://datainfo.duapp.com/shopdata/userinfo.php",
		getUser(),
		function(data){
			console.log(data);
			if(isNaN(Number(data))){
				var info = JSON.parse(data);
				localStorage.setItem('userID',info.userID);
				localStorage.setItem('password',info.password);
				window.location.assign("index.html");	
			}
		}
	)
}

function getUser(){
	var obj1 = {
		status:'login',
		userID:$('#name').val(),
		password:$('#pwd').val()
	}
	return obj1;
}
