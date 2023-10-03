import{p as M,S,e as _,c as T,q as A,z as N,A as E}from"./index.esm.js";function b(n){let t,e;var r=new Promise((i,a)=>{n.hasAttribute("src")&&n.complete?i(n):(t=s=>{i(n)},n.addEventListener("load",t),e=s=>{a(s)},n.addEventListener("error",e))});return r.finally(()=>{t&&n.removeEventListener("load",t),e&&n.removeEventListener("error",e)}),r}function $(n){return new M(({resolve:t,reject:e,emit:r})=>{const i=[],a=[];Array.from(n).forEach(s=>{i.push(b(s).then(l=>{a.push(l),r("loaded",l),a.length===n.length&&t(a)}).catch(l=>{e(l)}))})})}function m(n){if(n&&n.constructor===Array){var t,e=n.filter(function(r){return typeof r=="number"}).filter(function(r){return!isNaN(r)});if(n.length===6&&e.length===6)return(t=p())[0]=e[0],t[1]=e[1],t[4]=e[2],t[5]=e[3],t[12]=e[4],t[13]=e[5],t;if(n.length===16&&e.length===16)return n}throw new TypeError("Expected a `number[]` with length 6 or 16.")}function C(n){if(typeof n=="string"){var t=n.match(/matrix(3d)?\(([^)]+)\)/);if(t)return m(t[2].split(",").map(parseFloat));if(n==="none"||n==="")return p()}throw new TypeError("Expected a string containing `matrix()` or `matrix3d()")}function p(){for(var n=[],t=0;t<16;t++)n.push(t%5==0?1:0);return n}function f(n,t){for(var e=m(n),r=m(t),i=[],a=0;a<4;a++)for(var s=[e[a],e[a+4],e[a+8],e[a+12]],l=0;l<4;l++){var u=4*l,o=[r[u],r[1+u],r[2+u],r[3+u]];i[a+u]=s[0]*o[0]+s[1]*o[1]+s[2]*o[2]+s[3]*o[3]}return i}function d(t){var t=Math.PI/180*t,e=p();return e[5]=e[10]=Math.cos(t),e[6]=e[9]=Math.sin(t),e[9]*=-1,e}function v(t){var t=Math.PI/180*t,e=p();return e[0]=e[10]=Math.cos(t),e[2]=e[8]=Math.sin(t),e[2]*=-1,e}function x(t){var t=Math.PI/180*t,e=p();return e[0]=e[5]=Math.cos(t),e[1]=e[4]=Math.sin(t),e[4]*=-1,e}function y(n){return"matrix3d("+m(n).join(", ")+")"}function g(n,t,e){var r=p();return n!==void 0&&t!==void 0&&e!==void 0&&(r[12]=n,r[13]=t,r[14]=e),r}class I{get matrix(){var t;return(t=this._tmpMatrix)!=null?t:C(this.matrixStr)}get matrixStr(){return window.getComputedStyle(this.$elm).transform}constructor(t){this.$elm=t}simulateTransform(a){var e=g((e=a.translateX)!=null?e:0,(e=a.translateY)!=null?e:0,(e=a.translateZ)!=null?e:0),r=d((r=a.rotateX)!=null?r:0),i=v((i=a.rotateY)!=null?i:0),a=x((a=a.rotateZ)!=null?a:0);let s=this.matrix;return s=[s,e,r,i,a].reduce(f),e=this.getTranslates(s),r=this.getRotates(s),{translateX:e.x,translateY:e.y,translateZ:e.z,rotateX:r.x,rotateY:r.y,rotateZ:r.z,matrix:y(s)}}applyMatrix(...t){var e;let r=(e=this._tmpMatrix)!=null?e:this.matrix;return t.forEach(i=>{r=f(r,i)}),this._tmpMatrix=r,setTimeout(()=>{this.$elm.style.transform=y(r),this._tmpMatrix=null}),this}overrideMatrix(t){return this._tmpMatrix=t,setTimeout(()=>{this.$elm.style.transform=y(t),this._tmpMatrix=null}),this}getTranslates(t=this.matrix){return{x:isNaN(t[12])?0:t[12],y:isNaN(t[13])?0:t[13],z:isNaN(t[14])?0:t[14]}}getRotates(s=this.matrix){var s=s.toString().split(","),e=Math.PI,r=parseFloat(s[8]),r=Math.round(180*Math.asin(r)/e),i=Math.cos(r*e/180),a=parseFloat(s[9]),a=Math.round(180*Math.asin(-a/i)/e),s=parseFloat(s[0]);return{x:a,y:r,z:Math.round(180*Math.acos(s/i)/e)}}setTranslate(t,e,r){var i=this.matrix;return t!==void 0&&(i[12]=t),e!==void 0&&(i[13]=e),r!==void 0&&(i[14]=r),this.overrideMatrix(i)}translate(t,e,r){return t=g(t??0,e??0,r??0),this.applyMatrix(t)}rotate(t,e,r){return t=d(t??0),e=v(e??0),r=x(r??0),this.applyMatrix(t,e,r)}setRotate(t,e,r){var i=[d(t??0),d(e??0),d(r??0)].reduce(f),a=this.matrix;return t!==void 0&&(a[5]=i[5],a[6]=i[6],a[9]=i[9]),e!==void 0&&(a[0]=i[0],a[2]=i[2]),r!==void 0&&(a[0]=i[0],a[1]=i[1],a[4]=i[4]),this.overrideMatrix(a)}}class F extends S{static get _definition(){return{in:{description:"Specify the animation you want to use to display your element",type:"String",default:"bottom",physical:!0},out:{description:"Specify the animation you want to use to hide your item",type:"String",physical:!0},delay:{description:"Specify a delay before animation in or out your element. Can be an array of two number that define the min delay and the max delay. The real delay will be random between these two numbers",type:{type:"Array<Number>",splitChars:[","]},default:[500]},duration:{description:"Specify the duration of the animation in ms. Can be an array of two number that define the min delay and the max duration. The real duration will be random between these two numbers",type:{type:"Array<Number>",splitChars:[","]},default:[500]},distance:{description:'Specify the distance that your element will move if you have set an "in" direction. Can be an array of two number that define the min delay and the max distance. The real duration will be random between these two numbers',type:{type:"Array<Number>",splitChars:[","]},default:[100,120]},appear:{description:"Specify if the element has to appear. This is usually setted automatically when needed",type:"Boolean",default:!1,physical:!0}}}}const L="";var P=globalThis&&globalThis.__awaiter||function(n,t,e,r){return new(e=e||Promise)(function(i,a){function s(o){try{u(r.next(o))}catch(h){a(h)}}function l(o){try{u(r.throw(o))}catch(h){a(h)}}function u(o){var h;o.done?i(o.value):((h=o.value)instanceof e?h:new e(function(c){c(h)})).then(s,l)}u((r=r.apply(n,t||[])).next())})};class w extends _{constructor(t,e,r){super(t,e,T({name:"s-appear",interface:F,style:L},r??{})),this.node.hasAttribute("s-appear")||this.node.setAttribute("s-appear","true")}mount(){return P(this,void 0,void 0,function*(){var t;this.node.tagName.toLowerCase()==="img"?yield b(this.node):(t=this.node.querySelectorAll("img")).length&&(yield $(t)),this.appear()})}appear(){const t=A();let e=this.props.delay[0];var r,i;this.props.delay.length===2&&(r=this.props.delay[0],i=this.props.delay[1],e=r+(i-r)*Math.random());let a=this.props.duration[0],s=(this.props.duration.length===2&&(i=this.props.duration[0],r=this.props.duration[1],a=i+(r-i)*Math.random()),this.props.distance[0]);this.props.distance.length===2&&(r=this.props.distance[0],i=this.props.distance[1],s=r+(i-r)*Math.random());const l=new I(this.node);setTimeout(()=>{this.props.appear=!0;let u=0,o=0;switch(this.props.in){case"top":o=-1*s;break;case"bottom":o=s;break;case"left":u=-1*s;break;case"right":u=s}var h=l.simulateTransform({translateX:u,translateY:o}),h=`
                @keyframes s-appear-${t} {
                    from {
                        transform: ${h.matrix};
                        opacity: 0;
                    }
                    to {
                        transform: ${l.matrixStr};
                        opacity: 1;
                    }
                }
                [s-appear-id="${t}"] {
                    animation: s-appear-${t} ${a/1e3}s ${N.get("easing.default")} forwards;
                }
            `;const c=E(h);this.node.setAttribute("s-appear-id",t),setTimeout(()=>{this.node.removeAttribute("s-appear-id"),c.remove()},a)},e)}}function Y(n={},t="s-appear"){w.define(t,w,Object.assign({mountWhen:"entersViewport"},n))}export{Y as default};
