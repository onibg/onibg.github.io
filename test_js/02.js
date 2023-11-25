var http=require('http'),request=require('request')
var message="startTime:"+new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei'})
var at
http.createServer(function(req,res){//console.log(req.url.slice(1))
 if(req.url=="/"){res.writeHead(200,{'content-type':'text/plain;charset=utf-8','access-control-allow-origin':'*'});res.end(message);return}
 if(req.url=="/favicon.ico"){res.end();return}
//var url='https://www.googleapis.com/drive/v3/files/1FKykPP_mW76YMuJjw_0HfGObqXPusMbl?alt=media'//廖怡超
var url='https://www.googleapis.com/drive/v3/files'+req.url+'?alt=media'
handle()
function handle(){
 var y=req.pipe(request({uri:url,gzip:true,headers:{Authorization:"Bearer "+at}})//codesandbox回傳的html竟是有壓縮的gzip，預設request無法解gzip，故需設gzip:true，且要在.on('data'拿資料
              //.on('error',function(err){res.writeHead(200,{'content-type':'text/plain;charset=utf-8'});res.end('錯誤：'+err.toString())})
                .on('response',function(response){
                                if(response.statusCode==401){console.log('發生401執行getOAuthToken()');getOAuthToken()}
                                else{
                                     console.log('response.statusCode:'+response.statusCode)
                                   //response.headers['content-type']='video/mp4'
                                     delete response.headers['content-disposition']
                                   //以上強制指定為video/mp4(如：mkv檔的時候)，並移除下載功能
                                     y.pipe(res)
                                    }
                                                 })
               )
 req.on("close",function(){y.abort()})//重要！當前端關閉請求，pipe(res)應馬上終止，以免消耗資源！
}//handle()

function getOAuthToken(){
 request("https://script.google.com/macros/s/AKfycbycE4b8P4Uzyn3Za6XGh3SjmiqgasrPSjVYTKq7nSg1stw7ISo/exec?at",//檔案上傳系統miinmail@gm.ahjh.tc.edu.tw
//request("https://script.google.com/macros/s/AKfycbyvoe-m_ioAQYgI4ExbNp2ImBOFMLiDth-lBPyABNAGelcOoMqf/exec",//delicadiesel@gmail.com的getOAuthToken(Google Apps Script)'
//request("https://script.google.com/macros/s/AKfycbyJxjKHbAZxG3f2IoN0IS_ieIU8N5KBhrx0LwPVvXjcM-JgUMvI/exec",//惠文
 function(error,response,body){
  console.error('error:',error)
  console.log('statusCode:',response&&response.statusCode)
  console.log('body:',body);at=body
  handle()
 })
}
                                   }).listen(8080)