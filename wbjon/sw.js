importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js')

workbox.routing.registerRoute(
//({url})=>url.pathname.startsWith('/MOTC/')
 new RegExp('.*format=JSON$'),//上行會導致讀取單車3借還車會緩存，故改此行
 new workbox.strategies.NetworkFirst({cacheName:'NetworkFirst'})
)

workbox.routing.registerRoute(
 new RegExp('https://call\\.oa\\.repl\\.co/[1-2]$'),
 new workbox.strategies.NetworkFirst({cacheName:'NetworkFirst'})
)

workbox.routing.registerRoute(
 ({request})=>(request.destination==='manifest'||
               request.destination==='style'||
               request.destination==='script'||
               request.destination==='document'&&
              !request.url.includes('/install.html'))
             //request.destination===''//for XMLHttpRequest()
 ,new workbox.strategies.CacheFirst({cacheName:'CacheFirst'})
)
/*workbox.routing.registerRoute(
 ({request})=>{if(request.url.endsWith('/install.html')){return false}
               return(request.destination==='document'||
                      request.destination==='style'||
                      request.destination==='script'||
                      request.destination==='manifest')
 },new workbox.strategies.CacheFirst({cacheName:'CacheFirst'})
)*/
workbox.routing.registerRoute(
 new RegExp('^(?!.*numaps).*\\.png$'),//結尾是.png但不包含numaps
 new workbox.strategies.CacheFirst({cacheName:'CacheFirst',
                                    plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]})]//0代表不透明響應
                                   })
)

workbox.routing.registerRoute(//針對某一mjpg檔，將每個響應206轉為200，多個tiles快取
 new RegExp('.+&z.+'),
 new workbox.strategies.CacheFirst({cacheName:'tiles',
                                    plugins:[{cacheWillUpdate:async({response})=>{
                                                                                  if(response&&response.status===206){
                                                                                   const newResponse=new Response(response.body,{status:200,headers:new Headers({'Content-Type':'image/jpeg'})})
                                                                                   return newResponse}
                                                                                 //return response//此行註解，避免503或其他錯誤被快取
                                                                                 }}]})
)

workbox.routing.registerRoute(//針對某一mjpg檔，整個單一mjpg檔快取(要先請求此mjpg檔全部，可利用install.html)
 new RegExp('.+&all$'),
 new workbox.strategies.CacheFirst({cacheName:'mjpg',
                                    plugins:[new workbox.rangeRequests.RangeRequestsPlugin()]//可以range request(206)
                                  })
)
