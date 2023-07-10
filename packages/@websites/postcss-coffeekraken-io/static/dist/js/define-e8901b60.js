import{d,E as p,c as h,a as f,b as y,F as b,G as w,H as _}from"./index.esm.js";function g(e){let t=[];var e=e.split(/\s+/);let a="";return e.forEach(o=>{if(o.slice(0,1)=="@")a=o.replace("@","___");else{var r=o.split(":");if(r.length===1){let n=o;a!==""&&(n=o+a),t.push(n)}else{const n=r[0];let l=n;a!==""&&(l=n+a),t.push(l),r.forEach((u,i)=>{0<i&&(l=n+"--"+u,a!==""&&(l+=a),t.push(l))})}}}),(t=(e=(e=document.env)==null?void 0:e.SUGAR)!=null&&e.classmap?t.map(o=>document.env.SUGAR.classmap.resolve(o)):t).join(" ")}function A(s){s=Object.assign({afterFirst:void 0,rootNode:document},s),d('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])',t=>{const e=g(t.getAttribute("class"));p.mutate(()=>{t.setAttribute("class",e)})},{afterFirst:s.afterFirst,rootNode:s==null?void 0:s.rootNode})}function E(s,t){let e="out";return s._viewportEventsInited||(s._viewportEventsInited=!0,t=Object.assign({offset:"25px",once:!1},t??{}),new IntersectionObserver((a,o)=>{a.length&&(0<a.pop().intersectionRatio?e!=="in"&&(e="in",s.dispatchEvent(new CustomEvent("viewport.in",{bubbles:!0})),t!=null)&&t.once&&o.disconnect():e!=="out"&&(e="out",s.dispatchEvent(new CustomEvent("viewport.out",{bubbles:!0}))))},{root:null,rootMargin:t.offset,threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}).observe(s)),s}function L(){"scrollRestoration"in history&&(history.scrollRestoration="manual")}function S(){d("[autofocus]",s=>{var t,e;(e=(t=document.activeElement)==null?void 0:t.blur)!=null&&e.call(t),setTimeout(()=>{s.focus()})})}function R(s={}){function t(a){const o=a.target||a;if(o&&o.tagName)switch(o.tagName){case"INPUT":case"TEXTAREA":case"SELECT":o.type&&(o.type==="checkbox"||o.type==="radio")||p.mutate(()=>{o.value&&!o.hasAttribute("has-value")?(s.hasValue&&o.setAttribute("has-value",!0),s.empty&&o.removeAttribute("empty")):o.value!==void 0&&o.value!==null&&o.value!==""||(s.hasValue&&o.removeAttribute("has-value"),o.removeAttribute("value"),!s.empty)||o.hasAttribute("empty")||o.setAttribute("empty",!0),s.dirty&&!o.hasAttribute("dirty")&&o.value&&o.setAttribute("dirty",!0)})}}function e(a){[].forEach.call(a.target.elements,o=>{t(o),a.type!=="submit"&&o.removeAttribute("dirty")})}s=Object.assign({empty:!0,hasValue:!0,dirty:!0},s),d('select, textarea, input:not([type="submit"])',a=>{t(a)}),document.addEventListener("change",t),document.addEventListener("keyup",t),document.addEventListener("reset",e),document.addEventListener("submit",e)}function T(s={}){function t(e){e&&p.mutate(()=>{e.getAttribute("href")===document.location.pathname?(e.setAttribute("actual",!0),e.parentNode.setAttribute("actual-parent",!0),e.dispatchEvent(new CustomEvent("actual",{bubbles:!0}))):document.location.pathname!=="/"&&e.getAttribute("href").startsWith(document.location.pathname)?(e.removeAttribute("actual"),e.setAttribute("actual-child",!0),e.dispatchEvent(new CustomEvent("actual",{bubbles:!0}))):(e.removeAttribute("actual"),e.removeAttribute("actual-child"),e.parentNode.removeAttribute("actual-parent"))})}s=h({},s),d("a[href]",e=>{t(e),setTimeout(()=>{t(e)},500)}),window.addEventListener("locationchange",()=>{Array.from(document.querySelectorAll("a[href]")).forEach(e=>{t(e)})}),window.addEventListener("popstate",()=>{Array.from(document.querySelectorAll("a[href]")).forEach(e=>{t(e)})}),window.addEventListener("pushstate",()=>{Array.from(document.querySelectorAll("a[href]")).forEach(e=>{t(e)})})}class z extends f{static get _definition(){return{pleasantCss:{description:'Specify if you want the "pleasant css" syntax in your pages',type:"Boolean",default:!0},autofocus:{description:'Specify if you want the "autofocus" to work on your page',type:"Boolean",default:!0},viewportAware:{description:'Specify if you want the "viewport-aware" attribute to be enabled or not. If true, the elements that have this attribute will dispatch the "viewport.enter" and "viewport.exit" events as well as have the "in-viewport" class and attribute',type:"Boolean",default:!0},containerQuery:{description:"Specify if you want support for container queries in your css or not",type:"Boolean",default:!0},scrollClasses:{description:"Specify if you want the scroll classes to be applied on the `body` element when the page has been scrolled",type:"Boolean",default:!0},scrolledDelta:{description:"Specify after how many scroll the scrolled class will be applied",type:"Number",default:200},vhvar:{description:"Specify if you want the `--vh` css variable to be computed and available",type:"Boolean",default:!0},autoResize:{description:"Specify if you want the auto resize to be enabled",type:"Boolean",default:!0},confirmBtn:{description:'Specify if you want the "confirm button" feature to be enabled',type:"Boolean",default:!0},inputAdditionalAttributes:{description:'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',type:"Boolean",default:!0},resizeTransmations:{description:"Specify if you want all the transitions and animations cleared during window resize",type:"Boolean",default:!0},linksStateAttributes:{description:'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',type:"Boolean",default:!0},preventScrollRestoration:{description:"Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",type:"Boolean",default:!0},env:{description:"Specify if you want to display the current environment at start",type:"Boolean",default:!0}}}}var C=globalThis&&globalThis.__awaiter||function(s,t,e,a){return new(e=e||Promise)(function(o,r){function n(i){try{u(a.next(i))}catch(c){r(c)}}function l(i){try{u(a.throw(i))}catch(c){r(c)}}function u(i){var c;i.done?o(i.value):((c=i.value)instanceof e?c:new e(function(v){v(c)})).then(n,l)}u((a=a.apply(s,t||[])).next())})},B=function(s){var t=history[s];return function(...e){var a=t.apply(this,arguments),o=new CustomEvent(s.toLowerCase(),{bubbles:!0,detail:e[0]});return window.dispatchEvent(o),a}};history.pushState=B("pushState");class m extends y{constructor(t,e,a){super(t,e,h({name:"s-sugar",interface:z},a??{})),this._isResizing=!1}mount(){return C(this,void 0,void 0,function*(){this.props.pleasantCss&&this._pleasantCss(),this.props.autofocus&&this._autofocus(),this.props.viewportAware&&this._viewportAware(),this.props.scrollClasses&&this._scrollClasses(),this.props.vhvar&&this._vhvar(),this.props.autoResize&&this._autoResize(),this.props.confirmBtn&&this._confirmBtn(),this.props.resizeTransmations&&this._clearTransmationsOnResize(),this.props.inputAdditionalAttributes&&R(),this.props.linksStateAttributes&&T(),this.props.preventScrollRestoration&&L(),document.readyState!=="complete"?document.addEventListener("readystatechange",()=>{document.readyState==="complete"&&(document.body.classList.remove("initial-loading"),document.body.classList.remove("loading"))}):(document.body.classList.remove("initial-loading"),document.body.classList.remove("loading"))})}_clearTransmationsOnResize(){let t;window.addEventListener("resize",()=>{this._isResizing||(t=b()),this._isResizing=!0,clearTimeout(this._clearTransmationsOnResizeTimeout),this._clearTransmationsOnResizeTimeout=setTimeout(()=>{this._isResizing=!1,t!=null&&t()},100)})}_pleasantCss(){A({afterFirst(){setTimeout(()=>{document.body.classList.remove("initial-loading"),document.body.classList.remove("loading")},500)}})}_viewportAware(){d("[viewport-aware]",t=>{E(t),t.addEventListener("viewport.enter",()=>{t.setAttribute("in-viewport","true"),t.classList.add("in-viewport")}),t.addEventListener("viewport.exit",()=>{t.removeAttribute("in-viewport"),t.classList.remove("in-viewport")})})}_autofocus(){S()}_scrollClasses(){let t=0,e=0,a,o;document.addEventListener("scroll",r=>{window.scrollY>=this.props.scrolledDelta?document.body.classList.contains("scrolled")||document.body.classList.add("scrolled"):document.body.classList.contains("scrolled")&&document.body.classList.remove("scrolled"),o=window.scrollY>e?"down":"up",window.scrollX>t?a="right":window.scrollX<=t&&(a="left"),t=window.scrollX,e=window.scrollY,o==="up"?(document.body.classList.remove("scroll-down"),document.body.classList.add("scroll-up")):(document.body.classList.remove("scroll-up"),document.body.classList.add("scroll-down")),a==="left"?(document.body.classList.remove("scroll-right"),document.body.classList.add("scroll-left")):a==="right"&&(document.body.classList.remove("scroll-left"),document.body.classList.add("scroll-right"))})}_vhvar(){let t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",t+"px"),window.addEventListener("resize",()=>{t=.01*window.innerHeight,document.documentElement.style.setProperty("--vh",t+"px")})}_autoResize(){w()}_confirmBtn(){_()}}function F(s={},t="s-sugar"){m.define(t,m,Object.assign({mountWhen:"direct"},s))}export{F as default};
