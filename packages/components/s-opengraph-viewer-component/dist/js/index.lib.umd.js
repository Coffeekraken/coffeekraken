!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("riot"),require("@coffeekraken/s-interface"),require("@coffeekraken/s-component-utils")):"function"==typeof define&&define.amd?define(["riot","@coffeekraken/s-interface","@coffeekraken/s-component-utils"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).index=t(e.riot,e.__SInterface,e.__SComponentUtils)}(this,(function(e,t,n){"use strict";function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t={__proto__:null,[Symbol.toStringTag]:"Module"};return e&&Object.keys(e).forEach((function(n){if("default"!==n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var i=r(e),s=o(t),u=o(n);class a extends s.default{}a.definition={url:{type:"String",required:!0}};const f={css:'s-opengraph-viewer,[is="s-opengraph-viewer"]{ display: block; }',exports:{state:{loading:!1},onBeforeMount(){this.component=new u.default(this.root,this.props,{interface:a})},async onMounted(){var e,t;console.log((e=this.component.props.url,(t=new XMLHttpRequest).onreadystatechange=function(){},t.open("GET",e,!0),t.withCredentials=!0,t.setRequestHeader("Content-Type","text/html"),t.setRequestHeader("Access-Control-Allow-Origin","*"),t.send(),t.responseText))}},template:null,name:"s-opengraph-viewer"};return i.register("s-opengraph-viewer",f),setTimeout((()=>{i.mount("s-opengraph-viewer")})),f.mount=()=>{i.mount("s-opengraph-viewer")},window.env||(window.env={SUGAR:{}}),window.env.SUGAR=JSON.parse('{"ENVIRONMENT":"development"}'),f}));
