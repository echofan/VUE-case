 define(function (require, exports, module) {
  
   var Action = {
     click: function () {
       $(".content").on('click', function () {
         //  alert(123);
         location.href = "./detail.html";
       });
     },
     //获取员工列表
     getPublic: function () {
       console.log(123);
       var param = {
         "jsonrpc": "2.0",
         "method": "Product.Clubber",
         "id": 54321,
         "params": {}  
       };
       $.func.ajax(param, function (res) {
         console.log(res);
         var result = res.result.data;
         console.log(result);
         var listInfo = result;
         var info = {
           list: listInfo
         }
         console.log(info);
         var html = template('templateId', info);
         document.querySelector('.container').innerHTML = html;
       })
     },
     init: function () {
       var that = this;
       this.click();
       this.getPublic();
     }

   }
   module.exports = Action;
 });