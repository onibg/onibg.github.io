var oldHref,thisDiv,folderId,folderIdScrollTop={}
//callback()
oldHref=location.href;folderId=oldHref.split('/').reverse()[0].split('?')[0]
  let divArr=document.getElementsByClassName('a-s-tb-sc-Ja a-s-tb-Pe Kt-ru a-s-tb-sc-Ja-fk')
  thisDiv=divArr[divArr.length-1]
  console.log(thisDiv)
  thisDiv.onscroll=function(){folderIdScrollTop[folderId]=this.scrollTop}
  thisDiv.scrollTop=folderIdScrollTop[folderId]
//callback()

var observer=new MutationObserver(callback)
observer.observe(document.querySelector('div'),{childList:true,subtree:true,attributes:true})
function callback(mutations){
 if(location.href!=oldHref){
  oldHref=location.href;folderId=oldHref.split('/').reverse()[0].split('?')[0]
  let divArr=document.getElementsByClassName('a-s-tb-sc-Ja a-s-tb-Pe Kt-ru a-s-tb-sc-Ja-fk')
  thisDiv=divArr[divArr.length-1]
  //console.log(thisDiv)
  thisDiv.onscroll=function(){folderIdScrollTop[folderId]=4000}//this.scrollTop}
  setTimeout(function(){thisDiv.scrollTop=folderIdScrollTop[folderId]},2000)}
//id=init-spinner-container

 //if(mutations[0].target.getAttribute('id')=='init-spinner-container'){console.log(1);thisDiv.scrollTop=folderIdScrollTop[folderId]}
 if(mutations[0].target.getAttribute('class')=='a-s-tb-sc-Ja a-N-Pf-Ja a-s-tb-sc-Ja-J')
 {console.log(1);thisDiv.scrollTop=folderIdScrollTop[folderId]}
}
