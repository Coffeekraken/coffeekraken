import{a as m,n as y,b as v,d as S,o as _,p as k,c as C}from"./index.esm.js";function w(o,e){Object.assign({},e??{});let t;if(e=window.getComputedStyle(o,"::before"),e.content!=="none")try{t=JSON.parse(JSON.parse(e.content))}catch{}if(!t&&(e=window.getComputedStyle(o,"::after"),e.content))try{t=JSON.parse(JSON.parse(e.content))}catch{}return t??{}}class p extends m{static get _definition(){return{css:{type:"String",description:'Specify the "chunk" css you want to load. This is relative to the "cssChunksBasePath" property and can be a simple id like "welcome" that will resolve to "${cssChunksBasePath}/welcome.css" or directly a path'},cssChunksBasePath:{type:"String",description:"Specify the path where are stored your css chunk files",get default(){return y.get("serve.css.path")+"/chunks"}}}}}var h=globalThis&&globalThis.__awaiter||function(o,e,t,s){return new(t=t||Promise)(function(l,d){function u(a){try{n(s.next(a))}catch(r){d(r)}}function c(a){try{n(s.throw(a))}catch(r){d(r)}}function n(a){var r;a.done?l(a.value):((r=a.value)instanceof t?r:new t(function(f){f(r)})).then(u,c)}n((s=s.apply(o,e||[])).next())})};class i extends v{static registerDeps(e,t={}){S(e,(s,{cancel:l})=>h(this,void 0,void 0,function*(){const d=_(s);document.addEventListener("s-deps.resolved",u=>{u.detail.selector===e&&d.cancel()}),yield d,this.resolvedSelectors.includes(e)||(this.resolvedSelectors.push(e),document.dispatchEvent(new CustomEvent("s-deps.resolved",{detail:{selector:e,$elm:s}})),l(),t=p.apply(t??{}),this._handleDepsForElement(s,t))}))}static _checkAndApplyReadyStateForElement(e,t={}){t.css&&!e._sDepsCssStack||e._sDepsCssStack.length||(e.setAttribute("resolved","true"),e.classList.add("resolved"))}static _handleCssDepsForElement(e,t={}){var s,l;return h(this,void 0,void 0,function*(){var d=t.css.split(",").map(u=>u.trim());for(let[u,c]of(e._sDepsCssStack=d).entries())if(!c.match(/[a-zA-Z0-9_-]+/)||!i._cssFrontData.chunks||(s=(l=i._cssFrontData.chunks).includes)!=null&&s.call(l,c))if(document.querySelector(`link[s-deps-css="${c}"]`))(l=(s=e._sDepsCssStack)==null?void 0:s.splice)!=null&&l.call(s,e._sDepsCssStack.indexOf(c),1),this._checkAndApplyReadyStateForElement(e,t);else{c.match(/\.css$/)||(c+=".css");const n=document.createElement("link");n.setAttribute("rel","stylesheet"),n.setAttribute("s-deps-css",t.css),n.setAttribute("rel","preload"),n.setAttribute("as","style"),n.setAttribute("href",t.cssChunksBasePath+"/"+c),document.head.appendChild(n),k(n).then(()=>{var a,r;n.setAttribute("rel","stylesheet"),(r=(a=e._sDepsCssStack)==null?void 0:a.splice)!=null&&r.call(a,e._sDepsCssStack.indexOf(c),1),this._checkAndApplyReadyStateForElement(e,t)})}})}static _handleDepsForElement(e,t={}){t.css&&this._handleCssDepsForElement(e,t)}constructor(e,t,s){super(e,t,C({name:"s-deps",interface:p},s??{}))}mount(){return h(this,void 0,void 0,function*(){i._handleDepsForElement(this.node,this.props)})}}function D(o={},e="s-deps"){i.define(e,i,Object.assign({},o))}i._cssFrontData=w(document.body),i.resolvedSelectors=[];export{D as default};
