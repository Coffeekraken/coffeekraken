var d=(s,i,o)=>new Promise((a,c)=>{var l=e=>{try{n(o.next(e))}catch(r){c(r)}},t=e=>{try{n(o.throw(e))}catch(r){c(r)}},n=e=>e.done?a(e.value):Promise.resolve(e.value).then(l,t);n((o=o.apply(s,i)).next())});define(["exports"],function(s){"use strict";function i(){return new DOMException("The request is not allowed","NotAllowedError")}var o=function(a){return d(this,null,function*(){try{yield function(c){return d(this,null,function*(){if(navigator.clipboard)return navigator.clipboard.writeText(c);throw i()})}(a)}catch(c){try{yield function(l){return d(this,null,function*(){const t=document.createElement("span"),n=(t.textContent=l,t.style.whiteSpace="pre",t.style.webkitUserSelect="auto",t.style.userSelect="all",document.body.appendChild(t),window.getSelection()),e=window.document.createRange();n.removeAllRanges(),e.selectNode(t),n.addRange(e);let r=!1;try{r=window.document.execCommand("copy")}finally{n.removeAllRanges(),window.document.body.removeChild(t)}if(!r)throw i()})}(a)}catch(l){throw l||c||i()}}})};globalThis&&globalThis.__awaiter,s.copy=function(a){return o(a)}});
