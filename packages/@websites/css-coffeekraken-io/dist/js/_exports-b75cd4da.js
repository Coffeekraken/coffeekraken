import{t as r,_ as k,v as b,w as j,x as O,y as v,z as l}from"./index-8bb1f793.js";import{_ as n,a as w}from"./__vite-browser-external_fs-843d943e.js";function S(e={}){return e=Object.assign({},e),r.get("storage.dist.cssDir")}function C(e={}){return e=Object.assign({},e),r.get("storage.dist.docDir")}function I(e={}){return e=Object.assign({},e),r.get("storage.dist.fontsDir")}function R(e={}){return e=Object.assign({},e),r.get("storage.dist.iconsDir")}function x(e={}){return e=Object.assign({},e),r.get("storage.dist.imgDir")}function F(e={}){return e=Object.assign({},e),r.get("storage.dist.jsDir")}function E(e={}){return e=Object.assign({},e),r.get("storage.dist.nodeDir")}function J(e={}){return e=Object.assign({},e),r.get("storage.dist.rootDir")}function $(e={}){return e=Object.assign({},e),r.get("storage.dist.viewsDir")}function N(e={}){return e=Object.assign({},e),r.get("storage.package.cacheDir")}function P(){return r.get("storage.package.localDir")}function T(e,s={}){s=k({symlink:!0},s);let t=n.existsSync(e);return!!t&&(t=s.symlink&&n.lstatSync(e).isSymbolicLink()?(s=n.realpathSync(e),t&&n.lstatSync(s).isFile()):t&&n.lstatSync(e).isFile())}const y=b(w);var _=O,f=y;function V(e){(e=e.toString("utf-8")).charCodeAt(0)===65279&&(e=e.slice(1));try{return JSON.parse(e)}catch{return!1}}var m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.iterator:null;function g(e){return m&&(e[m]=function(){return this}),e}var q=function(e){if(typeof(e=e||process.cwd())!="string"){if(typeof e!="object"||typeof e.filename!="string")throw new Error("Must pass a filename string or a module object to finder");e=e.filename}return g({next:function s(){var t,i;return e.match(/^(\w:\\|\/)$/)?g({value:void 0,filename:void 0,done:!0}):(t=_.join(e,"package.json"),e=_.resolve(e,".."),f.existsSync(t)&&(i=V(f.readFileSync(t)))?(i.__path=t,g({value:i,filename:t,done:!1})):s())}})};const L=j(q),u={};function M(e=process.cwd(),i){var t=Object.assign({highest:!1,upCount:void 0,requiredProperties:["name","version"]},i??{}),i=v(Object.assign({from:e},t));if(!e&&u[i])return u[i];T(e)&&(e=e.split("/").slice(0,-1).join("/"));var p=L(e);let o=p.next(),c,a=0;if(!o||!o.filename)return!1;for(;!(o.done||o.done||t.upCount&&!t.highest&&a>=t.upCount);){if(t.highest)c=o;else if(t.requiredProperties){let D=!0;if(t.requiredProperties.forEach(h=>{D&&o.value[h]===void 0&&(D=!1)}),D&&(a++,c=o,!t.upCount))break}else if(a++,c=o,!t.upCount)break;o=p.next()}return!!c&&(e=c.filename.split("/").slice(0,-1).join("/"),u[i]=e)}function z(){return r.get("storage.package.tmpDir")}function A(e={}){return e=Object.assign({},e),r.get("storage.src.cssDir")}function B(e={}){return e=Object.assign({},e),r.get("storage.src.docDir")}function G(e={}){return e=Object.assign({},e),r.get("storage.src.fontsDir")}function H(e={}){return e=Object.assign({},e),r.get("storage.src.iconsDir")}function Y(e={}){return e=Object.assign({},e),r.get("storage.src.imgDir")}function K(e={}){return e=Object.assign({},e),r.get("storage.src.jsDir")}function Q(e={}){return e=Object.assign({},e),r.get("storage.src.nodeDir")}function U(e={}){return e=Object.assign({},e),r.get("storage.src.rootDir")}function W(e={}){return e=Object.assign({},e),r.get("storage.src.viewsDir")}function ne(e,s){const t=Object.assign({packageTmpDir:!0,packageLocalDir:!0,packageCacheDir:!0,packageRootDir:!0,srcRootDir:!0,distRootDir:!0,srcJsDir:!0,srcCssDir:!0,srcDocDir:!0,srcFontsDir:!0,srcIconsDir:!0,srcImgDir:!0,srcNodeDir:!0,srcViewsDir:!0,distJsDir:!0,distCssDir:!0,distDocDir:!0,distFontsDir:!0,distIconsDir:!0,distImgDir:!0,distNodeDir:!0,distViewsDir:!0},s);return s=Array.isArray(e),e=(e=s?e:[e]).map(i=>(t.packageTmpDir&&(i=i.replace("%packageTmpDir",z())),t.packageLocalDir&&(i=i.replace("%packageLocalDir",P())),t.packageCacheDir&&(i=i.replace("%packageCacheDir",N())),t.packageRootDir&&(i=i.replace("%packageRootDir",M())),t.srcRootDir&&(i=i.replace("%srcRootDir",U())),t.distRootDir&&(i=i.replace("%distRootDir",J())),t.srcJsDir&&(i=i.replace("%srcJsDir",K())),t.srcCssDir&&(i=i.replace("%srcCssDir",A())),t.srcDocDir&&(i=i.replace("%srcDocDir",B())),t.srcFontsDir&&(i=i.replace("%srcFontsDir",G())),t.srcIconsDir&&(i=i.replace("%srcIconsDir",H())),t.srcImgDir&&(i=i.replace("%srcImgDir",Y())),t.srcNodeDir&&(i=i.replace("%srcNodeDir",Q())),t.srcViewsDir&&(i=i.replace("%srcViewsDir",W())),t.distJsDir&&(i=i.replace("%distJsDir",F())),t.distCssDir&&(i=i.replace("%distCssDir",S())),t.distDocDir&&(i=i.replace("%distDocDir",C())),t.distFontsDir&&(i=i.replace("%distFontsDir",I())),t.distIconsDir&&(i=i.replace("%distIconsDir",R())),t.distImgDir&&(i=i.replace("%distImgDir",x())),t.distNodeDir&&(i=i.replace("%distNodeDir",E())),i=(i=t.distViewsDir?i.replace("%distViewsDir",$()):i).replace(/\/\//gm,"/"))),s?e:e[0]}function ae(e={}){return e=Object.assign({},e),r.get("storage.sugar.rootDir")}const X=new Proxy({},{get(e,s){throw new Error(`Module "os" has been externalized for browser compatibility. Cannot access "os.${s}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`)}}),Z=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"})),ee=b(Z),ie=y,te=ee,d=Symbol.for("__RESOLVED_TEMP_DIRECTORY__");l[d]||Object.defineProperty(l,d,{value:ie.realpathSync(te.tmpdir())});var re=l[d];const se=j(re);function De(){return se}export{S as __distCssDir,C as __distDocDir,I as __distFontsDir,R as __distIconsDir,x as __distImgDir,F as __distJsDir,E as __distNodeDir,J as __distRootDir,$ as __distViewsDir,N as __packageCacheDir,P as __packageLocalDir,M as __packageRootDir,z as __packageTmpDir,ne as __replacePathTokens,A as __srcCssDir,B as __srcDocDir,G as __srcFontsDir,H as __srcIconsDir,Y as __srcImgDir,K as __srcJsDir,Q as __srcNodeDir,U as __srcRootDir,W as __srcViewsDir,ae as __sugarRootDir,De as __systemTmpDir};
