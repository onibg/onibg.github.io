if(typeof(Number.prototype.toRad)==="undefined"){
 Number.prototype.toRad=function(){
  return this * Math.PI/180
 }
}
const {execFile}=require('child_process')
var i=0,arr=new Array(6)
execFile('termux-wake-lock')
execFile('termux-volume',['music','15'])
execFile('termux-location',['-r','updates'])
execFile('termux-location',['-r','once'],(error,stdout,stderr)=>{
 console.log('定位完成')
 execFile('termux-tts-speak',['定位完成'])
 go()
})

function go(){
 putArr(i)
 i++;if(i==6){i=0};setTimeout(go,10000)
}

function putArr(j){
 execFile('termux-location',['-r','last'],(error,stdout,stderr)=>{
  arr[j]=JSON.parse(stdout)
  if(j==5){play(arr)}
 })
}

getDistance=function(start,end){
 var earthRadius=6371000//m
 lat1=parseFloat(start.latitude)
 lat2=parseFloat(end.latitude)
 lon1=parseFloat(start.longitude)
 lon2=parseFloat(end.longitude)
 var dLat=(lat2-lat1).toRad()
 var dLon=(lon2-lon1).toRad()
 var lat1=lat1.toRad()
 var lat2=lat2.toRad()
 var a=Math.sin(dLat/2)*Math.sin(dLat/2)+
       Math.sin(dLon/2)*Math.sin(dLon/2)*Math.cos(lat1)*Math.cos(lat2)
 var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1 - a))
 return earthRadius*c
}

function play(arr05){
 var D=0,V
 for(let i=0;i<5;i++)
 {D+=getDistance(arr05[i],arr05[i+1])}
 console.log(new Date().toLocaleTimeString(),'距離'+D+'公尺')
 if(D==0){V='無限大'}else{
  V=1000/D
  V=parseInt(V)+'分'+Math.round(60*(V-parseInt(V)))+'秒'
 }
 execFile('termux-tts-speak',['距離'+parseInt(D)+'公尺，速度每公里'+V])
}

//var l1={latitude:24,longitude:120}
//var l2={latitude:24.01,longitude:120.01}
//console.log(getDistance(l1,l2))

