!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("riot"),require("@coffeekraken/s-request"),require("@coffeekraken/s-interface"),require("@coffeekraken/s-component-utils"),require("uuid"),require("@coffeekraken/s-cache"),require("chalk"),require("copy-to"),require("cli-highlight"),require("json-cyclic")):"function"==typeof define&&define.amd?define(["riot","@coffeekraken/s-request","@coffeekraken/s-interface","@coffeekraken/s-component-utils","uuid","@coffeekraken/s-cache","chalk","copy-to","cli-highlight","json-cyclic"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).riot,e.__SRequest,e.__SInterface,e.__SComponentUtils,e.uuid,e.__SCache,e.__chalk,e.__copyTo,e.cliHighlight,e.jsonCyclic)}(this,(function(e,t,r,n,o,i,s,c,a,u){"use strict";function f(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function l(e){if(e&&e.__esModule)return e;var t={__proto__:null,[Symbol.toStringTag]:"Module"};return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var h=l(e),p=f(t),d=f(r),y=f(n),g=f(i),w=f(s),v=f(c);class b extends d.default{}b.definition={method:{type:"String",values:["get","post"],default:"get"},url:{type:"String",required:!0},trigger:{type:"String",values:["event"],default:"event"},on:{type:"String"},cache:{type:"String|Boolean",default:!1}};var m="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function _(e){if(e.__esModule)return e;var t=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})})),t}var j,O={exports:{}},S={exports:{}},x=new Proxy({},{get(){throw new Error('Module "crypto" has been externalized for browser compatibility and cannot be accessed in client code.')}}),k=_(Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:x}));S.exports=j=j||function(e,t){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&void 0!==m&&m.crypto&&(r=m.crypto),!r&&"function"==typeof require)try{r=k}catch(y){}var n=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(y){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(y){}}throw new Error("Native crypto module could not be used to get secure random number.")},o=Object.create||function(){function e(){}return function(t){var r;return e.prototype=t,r=new e,e.prototype=null,r}}(),i={},s=i.lib={},c=s.Base={extend:function(e){var t=o(this);return e&&t.mixIn(e),t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},a=s.WordArray=c.extend({init:function(e,r){e=this.words=e||[],this.sigBytes=r!=t?r:4*e.length},toString:function(e){return(e||f).stringify(this)},concat:function(e){var t=this.words,r=e.words,n=this.sigBytes,o=e.sigBytes;if(this.clamp(),n%4)for(var i=0;i<o;i++){var s=r[i>>>2]>>>24-i%4*8&255;t[n+i>>>2]|=s<<24-(n+i)%4*8}else for(i=0;i<o;i+=4)t[n+i>>>2]=r[i>>>2];return this.sigBytes+=o,this},clamp:function(){var t=this.words,r=this.sigBytes;t[r>>>2]&=4294967295<<32-r%4*8,t.length=e.ceil(r/4)},clone:function(){var e=c.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var t=[],r=0;r<e;r+=4)t.push(n());return new a.init(t,e)}}),u=i.enc={},f=u.Hex={stringify:function(e){for(var t=e.words,r=e.sigBytes,n=[],o=0;o<r;o++){var i=t[o>>>2]>>>24-o%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,r=[],n=0;n<t;n+=2)r[n>>>3]|=parseInt(e.substr(n,2),16)<<24-n%8*4;return new a.init(r,t/2)}},l=u.Latin1={stringify:function(e){for(var t=e.words,r=e.sigBytes,n=[],o=0;o<r;o++){var i=t[o>>>2]>>>24-o%4*8&255;n.push(String.fromCharCode(i))}return n.join("")},parse:function(e){for(var t=e.length,r=[],n=0;n<t;n++)r[n>>>2]|=(255&e.charCodeAt(n))<<24-n%4*8;return new a.init(r,t)}},h=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(l.stringify(e)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(e){return l.parse(unescape(encodeURIComponent(e)))}},p=s.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=h.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var r,n=this._data,o=n.words,i=n.sigBytes,s=this.blockSize,c=i/(4*s),u=(c=t?e.ceil(c):e.max((0|c)-this._minBufferSize,0))*s,f=e.min(4*u,i);if(u){for(var l=0;l<u;l+=s)this._doProcessBlock(o,l);r=o.splice(0,u),n.sigBytes-=f}return new a.init(r,f)},clone:function(){var e=c.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});s.Hasher=p.extend({cfg:c.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){p.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function(e){return function(t,r){return new d.HMAC.init(e,r).finalize(t)}}});var d=i.algo={};return i}(Math),function(e,t){e.exports=function(e){return function(t){var r=e,n=r.lib,o=n.WordArray,i=n.Hasher,s=r.algo,c=[];!function(){for(var e=0;e<64;e++)c[e]=4294967296*t.abs(t.sin(e+1))|0}();var a=s.MD5=i.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var r=0;r<16;r++){var n=t+r,o=e[n];e[n]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8)}var i=this._hash.words,s=e[t+0],a=e[t+1],p=e[t+2],d=e[t+3],y=e[t+4],g=e[t+5],w=e[t+6],v=e[t+7],b=e[t+8],m=e[t+9],_=e[t+10],j=e[t+11],O=e[t+12],S=e[t+13],x=e[t+14],k=e[t+15],q=i[0],B=i[1],M=i[2],P=i[3];q=u(q,B,M,P,s,7,c[0]),P=u(P,q,B,M,a,12,c[1]),M=u(M,P,q,B,p,17,c[2]),B=u(B,M,P,q,d,22,c[3]),q=u(q,B,M,P,y,7,c[4]),P=u(P,q,B,M,g,12,c[5]),M=u(M,P,q,B,w,17,c[6]),B=u(B,M,P,q,v,22,c[7]),q=u(q,B,M,P,b,7,c[8]),P=u(P,q,B,M,m,12,c[9]),M=u(M,P,q,B,_,17,c[10]),B=u(B,M,P,q,j,22,c[11]),q=u(q,B,M,P,O,7,c[12]),P=u(P,q,B,M,S,12,c[13]),M=u(M,P,q,B,x,17,c[14]),q=f(q,B=u(B,M,P,q,k,22,c[15]),M,P,a,5,c[16]),P=f(P,q,B,M,w,9,c[17]),M=f(M,P,q,B,j,14,c[18]),B=f(B,M,P,q,s,20,c[19]),q=f(q,B,M,P,g,5,c[20]),P=f(P,q,B,M,_,9,c[21]),M=f(M,P,q,B,k,14,c[22]),B=f(B,M,P,q,y,20,c[23]),q=f(q,B,M,P,m,5,c[24]),P=f(P,q,B,M,x,9,c[25]),M=f(M,P,q,B,d,14,c[26]),B=f(B,M,P,q,b,20,c[27]),q=f(q,B,M,P,S,5,c[28]),P=f(P,q,B,M,p,9,c[29]),M=f(M,P,q,B,v,14,c[30]),q=l(q,B=f(B,M,P,q,O,20,c[31]),M,P,g,4,c[32]),P=l(P,q,B,M,b,11,c[33]),M=l(M,P,q,B,j,16,c[34]),B=l(B,M,P,q,x,23,c[35]),q=l(q,B,M,P,a,4,c[36]),P=l(P,q,B,M,y,11,c[37]),M=l(M,P,q,B,v,16,c[38]),B=l(B,M,P,q,_,23,c[39]),q=l(q,B,M,P,S,4,c[40]),P=l(P,q,B,M,s,11,c[41]),M=l(M,P,q,B,d,16,c[42]),B=l(B,M,P,q,w,23,c[43]),q=l(q,B,M,P,m,4,c[44]),P=l(P,q,B,M,O,11,c[45]),M=l(M,P,q,B,k,16,c[46]),q=h(q,B=l(B,M,P,q,p,23,c[47]),M,P,s,6,c[48]),P=h(P,q,B,M,v,10,c[49]),M=h(M,P,q,B,x,15,c[50]),B=h(B,M,P,q,g,21,c[51]),q=h(q,B,M,P,O,6,c[52]),P=h(P,q,B,M,d,10,c[53]),M=h(M,P,q,B,_,15,c[54]),B=h(B,M,P,q,a,21,c[55]),q=h(q,B,M,P,b,6,c[56]),P=h(P,q,B,M,k,10,c[57]),M=h(M,P,q,B,w,15,c[58]),B=h(B,M,P,q,S,21,c[59]),q=h(q,B,M,P,y,6,c[60]),P=h(P,q,B,M,j,10,c[61]),M=h(M,P,q,B,p,15,c[62]),B=h(B,M,P,q,m,21,c[63]),i[0]=i[0]+q|0,i[1]=i[1]+B|0,i[2]=i[2]+M|0,i[3]=i[3]+P|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,o=8*e.sigBytes;r[o>>>5]|=128<<24-o%32;var i=t.floor(n/4294967296),s=n;r[15+(o+64>>>9<<4)]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),r[14+(o+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),e.sigBytes=4*(r.length+1),this._process();for(var c=this._hash,a=c.words,u=0;u<4;u++){var f=a[u];a[u]=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8)}return c},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});function u(e,t,r,n,o,i,s){var c=e+(t&r|~t&n)+o+s;return(c<<i|c>>>32-i)+t}function f(e,t,r,n,o,i,s){var c=e+(t&n|r&~n)+o+s;return(c<<i|c>>>32-i)+t}function l(e,t,r,n,o,i,s){var c=e+(t^r^n)+o+s;return(c<<i|c>>>32-i)+t}function h(e,t,r,n,o,i,s){var c=e+(r^(t|~n))+o+s;return(c<<i|c>>>32-i)+t}r.MD5=i._createHelper(a),r.HmacMD5=i._createHmacHelper(a)}(Math),e.MD5}(S.exports)}(O);var q=O.exports;function B(e){return!!e&&("object"==typeof e&&((!e.constructor||"Object"===e.constructor.name)&&("[object Object]"===Object.prototype.toString.call(e)&&e===Object(e))))}function M(e){const t=e.concat();for(let r=0;r<t.length;++r)for(let e=r+1;e<t.length;++e)t[r]===t[e]&&t.splice(e--,1);return t}function P(...e){const t={array:!1,object:!0};function r(e,n){const o={};if(!e&&n)return n;if(!n&&e)return e;if(!e&&!n)return{};v.default(e).override(o);for(const i of Object.keys(n))if(!0===t.array&&Array.isArray(e[i])&&Array.isArray(n[i])){const t=M([...e[i],...n[i]]);o[i]=t}else!0===t.object&&B(e[i])&&B(n[i])?o[i]=r(e[i],n[i]):v.default(n).pick(i).toCover(o);return o}const n=e[e.length-1]||{};(n.array&&"boolean"==typeof n.array||n.object&&"boolean"==typeof n.object)&&(void 0!==n.array&&(t.array=n.array),void 0!==n.object&&(t.object=n.object),e.pop());let o={};for(let i=0;i<e.length;i++){o=r(o,e[i]||{})}return o}function A(e,t,r={},n=[]){r=P({classInstances:!1,array:!0,privateProps:!1,cloneFirst:!0},r);const o=Array.isArray(e),i=o?[]:r.cloneFirst?Object.assign({},e):e;return Object.keys(e).forEach((s=>{if(!r.privateProps&&s.match(/^_/))return;if(B(e[s])||(c=e[s])&&"object"==typeof c&&(!c.constructor||"Object"!==c.constructor.name)&&"[object Object]"!==Object.prototype.toString.call(c)&&c.constructor!==Object&&r.classInstances||Array.isArray(e[s])&&r.array){const c=A(e[s],t,r,[...n,s]);return void(o?i.push(c):i[s]=c)}var c;const a=t({object:e,prop:s,value:e[s],path:[...n,s].join(".")});-1!==a?o?i.push(a):i[s]=a:delete e[s]})),i}function E(e){const t={};for(let[r,n]of e)t[r]=n;return t}function T(e,t={}){if(t=P({beautify:!0,highlight:!0,verbose:!0,theme:{number:w.default.yellow,default:w.default.white,keyword:w.default.blue,regexp:w.default.red,string:w.default.whiteBright,class:w.default.yellow,function:w.default.yellow,comment:w.default.gray,variable:w.default.red,attr:w.default.green}},t),"string"==typeof e)return e;if(null===e)return"null";if(void 0===e)return"undefined";if(e instanceof Error){const r=e.toString();let n=e.stack;const o=e.message;return t.verbose?[`<red>${e.constructor.name||"Error"}</red>`,"",o,"",n].join("\n"):r}if(function(e){return e instanceof Map}(e)&&(e=E(e)),function(e){return e&&"object"==typeof e&&e.constructor===Object}(e)||function(e){return e&&"object"==typeof e&&e.constructor===Array}(e)||function(e){try{const t=JSON.parse(e);return!!Object.keys(t).length}catch(t){return!1}return!0}(e)){try{e=u.decycle(e)}catch(n){}e=A(e,(({value:e})=>e instanceof Map?E(e):e));let r=JSON.stringify(e,null,t.beautify?4:0);return r=r.replace(/"([^"]+)":/g,"$1:").replace(/\uFFFF/g,'\\"'),t.highlight&&(r=a.highlight(r,{language:"js",theme:t.theme})),r}if(function(e){return"boolean"==typeof e}(e))return e?"true":"false";if(function(e){return e&&"[object Function]"==={}.toString.call(e)}(e))return""+e;let r="";try{e=u.decycle(e),r=JSON.stringify(e,null,t.beautify?4:0)}catch(n){try{r=e.toString()}catch(o){r=e}}return r}const C={};var H=function(e){"string"!=typeof e&&(e=T(e));const t=q(e).toString();return C[t]=e,t};const z={css:'s-request,[is="s-request"]{ display: none; }',exports:{_inlineProxyObj:void 0,async onBeforeMount(){this.component=new y.default(this.root,this.props,{interface:b});const e=this.root.querySelector("script");if(e){const t=o.v4();let r=e.innerText.trim();r=r.replace(/^export default /,`window['s-request-script-${t}'] = `);const n=document.createElement("script");n.text=r,e.parentNode.insertBefore(n,e),e.remove(),this._inlineProxyObj=window[`s-request-script-${t}`]}switch(this.component.props.cache&&(this._cache=new g.default("s-request")),this.component.props.trigger){case"event":if(!this.component.props.on)throw new Error(`<red>[s-request${this.root.id?`#${this.root.id}`:""}]</red> When using the trigger "event", you MUST specify the "<yellow>on</yellow>" property to tell the component which event to listen to`);if(!this.component.$targets.length)throw new Error(`<red>[s-request${this.root.id?`#${this.root.id}`:""}]</red> When using the trigger "event", you MUST specify the "<yellow>target</yellow>" property to tell the component which other HTMLElement to listen to`);this.component.addTargetsEventListener(this.component.props.on,(async e=>{const t=Object.assign({},e.detail);delete t.onPing,delete t.onResolve;return await this._request(t)}))}},async _request(e){var t,r,n;let o={type:null!=(t=this.component.props.type)?t:"get",url:this.component.props.url,data:e,headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}};(null==(r=this._inlineProxyObj)?void 0:r.request)&&(o=this._inlineProxyObj.request(o));const i=H(o),s=new p.default(o);let c=await s.send();for(let u=0;u<2;u++)try{!1!==this.component.props.cache&&await this._cache.set(i,c.data,{ttl:"string"==typeof this.component.props.cache?this.component.props.cache:-1});break}catch(a){this._cache.clear()}return(null==(n=this._inlineProxyObj)?void 0:n.response)&&(c=this._inlineProxyObj.response(c)),c},onMounted(){}},template:null,name:"s-request"};h.register("s-request",z),setTimeout((()=>{h.mount("s-request")})),z.mount=()=>{h.mount("s-request")},window.env||(window.env={SUGAR:{}}),window.env.SUGAR=JSON.parse('{"ENVIRONMENT":"development"}')}));
