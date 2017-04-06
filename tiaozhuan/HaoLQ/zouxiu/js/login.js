$(function(){		
	
	$('.enter').click(function(){
		open('enter.html','_self');
	})
	
	$('#name').blur(name);
	$('#pwd').blur(pwd);
	$('#pwd2').blur(pwd2);
	
	$('#sub').click(function(){
		if(Textform()){
			submitUser();
			
		}		
	})	
	
	$('#head button').click(function(){
		open('myshow.html','_self');
	})
})
function name(){
	var re = /^\w{6,20}$/;
	if(re.test($('#name').val())){
		$('#name').parent().removeClass('wrong');
		return true;
	}
	else{
		$('#name').parent().addClass('wrong');
		return false;
	}
}

function pwd(){
	var re = /^\w{6,40}$/;
	if(re.test($('#pwd').val())){
		$('#pwd').parent().removeClass('wrong');
		return true;
	}
	else{
		$('#pwd').parent().addClass('wrong');
		return false;
	}
}
function pwd2(){
	if($('#pwd').val() == $('#pwd2').val()){
		$('#pwd2').parent().removeClass('wrong');
		return true;
	}
	else{
		$('#pwd2').parent().addClass('wrong');
		return false;
	}
}

function Textform(){
	if(name()&&pwd()&&pwd2()){
		return true;
	}
	else{
		return false;
	}
}

function submitUser(){
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",
			getUser(),
			function(data){
				console.log(data);
				if(data==1){
					window.location.assign("enter.html");	
				}
				
			}
	)
}

function getUser(){
	var obj = {
		status:"register",
		userID:$("#name").val(),
		password:$("#pwd").val()		
	}
	return obj;
}
