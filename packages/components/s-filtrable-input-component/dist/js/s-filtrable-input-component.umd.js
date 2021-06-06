!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("riot"),require("@coffeekraken/s-raw-html-component"),require("@coffeekraken/s-interface"),require("lodash.clone"),require("lodash.clonedeep"),require("@coffeekraken/s-component-utils"),require("@coffeekraken/s-promise"),require("react")):"function"==typeof define&&define.amd?define(["exports","riot","@coffeekraken/s-raw-html-component","@coffeekraken/s-interface","lodash.clone","lodash.clonedeep","@coffeekraken/s-component-utils","@coffeekraken/s-promise","react"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).index={},e.riot,e.__SRawHtmlComponent,e.__SInterface,e.__clone,e.__deepClone,e.__SComponent,e.__SPromise,e.React)}(this,(function(exports,riot,__SRawHtmlComponent,__SInterface,__clone,__deepClone,__SComponent,__SPromise,React){"use strict";function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(e){if(e&&e.__esModule)return e;var t={__proto__:null,[Symbol.toStringTag]:"Module"};return e&&Object.keys(e).forEach((function(n){if("default"!==n){var i=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var riot__namespace=_interopNamespace(riot),__SRawHtmlComponent__default=_interopDefaultLegacy(__SRawHtmlComponent),__SInterface__default=_interopDefaultLegacy(__SInterface),__clone__default=_interopDefaultLegacy(__clone),__deepClone__default=_interopDefaultLegacy(__deepClone),__SComponent__default=_interopDefaultLegacy(__SComponent),__SPromise__default=_interopDefaultLegacy(__SPromise),React__default=_interopDefaultLegacy(React);class SHighlightJsComponentInterface extends __SInterface__default.default{}function clone(e,t={}){return(t=Object.assign({deep:!1},t)).deep?__deepClone__default.default(e):__clone__default.default(e)}function scrollTop(){return window.pageYOffset||document.scrollTop||document.body.scrollTop}function offset(e){const t=e.getBoundingClientRect(),n=document.body,i=document.documentElement,s=window.pageYOffset||i.scrollTop||n.scrollTop,o=window.pageXOffset||i.scrollLeft||n.scrollLeft,r=i.clientTop||n.clientTop||0,l=i.clientLeft||n.clientLeft||0,a=t.top+s-r,p=t.left+o-l;return{top:Math.round(a),left:Math.round(p)}}function fromElementTopToViewportBottom(e){const t=offset(e),n=scrollTop();return window.innerHeight-t.top+n}function camelize(e){let t="";return t=e.replace(/(?:^|[_-\s])(\w)/g,(function(e,t){return t?t.toUpperCase():""})),t=t.substr(0,1).toLowerCase()+t.slice(1),t.trim()}function autoCast(string){if("string"!=typeof string)return string;if("'"===string.substr(0,1)&&"'"===string.substr(-1))return string.substr(1,string.length-2);const presumedNumber=parseFloat(string);if(!isNaN(presumedNumber)&&presumedNumber.toString()===string)return presumedNumber;if(window[string])return string;try{const obj=eval(`(${string})`);return obj}catch(e){return string}}function getStyleProperty(e,t){setTimeout((()=>{e._sComputedStyle=null}));const n=e._sComputedStyle||window.getComputedStyle(e);e._sComputedStyle=n;const i=["","webkit-","moz-","ms-","o-","khtml-"];for(let s=0;s<i.length;s++){const e=n[camelize(`${i[s]}${t}`)];if(e&&""!==e.trim())return autoCast(e)}return null}function fromElementTopToViewportTop(e){const t=offset(e),n=scrollTop();return t.top-n}
/*!
   * hotkeys-js v3.8.5
   * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
   * 
   * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
   * http://jaywcjlove.github.io/hotkeys
   * 
   * Licensed under the MIT license.
   */SHighlightJsComponentInterface.definition={value:{type:"String",default:""},noItemText:{type:"String",default:"No item to display"},filtrable:{type:{type:"Array<String>",commaSplit:!0},default:[]},closeTimeout:{type:"Number",default:200},maxItems:{type:"Number",default:25}};var isff="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function addEvent(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on".concat(t),(function(){n(window.event)}))}function getMods(e,t){for(var n=t.slice(0,t.length-1),i=0;i<n.length;i++)n[i]=e[n[i].toLowerCase()];return n}function getKeys(e){"string"!=typeof e&&(e="");for(var t=(e=e.replace(/\s/g,"")).split(","),n=t.lastIndexOf("");n>=0;)t[n-1]+=",",t.splice(n,1),n=t.lastIndexOf("");return t}function compareArray(e,t){for(var n=e.length>=t.length?e:t,i=e.length>=t.length?t:e,s=!0,o=0;o<n.length;o++)-1===i.indexOf(n[o])&&(s=!1);return s}for(var _keyMap={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":isff?173:189,"=":isff?61:187,";":isff?59:186,"'":222,"[":219,"]":221,"\\":220},_modifier={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},modifierMap={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},_mods={16:!1,18:!1,17:!1,91:!1},_handlers={},k=1;k<20;k++)_keyMap["f".concat(k)]=111+k;var _downKeys=[],_scope="all",elementHasBindEvent=[],code=function(e){return _keyMap[e.toLowerCase()]||_modifier[e.toLowerCase()]||e.toUpperCase().charCodeAt(0)};function setScope(e){_scope=e||"all"}function getScope(){return _scope||"all"}function getPressedKeyCodes(){return _downKeys.slice(0)}function filter(e){var t=e.target||e.srcElement,n=t.tagName,i=!0;return!t.isContentEditable&&("INPUT"!==n&&"TEXTAREA"!==n&&"SELECT"!==n||t.readOnly)||(i=!1),i}function isPressed(e){return"string"==typeof e&&(e=code(e)),-1!==_downKeys.indexOf(e)}function deleteScope(e,t){var n,i;for(var s in e||(e=getScope()),_handlers)if(Object.prototype.hasOwnProperty.call(_handlers,s))for(n=_handlers[s],i=0;i<n.length;)n[i].scope===e?n.splice(i,1):i++;getScope()===e&&setScope(t||"all")}function clearModifier(e){var t=e.keyCode||e.which||e.charCode,n=_downKeys.indexOf(t);if(n>=0&&_downKeys.splice(n,1),e.key&&"meta"===e.key.toLowerCase()&&_downKeys.splice(0,_downKeys.length),93!==t&&224!==t||(t=91),t in _mods)for(var i in _mods[t]=!1,_modifier)_modifier[i]===t&&(hotkeys[i]=!1)}function unbind(e){if(e){if(Array.isArray(e))e.forEach((function(e){e.key&&eachUnbind(e)}));else if("object"==typeof e)e.key&&eachUnbind(e);else if("string"==typeof e){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];var s=n[0],o=n[1];"function"==typeof s&&(o=s,s=""),eachUnbind({key:e,scope:s,method:o,splitKey:"+"})}}else Object.keys(_handlers).forEach((function(e){return delete _handlers[e]}))}var eachUnbind=function(e){var t=e.key,n=e.scope,i=e.method,s=e.splitKey,o=void 0===s?"+":s;getKeys(t).forEach((function(e){var t=e.split(o),s=t.length,r=t[s-1],l="*"===r?"*":code(r);if(_handlers[l]){n||(n=getScope());var a=s>1?getMods(_modifier,t):[];_handlers[l]=_handlers[l].map((function(e){return(!i||e.method===i)&&e.scope===n&&compareArray(e.mods,a)?{}:e}))}}))};function eventHandler(e,t,n){var i;if(t.scope===n||"all"===t.scope){for(var s in i=t.mods.length>0,_mods)Object.prototype.hasOwnProperty.call(_mods,s)&&(!_mods[s]&&t.mods.indexOf(+s)>-1||_mods[s]&&-1===t.mods.indexOf(+s))&&(i=!1);(0!==t.mods.length||_mods[16]||_mods[18]||_mods[17]||_mods[91])&&!i&&"*"!==t.shortcut||!1===t.method(e,t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}function dispatch(e){var t=_handlers["*"],n=e.keyCode||e.which||e.charCode;if(hotkeys.filter.call(this,e)){if(93!==n&&224!==n||(n=91),-1===_downKeys.indexOf(n)&&229!==n&&_downKeys.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(t){var n=modifierMap[t];e[t]&&-1===_downKeys.indexOf(n)?_downKeys.push(n):!e[t]&&_downKeys.indexOf(n)>-1?_downKeys.splice(_downKeys.indexOf(n),1):"metaKey"===t&&e[t]&&3===_downKeys.length&&(e.ctrlKey||e.shiftKey||e.altKey||(_downKeys=_downKeys.slice(_downKeys.indexOf(n))))})),n in _mods){for(var i in _mods[n]=!0,_modifier)_modifier[i]===n&&(hotkeys[i]=!0);if(!t)return}for(var s in _mods)Object.prototype.hasOwnProperty.call(_mods,s)&&(_mods[s]=e[modifierMap[s]]);e.getModifierState&&(!e.altKey||e.ctrlKey)&&e.getModifierState("AltGraph")&&(-1===_downKeys.indexOf(17)&&_downKeys.push(17),-1===_downKeys.indexOf(18)&&_downKeys.push(18),_mods[17]=!0,_mods[18]=!0);var o=getScope();if(t)for(var r=0;r<t.length;r++)t[r].scope===o&&("keydown"===e.type&&t[r].keydown||"keyup"===e.type&&t[r].keyup)&&eventHandler(e,t[r],o);if(n in _handlers)for(var l=0;l<_handlers[n].length;l++)if(("keydown"===e.type&&_handlers[n][l].keydown||"keyup"===e.type&&_handlers[n][l].keyup)&&_handlers[n][l].key){for(var a=_handlers[n][l],p=a.splitKey,u=a.key.split(p),c=[],d=0;d<u.length;d++)c.push(code(u[d]));c.sort().join("")===_downKeys.sort().join("")&&eventHandler(e,a,o)}}}function isElementBind(e){return elementHasBindEvent.indexOf(e)>-1}function hotkeys(e,t,n){_downKeys=[];var i=getKeys(e),s=[],o="all",r=document,l=0,a=!1,p=!0,u="+";for(void 0===n&&"function"==typeof t&&(n=t),"[object Object]"===Object.prototype.toString.call(t)&&(t.scope&&(o=t.scope),t.element&&(r=t.element),t.keyup&&(a=t.keyup),void 0!==t.keydown&&(p=t.keydown),"string"==typeof t.splitKey&&(u=t.splitKey)),"string"==typeof t&&(o=t);l<i.length;l++)s=[],(e=i[l].split(u)).length>1&&(s=getMods(_modifier,e)),(e="*"===(e=e[e.length-1])?"*":code(e))in _handlers||(_handlers[e]=[]),_handlers[e].push({keyup:a,keydown:p,scope:o,mods:s,shortcut:i[l],method:n,key:i[l],splitKey:u});void 0!==r&&!isElementBind(r)&&window&&(elementHasBindEvent.push(r),addEvent(r,"keydown",(function(e){dispatch(e)})),addEvent(window,"focus",(function(){_downKeys=[]})),addEvent(r,"keyup",(function(e){dispatch(e),clearModifier(e)})))}var _api={setScope:setScope,getScope:getScope,deleteScope:deleteScope,getPressedKeyCodes:getPressedKeyCodes,isPressed:isPressed,filter:filter,unbind:unbind};for(var a in _api)Object.prototype.hasOwnProperty.call(_api,a)&&(hotkeys[a]=_api[a]);if("undefined"!=typeof window){var _hotkeys=window.hotkeys;hotkeys.noConflict=function(e){return e&&window.hotkeys===hotkeys&&(window.hotkeys=_hotkeys),hotkeys},window.hotkeys=hotkeys}var hotkeys_common=hotkeys;function hotkey(e,t={}){return new __SPromise__default.default((({resolve:n,reject:i,emit:s,cancel:o})=>{t=Object.assign({element:null,keyup:!1,keydown:!0,once:!1,splitKey:"+"},t),hotkeys_common(e,t,((e,n)=>{s("press",e),t.once&&o()}))}),{id:"hotkey"}).on("finally",(()=>{hotkeys_common.unbind(e)}))}function stripTags(e){const t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""}function onScrollEnd(e,t,n){const i=Object.assign({offset:20,once:!1,times:-1},null!=n?n:{});let s=!0,o=0;const r=n=>{s&&e.offsetHeight+e.scrollTop>=e.scrollHeight-i.offset?(t(),s=!1,o++,(i.once||i.times>0&&o>=i.times)&&e.removeEventListener("scroll",r)):e.offsetHeight+e.scrollTop<e.scrollHeight-i.offset&&(s=!0)};e.addEventListener("scroll",r)}hotkeys_common.filter=function(){return!0};const Component={css:'s-filtrable-input,[is="s-filtrable-input"]{ display: inline-block; } s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare),[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare){ display: inline-block; position: relative; } s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list{ position: absolute; top: 100%; left: 0; overflow-x: hidden; overflow-y: auto; opacity: 0; max-width: calc(100vw - 100px); pointer-events: none; margin: 20px 0; } s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare).s-filtrable-input--top .s-filtrable-input__list,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare).s-filtrable-input--top .s-filtrable-input__list{ top: auto; bottom: 100%; } s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__input:focus + .s-filtrable-input__list,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__input:focus + .s-filtrable-input__list,s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list:focus,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list:focus,s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list:focus-within,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list:focus-within{ opacity: 1; pointer-events: all; } s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list-item,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list-item{ cursor: pointer; position: relative; } s-filtrable-input .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list-item *,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-bare .s-filtrable-input):not(.no-bare) .s-filtrable-input__list-item *{ pointer-events: none; } s-filtrable-input .s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf) .s-filtrable-input__list,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf) .s-filtrable-input__list{ transition: max-height 0.1s ease-in-out; } s-filtrable-input .s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf) .s-filtrable-input__list-item-highlight,[is="s-filtrable-input"] .s-filtrable-input:not(.s-no-lnf .s-filtrable-input):not(.s-no-lnf) .s-filtrable-input__list-item-highlight{ background-color: hsl(calc(var(--s-theme-color-current-default-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-default-s, 0) + var(--s-theme-color-current-saturationOffset, 0)) * 1%),calc((var(--s-theme-color-current-default-l, 0) + var(--s-theme-color-current-lightnessOffset, 0)) * 1%)); }',exports:{$container:void 0,$list:void 0,$input:void 0,$itemTemplateElm:void 0,$noItemTemplateElm:void 0,state:{itemTemplate:void 0,noItemTemplate:void 0,preselectedItemIdx:-1,selectedItemIdx:-1,displayedMaxItems:0,value:"",isActive:!1,items:[{title:"Hello",body:"Lorem Ipsum is simply dummy text of the printing"},{title:"Coco",body:"Lorem Ipsum is simply dummy text of the printing"},{title:"Plopfopof",body:"Lorem Ipsum is simply dummy text of the printing"}],filteredItems:[]},onBeforeMount(){if(this.component=new __SComponent__default.default(this.root,this.props,{interface:SHighlightJsComponentInterface}),this.state.displayedMaxItems=this.component.props.maxItems,this.$itemTemplateElm=this.$("template#item"),this.$noItemTemplateElm=this.$("template#no-item"),this.$input=this.$("input"),this.component.props.defaultStyle&&this.$input.classList.add("s-form-input"),this.$itemTemplateElm?this.state.itemTemplate=this.$itemTemplateElm.innerHTML:this.state.itemTemplate=`\n              <div class="${this.component.className("__item")}">\n                  {{value}}\n              </div>\n          `,this.$noItemTemplateElm?this.state.noItemTemplate=this.$noItemTemplateElm.innerHTML:this.state.noItemTemplate=`\n              <div class="${this.component.className("__no-item")}"> \n                  ${this.component.props.noItemText}\n              </div>\n          `,!this.$input)throw new Error("<red>[s-filtrable-input]</red> In order to work you MUST have a valid input tag inside your s-filtrable-input component");this.$input.addEventListener("keyup",(e=>{const t=e.target.value;this.update({value:t,displayedMaxItems:this.component.props.maxItems}),console.log("KEYUP"),this.filterItems()})),this.$input.classList.add(this.component.className("__input")),this.root.innerHTML=""},onMounted(){this.$container=this.root.children[0],this.$list=this.root.querySelector("ul"),this.root.querySelector(".s-filtrable-input").prepend(this.$input),console.log("MOUNTED"),this.filterItems(),__SRawHtmlComponent__default.default.mount(),document.addEventListener("scroll",this._updateListSizeAndPosition),this.$input.addEventListener("focus",(e=>{this.update({isActive:!0}),this.filterItems(),this._updateListSizeAndPosition()})),this._updateListSizeAndPosition(),onScrollEnd(this.$list,(()=>{var e;this.update({displayedMaxItems:(null!=(e=this.state.displayedMaxItems)?e:0)+this.component.props.maxItems}),this.filterItems()})),hotkey("escape").on("press",(e=>{e.preventDefault(),this.state.isActive&&this.close()})),hotkey("up").on("press",(e=>{if(e.preventDefault(),!this.state.isActive)return;this.update({preselectedItemIdx:this.state.preselectedItemIdx>0?this.state.preselectedItemIdx-1:0});this.$list.children[this.state.preselectedItemIdx].focus()})),hotkey("down").on("press",(e=>{if(e.preventDefault(),!this.state.isActive)return;this.update({preselectedItemIdx:this.state.preselectedItemIdx>=this.state.filteredItems.length-1?this.state.filteredItems.length-1:this.state.preselectedItemIdx+1});this.$list.children[this.state.preselectedItemIdx].focus()})),hotkey("return").on("press",(e=>{this.state.isActive&&this._validateAndClose()}))},get selectedItem(){if(-1!==this.state.selectedItemIdx)return this.state.filteredItems[this.state.selectedItemIdx]},get preselectedItem(){if(-1!==this.state.preselectedItemIdx)return this.state.filteredItems[this.state.preselectedItemIdx]},_validateAndClose(){if(this.preselectedItem){if(this.preselectedItem&&!this.preselectedItem[this.component.props.value])throw new Error(`<red>[s-filtrable-input]</red> Sorry but the property "<yellow>${this.component.props.value}</yellow>" does not exists on your selected item`);this.$input.value=stripTags(this.preselectedItem[this.component.props.value]),this.update({selectedItemIdx:this.state.preselectedItemIdx,value:this.$input.value}),setTimeout((()=>{this.close()}),this.component.props.closeTimeout)}},close(){this.$input.focus(),this.$input.blur(),this.update({isActive:!1})},_selectAndValidate(e){this._setPreselectedItemIdx(e),this._validateAndClose()},_setPreselectedItemIdx(e){this.update({preselectedItemIdx:e})},_updateListSizeAndPosition(){if(!this.state.isActive)return;const e=getStyleProperty(this.$list,"marginTop");getStyleProperty(this.$list,"marginLeft"),getStyleProperty(this.$list,"marginRight");const t=getStyleProperty(this.$list,"marginBottom"),n=fromElementTopToViewportTop(this.$input),i=fromElementTopToViewportBottom(this.$input)-this.$input.clientHeight;let s;n>i?(this.$container.classList.add("s-filtrable-input--top"),this.$list.style.top="auto",this.$list.style.bottom=`calc(100% - ${t})`,s=n-parseInt(e)):(this.$container.classList.remove("s-filtrable-input--top"),this.$list.style.bottom="auto",this.$list.style.top=`calc(100% - ${e})`,s=i-parseInt(t)),this.$list.style.maxHeight=`${s}px`},async filterItems(){let e=this.state.items;try{const t=await this.component.dispatchSyncEvent("update",{value:this.$input.value});t&&t.length&&(e=t)}catch(i){}let t=0;const n=e.map((e=>clone(e))).filter((e=>{if(t>=this.state.displayedMaxItems)return!1;if(!this.component.props.filtrable.length)return!0;let n=!1;for(let t=0;t<Object.keys(e).length;t++){const i=Object.keys(e)[t],s=e[i];if("string"==typeof s&&-1!==this.component.props.filtrable.indexOf(i)){const t=new RegExp(this.state.value,"gi");if(s.match(t)&&(n=!0,this.state.value&&""!==this.state.value)){const t=new RegExp(this.state.value,"gi"),n=s.replace(t,(e=>`<span class="${this.component.className("__list-item-highlight")} s-highlight">${e}</span>`));e[i]=n}}}return n&&t++,n}));console.log("DI",n),this.update({filteredItems:n})}},template:function(e,t,n,i){return e('<div expr60="expr60"><ul expr61="expr61"><li expr62="expr62"></li><li expr64="expr64" hoverable></li></ul></div>',[{redundantAttribute:"expr60",selector:"[expr60]",expressions:[{type:t.ATTRIBUTE,name:"class",evaluate:function(e){return e.component.className()}}]},{redundantAttribute:"expr61",selector:"[expr61]",expressions:[{type:t.ATTRIBUTE,name:"class",evaluate:function(e){return e.component.className("__list","s-list")}}]},{type:n.IF,evaluate:function(e){return e.state.filteredItems.length<=0},redundantAttribute:"expr62",selector:"[expr62]",template:e('<s-raw-html expr63="expr63"></s-raw-html>',[{expressions:[{type:t.ATTRIBUTE,name:"class",evaluate:function(e){return e.component.className("__list-item __list-no-item")}}]},{type:n.TAG,getComponent:i,evaluate:function(e){return"s-raw-html"},slots:[],attributes:[{type:t.ATTRIBUTE,name:"html",evaluate:function(e){return e.component.compileMustache(e.state.noItemTemplate,{})}}],redundantAttribute:"expr63",selector:"[expr63]"}])},{type:n.EACH,getKey:null,condition:function(e){return e.state.filteredItems.length},template:e('<s-raw-html expr65="expr65"></s-raw-html>',[{expressions:[{type:t.ATTRIBUTE,name:"style",evaluate:function(e){return["z-index: ",999999999-e.idx].join("")}},{type:t.ATTRIBUTE,name:"tabindex",evaluate:function(e){return e.state.isActive?e.idx:-1}},{type:t.EVENT,name:"onfocus",evaluate:function(e){return()=>e._setPreselectedItemIdx(e.idx)}},{type:t.EVENT,name:"ondblclick",evaluate:function(e){return()=>e._selectAndValidate(e.idx)}},{type:t.ATTRIBUTE,name:"class",evaluate:function(e){return e.component.className("__list-item")+" "+(e.state.selectedItemIdx===e.idx?"active":"")}}]},{type:n.TAG,getComponent:i,evaluate:function(e){return"s-raw-html"},slots:[],attributes:[{type:t.ATTRIBUTE,name:"html",evaluate:function(e){return e.component.compileMustache(e.state.itemTemplate,e.item)}}],redundantAttribute:"expr65",selector:"[expr65]"}]),redundantAttribute:"expr64",selector:"[expr64]",itemName:"item",indexName:"idx",evaluate:function(e){return e.state.filteredItems}}])},name:"s-filtrable-input"};riot__namespace.register("s-filtrable-input",Component),setTimeout((()=>{riot__namespace.mount("s-filtrable-input")})),Component.mount=()=>{riot__namespace.mount("s-filtrable-input")};class MyComponent extends React__default.default.Component{render(){return React__default.default.createElement("s-filtrable-input",{...this.props},this.props.children)}componentDidMount(){Component.mount()}}window.env||(window.env={SUGAR:{}}),window.env.SUGAR=JSON.parse('{"ENVIRONMENT":"development"}'),exports.default=Component,exports.interface=SHighlightJsComponentInterface,exports.reactComponent=MyComponent,Object.defineProperty(exports,"__esModule",{value:!0}),exports[Symbol.toStringTag]="Module"}));
