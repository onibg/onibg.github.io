importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

workbox.routing.registerRoute(
 ({request})=>request.destination==='script'||
              request.destination==='style'||
              request.destination===''||//for XMLHttpRequest()
              request.destination==='image'
 ,new workbox.strategies.NetworkFirst({cacheName:'others'})
//,new workbox.strategies.CacheFirst()//cacheName:預設
)

workbox.routing.registerRoute(
 ({request})=>request.destination==='document'
 ,new workbox.strategies.CacheFirst({cacheName:'tmp-cache'})
)
//附上刪除tmp-cache的寫法
//caches.delete('tmp-cache')

/*var cacheFiles=[
  "test.json",
  //{url:'./index.html',revision:'00000001'}// 加revision，版本改了以後，sw.js 在 application 上會更新
]
workbox.precaching.precacheAndRoute(cacheFiles)*/