import{a as h,b as m,c as g}from"./index.esm.js";class v extends h{static get _definition(){return{}}}var w=globalThis&&globalThis.__awaiter||function(a,t,e,n){return new(e=e||Promise)(function(l,o){function u(i){try{s(n.next(i))}catch(r){o(r)}}function f(i){try{s(n.throw(i))}catch(r){o(r)}}function s(i){var r;i.done?l(i.value):((r=i.value)instanceof e?r:new e(function(d){d(r)})).then(u,f)}s((n=n.apply(a,t||[])).next())})};class c extends m{constructor(t,e,n){super(t,e,g({name:"s-inline",interface:v},n??{}))}mount(){if(this.node.tagName!=="IMG")throw new Error("Sorry but your s-inline marked Element cannot be inlined. At least for now...");var t=this.node.src;this._inlineImg(t)}_inlineImg(t){return w(this,void 0,void 0,function*(){var e=yield(yield fetch(t)).text(),e=new DOMParser().parseFromString(e,"text/html").body.firstChild;e.setAttribute("class",this.node.getAttribute("class")),this.node.after(e),this.node.remove()})}}function b(a={},t="s-inline"){c.define(t,c,a)}export{b as default};
