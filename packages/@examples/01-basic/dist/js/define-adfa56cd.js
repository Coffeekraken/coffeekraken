import{_ as f,a as w,b as I,c as L,d as g,S as q,e as U,f as B}from"./index.esm.js";function k(s){let t=[];var s=s.split(/\s+/);let e="";return s.forEach(n=>{if(n.slice(0,1)=="@")e=n.replace("@","_");else{var i=n.split(":");if(i.length===1){let l=n;e!==""&&(l=n+e),t.push(l)}else{const l=i[0];let c=l;e!==""&&(c=l+e),t.push(c),i.forEach((u,r)=>{0<r&&(c=l+"-"+u,e!==""&&(c+=e),t.push(c))})}}}),(t=(s=(s=document.env)==null?void 0:s.SUGAR)!=null&&s.classmap?t.map(n=>document.env.SUGAR.classmap.resolve(n)):t).join(" ")}function O(o){o=Object.assign({afterFirst:void 0,rootNode:document},o),f('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])',t=>{const s=k(t.getAttribute("class"));w.mutate(()=>{t.setAttribute("class",s)})},{afterFirst:o.afterFirst,rootNode:o==null?void 0:o.rootNode})}function P(o,t){let s="out";return o._viewportEventsInited||(o._viewportEventsInited=!0,t=Object.assign({offset:"25px",once:!1},t??{}),new IntersectionObserver((e,n)=>{e.length&&(0<e.pop().intersectionRatio?s!=="in"&&(s="in",o.dispatchEvent(new CustomEvent("viewport.in",{bubbles:!0})),t!=null)&&t.once&&n.disconnect():s!=="out"&&(s="out",o.dispatchEvent(new CustomEvent("viewport.out",{bubbles:!0}))))},{root:null,rootMargin:t.offset,threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}).observe(o)),o}function N(o){o.style.boxSizing="border-box";var t=o.offsetHeight-o.clientHeight;o.addEventListener("input",function(s){s.target.style.height="auto",s.target.style.height=s.target.scrollHeight+t+"px"})}function j(){"scrollRestoration"in history&&(history.scrollRestoration="manual")}function F(){f("[autofocus]",o=>{var t,s;(s=(t=document.activeElement)==null?void 0:t.blur)!=null&&s.call(t),setTimeout(()=>{o.focus()})})}var H=globalThis&&globalThis.__awaiter||function(o,t,s,e){return new(s=s||Promise)(function(n,i){function l(r){try{u(e.next(r))}catch(a){i(a)}}function c(r){try{u(e.throw(r))}catch(a){i(a)}}function u(r){var a;r.done?n(r.value):((a=r.value)instanceof s?a:new s(function(p){p(a)})).then(l,c)}u((e=e.apply(o,t||[])).next())})};function $(){f("[auto-resize]",o=>H(this,void 0,void 0,function*(){N(o)}))}var X=globalThis&&globalThis.__awaiter||function(o,t,s,e){return new(s=s||Promise)(function(n,i){function l(r){try{u(e.next(r))}catch(a){i(a)}}function c(r){try{u(e.throw(r))}catch(a){i(a)}}function u(r){var a;r.done?n(r.value):((a=r.value)instanceof s?a:new s(function(p){p(a)})).then(l,c)}u((e=e.apply(o,t||[])).next())})};function D(){f("[confirm]",o=>X(this,void 0,void 0,function*(){if(o.needConfirmation===void 0){o._isConfirmedStatus=void 0,o.needConfirmation=!0,yield I(100);const t=window.getComputedStyle(o),s=t.width,e=window.getComputedStyle(o,":after"),n=parseInt(e.width)+10+"px";o.style.setProperty("--s-btn-confirm-width",s),o.addEventListener("pointerdown",i=>{o._isConfirmedStatus===void 0?(o._isConfirmedStatus=!1,o.style.setProperty("--s-btn-confirm-width",n)):o._isConfirmedStatus===!1&&(setTimeout(()=>{o.style.setProperty("--s-btn-confirm-width",s)},100),o._isConfirmedStatus=!0,o.needConfirmation=!1)}),o.addEventListener("blur",i=>{setTimeout(()=>{o.style.setProperty("--s-btn-confirm-width",s)},100),o._isConfirmedStatus=void 0}),o.addEventListener("pointerup",i=>{setTimeout(()=>{o._isConfirmedStatus===!0&&(o.blur(),o._isConfirmedStatus=void 0,o.needConfirmation=!0)})})}}))}function G(o={}){function t(e){const n=e.target||e;if(n&&n.tagName)switch(n.tagName){case"INPUT":case"TEXTAREA":case"SELECT":n.type&&(n.type==="checkbox"||n.type==="radio")||w.mutate(()=>{n.value&&!n.hasAttribute("has-value")?(o.hasValue&&n.setAttribute("has-value",!0),o.empty&&n.removeAttribute("empty")):n.value!==void 0&&n.value!==null&&n.value!==""||(o.hasValue&&n.removeAttribute("has-value"),n.removeAttribute("value"),!o.empty)||n.hasAttribute("empty")||n.setAttribute("empty",!0),o.dirty&&!n.hasAttribute("dirty")&&n.value&&n.setAttribute("dirty",!0)})}}function s(e){[].forEach.call(e.target.elements,n=>{t(n),e.type!=="submit"&&n.removeAttribute("dirty")})}o=Object.assign({empty:!0,hasValue:!0,dirty:!0},o),f('select, textarea, input:not([type="submit"])',e=>{t(e)}),document.addEventListener("change",t),document.addEventListener("keyup",t),document.addEventListener("reset",s),document.addEventListener("submit",s)}function V(o={}){function t(s){s&&w.mutate(()=>{s.getAttribute("href")===document.location.pathname?(s.setAttribute("actual",!0),s.parentNode.setAttribute("actual-parent",!0),s.dispatchEvent(new CustomEvent("actual",{bubbles:!0}))):document.location.pathname!=="/"&&s.getAttribute("href").startsWith(document.location.pathname)?(s.removeAttribute("actual"),s.setAttribute("actual-child",!0),s.dispatchEvent(new CustomEvent("actual",{bubbles:!0}))):(s.removeAttribute("actual"),s.removeAttribute("actual-child"),s.parentNode.removeAttribute("actual-parent"))})}o=L({},o),f("a[href]",s=>{t(s),setTimeout(()=>{t(s)},500)}),window.addEventListener("locationchange",()=>{Array.from(document.querySelectorAll("a[href]")).forEach(s=>{t(s)})}),window.addEventListener("popstate",()=>{Array.from(document.querySelectorAll("a[href]")).forEach(s=>{t(s)})}),window.addEventListener("pushstate",()=>{Array.from(document.querySelectorAll("a[href]")).forEach(s=>{t(s)})})}var W,Y=function(o,t){if(t=t.split(":")[0],!(o=+o))return!1;switch(t){case"http":case"ws":return o!==80;case"https":case"wss":return o!==443;case"ftp":return o!==21;case"gopher":return o!==70;case"file":return!1}return o!==0},v={},Z=Object.prototype.hasOwnProperty;function _(o){try{return decodeURIComponent(o.replace(/\+/g," "))}catch{return null}}function C(o){try{return encodeURIComponent(o)}catch{return null}}function M(o){for(var t=/([^=?#&]+)=?([^&]*)/g,s={};n=t.exec(o);){var e=_(n[1]),n=_(n[2]);e===null||n===null||e in s||(s[e]=n)}return s}function Q(o,t){var s,e,n=[];for(e in typeof(t=t||"")!="string"&&(t="?"),o)Z.call(o,e)&&((s=o[e])||s!==null&&s!==W&&!isNaN(s)||(s=""),e=C(e),s=C(s),e!==null)&&s!==null&&n.push(e+"="+s);return n.length?t+n.join("&"):""}v.stringify=Q,v.parse=M;var E=Y,m=v,J=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,R=/[\n\r\t]/g,K=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,x=/:\d+$/,tt=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,et=/^[a-zA-Z]:/;function b(o){return(o||"").toString().replace(J,"")}var y=[["#","hash"],["?","query"],function(o,t){return d(t.protocol)?o.replace(/\\/g,"/"):o},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],S={hash:1,query:1};function T(o){var t,e=typeof window<"u"?window:g!==void 0?g:typeof self<"u"?self:{},e=e.location||{},s={},e=typeof(o=o||e);if(o.protocol==="blob:")s=new h(unescape(o.pathname),{});else if(e=="string")for(t in s=new h(o,{}),S)delete s[t];else if(e=="object"){for(t in o)t in S||(s[t]=o[t]);s.slashes===void 0&&(s.slashes=K.test(o.href))}return s}function d(o){return o==="file:"||o==="ftp:"||o==="http:"||o==="https:"||o==="ws:"||o==="wss:"}function z(e,t){e=(e=b(e)).replace(R,""),t=t||{};var s,e=tt.exec(e),n=e[1]?e[1].toLowerCase():"",i=!!e[2],l=!!e[3],c=0;return i?c=l?(s=e[2]+e[3]+e[4],e[2].length+e[3].length):(s=e[2]+e[4],e[2].length):l?(s=e[3]+e[4],c=e[3].length):s=e[4],n==="file:"?2<=c&&(s=s.slice(2)):d(n)?s=e[4]:n?i&&(s=s.slice(2)):2<=c&&d(t.protocol)&&(s=e[4]),{protocol:n,slashes:i||d(n),slashesCount:c,rest:s}}function ot(o,t){if(o==="")return t;for(var s=(t||"/").split("/").slice(0,-1).concat(o.split("/")),e=s.length,t=s[e-1],n=!1,i=0;e--;)s[e]==="."?s.splice(e,1):s[e]===".."?(s.splice(e,1),i++):i&&(e===0&&(n=!0),s.splice(e,1),i--);return n&&s.unshift(""),t!=="."&&t!==".."||s.push(""),s.join("/")}function h(o,t,s){if(o=(o=b(o)).replace(R,""),!(this instanceof h))return new h(o,t,s);var e,n,i,l,c,u=y.slice(),r=typeof t,a=this,p=0;for(r!="object"&&r!="string"&&(s=t,t=null),s&&typeof s!="function"&&(s=m.parse),e=!(r=z(o||"",t=T(t))).protocol&&!r.slashes,a.slashes=r.slashes||e&&t.slashes,a.protocol=r.protocol||t.protocol||"",o=r.rest,(r.protocol==="file:"&&(r.slashesCount!==2||et.test(o))||!r.slashes&&(r.protocol||r.slashesCount<2||!d(a.protocol)))&&(u[3]=[/(.*)/,"pathname"]);p<u.length;p++)typeof(i=u[p])=="function"?o=i(o,a):(n=i[0],c=i[1],n!=n?a[c]=o:typeof n=="string"?~(l=n==="@"?o.lastIndexOf(n):o.indexOf(n))&&(o=typeof i[2]=="number"?(a[c]=o.slice(0,l),o.slice(l+i[2])):(a[c]=o.slice(l),o.slice(0,l))):(l=n.exec(o))&&(a[c]=l[1],o=o.slice(0,l.index)),a[c]=a[c]||e&&i[3]&&t[c]||"",i[4]&&(a[c]=a[c].toLowerCase()));s&&(a.query=s(a.query)),e&&t.slashes&&a.pathname.charAt(0)!=="/"&&(a.pathname!==""||t.pathname!=="")&&(a.pathname=ot(a.pathname,t.pathname)),a.pathname.charAt(0)!=="/"&&d(a.protocol)&&(a.pathname="/"+a.pathname),E(a.port,a.protocol)||(a.host=a.hostname,a.port=""),a.username=a.password="",a.auth&&(~(l=a.auth.indexOf(":"))?(a.username=a.auth.slice(0,l),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=a.auth.slice(l+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(a.auth)),a.auth=a.password?a.username+":"+a.password:a.username),a.origin=a.protocol!=="file:"&&d(a.protocol)&&a.host?a.protocol+"//"+a.host:"null",a.href=a.toString()}function st(o,t,s){var e=this;switch(o){case"query":typeof t=="string"&&t.length&&(t=(s||m.parse)(t)),e[o]=t;break;case"port":e[o]=t,E(t,e.protocol)?t&&(e.host=e.hostname+":"+t):(e.host=e.hostname,e[o]="");break;case"hostname":e[o]=t,e.port&&(t+=":"+e.port),e.host=t;break;case"host":e[o]=t,x.test(t)?(t=t.split(":"),e.port=t.pop(),e.hostname=t.join(":")):(e.hostname=t,e.port="");break;case"protocol":e.protocol=t.toLowerCase(),e.slashes=!s;break;case"pathname":case"hash":t?(n=o==="pathname"?"/":"#",e[o]=t.charAt(0)!==n?n+t:t):e[o]=t;break;case"username":case"password":e[o]=encodeURIComponent(t);break;case"auth":var n=t.indexOf(":");~n?(e.username=t.slice(0,n),e.username=encodeURIComponent(decodeURIComponent(e.username)),e.password=t.slice(n+1),e.password=encodeURIComponent(decodeURIComponent(e.password))):e.username=encodeURIComponent(decodeURIComponent(t))}for(var i=0;i<y.length;i++){var l=y[i];l[4]&&(e[l[1]]=e[l[1]].toLowerCase())}return e.auth=e.password?e.username+":"+e.password:e.username,e.origin=e.protocol!=="file:"&&d(e.protocol)&&e.host?e.protocol+"//"+e.host:"null",e.href=e.toString(),e}function nt(o){o&&typeof o=="function"||(o=m.stringify);var t=this,s=t.host,e=t.protocol,e=(e&&e.charAt(e.length-1)!==":"&&(e+=":"),e+(t.protocol&&t.slashes||d(t.protocol)?"//":""));return t.username?(e+=t.username,t.password&&(e+=":"+t.password),e+="@"):t.password?e=e+(":"+t.password)+"@":t.protocol!=="file:"&&d(t.protocol)&&!s&&t.pathname!=="/"&&(e+="@"),(s[s.length-1]===":"||x.test(t.hostname)&&!t.port)&&(s+=":"),e+=s+t.pathname,(s=typeof t.query=="object"?o(t.query):t.query)&&(e+=s.charAt(0)!=="?"?"?"+s:s),t.hash&&(e+=t.hash),e}h.prototype={set:st,toString:nt},h.extractProtocol=z,h.location=T,h.trimLeft=b,h.qs=m;class at extends q{static get _definition(){return{pleasantCss:{description:'Specify if you want the "pleasant css" syntax in your pages',type:"Boolean",default:!0},autofocus:{description:'Specify if you want the "autofocus" to work on your page',type:"Boolean",default:!0},viewportAware:{description:'Specify if you want the "viewport-aware" attribute to be enabled or not. If true, the elements that have this attribute will dispatch the "viewport.enter" and "viewport.exit" events as well as have the "in-viewport" class and attribute',type:"Boolean",default:!0},containerQuery:{description:"Specify if you want support for container queries in your css or not",type:"Boolean",default:!0},scrollClasses:{description:"Specify if you want the scroll classes to be applied on the `body` element when the page has been scrolled",type:"Boolean",default:!0},scrolledDelta:{description:"Specify after how many scroll the scrolled class will be applied",type:"Number",default:200},vhvar:{description:"Specify if you want the `--vh` css variable to be computed and available",type:"Boolean",default:!0},autoResize:{description:"Specify if you want the auto resize to be enabled",type:"Boolean",default:!0},confirmBtn:{description:'Specify if you want the "confirm button" feature to be enabled',type:"Boolean",default:!0},inputAdditionalAttributes:{description:'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',type:"Boolean",default:!0},resizeTransmations:{description:"Specify if you want all the transitions and animations cleared during window resize",type:"Boolean",default:!0},linksStateAttributes:{description:'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',type:"Boolean",default:!0},preventScrollRestoration:{description:"Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",type:"Boolean",default:!0},env:{description:"Specify if you want to display the current environment at start",type:"Boolean",default:!0}}}}var rt=globalThis&&globalThis.__awaiter||function(o,t,s,e){return new(s=s||Promise)(function(n,i){function l(r){try{u(e.next(r))}catch(a){i(a)}}function c(r){try{u(e.throw(r))}catch(a){i(a)}}function u(r){var a;r.done?n(r.value):((a=r.value)instanceof s?a:new s(function(p){p(a)})).then(l,c)}u((e=e.apply(o,t||[])).next())})},it=function(o){var t=history[o];return function(...s){var e=t.apply(this,arguments),n=new CustomEvent(o.toLowerCase(),{bubbles:!0,detail:s[0]});return window.dispatchEvent(n),e}};history.pushState=it("pushState");class A extends U{constructor(t,s,e){super(t,s,L({name:"s-sugar",interface:at},e??{})),this._isResizing=!1}mount(){return rt(this,void 0,void 0,function*(){this.props.pleasantCss&&this._pleasantCss(),this.props.autofocus&&this._autofocus(),this.props.viewportAware&&this._viewportAware(),this.props.scrollClasses&&this._scrollClasses(),this.props.vhvar&&this._vhvar(),this.props.autoResize&&this._autoResize(),this.props.confirmBtn&&this._confirmBtn(),this.props.resizeTransmations&&this._clearTransmationsOnResize(),this.props.inputAdditionalAttributes&&G(),this.props.linksStateAttributes&&V(),this.props.preventScrollRestoration&&j(),document.readyState!=="complete"?document.addEventListener("readystatechange",()=>{document.readyState==="complete"&&(document.body.classList.remove("initial-loading"),document.body.classList.remove("loading"))}):(document.body.classList.remove("initial-loading"),document.body.classList.remove("loading"))})}_clearTransmationsOnResize(){let t;window.addEventListener("resize",()=>{this._isResizing||(t=B()),this._isResizing=!0,clearTimeout(this._clearTransmationsOnResizeTimeout),this._clearTransmationsOnResizeTimeout=setTimeout(()=>{this._isResizing=!1,t!=null&&t()},100)})}_pleasantCss(){O({afterFirst(){setTimeout(()=>{document.body.classList.remove("initial-loading"),document.body.classList.remove("loading")},500)}})}_viewportAware(){f("[viewport-aware]",t=>{P(t),t.addEventListener("viewport.enter",()=>{t.setAttribute("in-viewport","true"),t.classList.add("in-viewport")}),t.addEventListener("viewport.exit",()=>{t.removeAttribute("in-viewport"),t.classList.remove("in-viewport")})})}_autofocus(){F()}_scrollClasses(){let t=0,s=0,e,n;document.addEventListener("scroll",i=>{window.scrollY>=this.props.scrolledDelta?document.body.classList.contains("scrolled")||document.body.classList.add("scrolled"):document.body.classList.contains("scrolled")&&document.body.classList.remove("scrolled"),n=window.scrollY>s?"down":"up",window.scrollX>t?e="right":window.scrollX<=t&&(e="left"),t=window.scrollX,s=window.scrollY,n==="up"?(document.body.classList.remove("scroll-down"),document.body.classList.add("scroll-up")):(document.body.classList.remove("scroll-up"),document.body.classList.add("scroll-down")),e==="left"?(document.body.classList.remove("scroll-right"),document.body.classList.add("scroll-left")):e==="right"&&(document.body.classList.remove("scroll-left"),document.body.classList.add("scroll-right"))})}_vhvar(){let t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",t+"px"),window.addEventListener("resize",()=>{t=.01*window.innerHeight,document.documentElement.style.setProperty("--vh",t+"px")})}_autoResize(){$()}_confirmBtn(){D()}}function ct(o={},t="s-sugar"){A.define(t,A,Object.assign({mountWhen:"direct"},o))}export{ct as default};
