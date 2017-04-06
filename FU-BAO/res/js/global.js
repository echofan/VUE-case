define(function(require,exports,module){
    //站点所有的请求url
    $.CONFIG={
         AJAX:'http://app.api.gupiaoxianji.com/v3.7'
    }
    $.func={
         ajax:function(param,fn){
             var url=$.CONFIG.AJAX;
             $.ajax({
                 url:url,
                 type:"POST",
                 contentType:"application/json",
                 dataType:'json',
                 data:JSON.stringify(param),
                 success:function(res){
                      $.isFunction(fn)&&fn(res);
                 },
                 error:function(res){
                      console.log(res);
                 },
                 async:false
             });
         }
    }


});