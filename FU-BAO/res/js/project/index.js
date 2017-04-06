

   function AutoScroll(obj){ 
              $(obj).find("ul:first").animate({ 
                 marginTop:"-70px" 
              },150,function(){ 
                 $(this).css({marginTop:"0px"}).find("li:first").appendTo(this); 
              }); 
            } 
                 $(document).ready(function(){ 
              setInterval('AutoScroll(".marquee")',2000); 
       });
       