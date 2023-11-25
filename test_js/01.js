var https=require('https')
function sheet(str,url)//https及location處理，送str到資料庫
{
 if(!url){
 url='https://script.google.com/macros/s/AKfycbzZpqyC1-JloaMML4KtCb5ru_FqTtefMNZmNVBcWA/exec?console='+
     encodeURI(str)
         }
 https.get(url,
 function(response){
  if(response.headers.location){sheet(str,response.headers.location)}
                   }).on('error',function(){
                                            setTimeout(function(){sheet(str+',script錯誤')},10000)
                                           })
}

setInterval(function(){
https.get('https://gdid.glitch.me/',{headers:{"user-agent":"X"}}
,function(res){
res.on("data",function(chunk){

if(chunk.toString().indexOf('Maintenance')==-1){
sheet(new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei'})+chunk.toString())
}else{sheet(new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei'})+'Maintenance')}

})
})
},10000)


