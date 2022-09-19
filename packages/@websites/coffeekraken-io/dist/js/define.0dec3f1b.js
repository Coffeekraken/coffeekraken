define(["exports","./index.d9d97e89"],function(H,d){"use strict";function L(t){return t instanceof Date||Object.prototype.toString.call(t)==="[object Date]"}function A(t){return L(t)?new Date(t.getTime()):t==null?new Date(NaN):new Date(t)}function E(t,e){if(e=1<arguments.length&&e!==void 0?e:0,!(0<=e&&e<=6))throw new RangeError("weekStartsOn must be between 0 and 6");return t=A(t),e=(t.getDay()+7-e)%7,t.setDate(t.getDate()-e),t.setHours(0,0,0,0),t}function W(t,i){var i=1<arguments.length&&i!==void 0?i:{},n=i.firstDayOfWeek,a=n===void 0?0:n,n=i.firstWeekContainsDate,o=n===void 0?1:n;if(!(1<=o&&o<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7");for(var s=A(t),r=s.getFullYear(),l=new Date(0),c=r+1;r-1<=c&&(l.setFullYear(c,0,o),l.setHours(0,0,0,0),l=E(l,a),!(s.getTime()>=l.getTime()));c--);return l}var P={months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],firstDayOfWeek:0,firstWeekContainsDate:1},dt=/\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;function m(t,e){for(var i=1<arguments.length&&e!==void 0?e:2,a="".concat(Math.abs(t)),e=t<0?"-":"";a.length<i;)a="0".concat(a);return e+a}function q(t){return 15*Math.round(t.getTimezoneOffset()/15)}function B(n,i){var i=1<arguments.length&&i!==void 0?i:"",a=0<n?"-":"+",n=Math.abs(n),o=n%60;return a+m(Math.floor(n/60),2)+i+m(o,2)}function Z(t,e,i){return t=t<12?"AM":"PM",i?t.toLocaleLowerCase():t}var Y={Y:function(t){return t=t.getFullYear(),(t<=9999?"":"+").concat(t)},YY:function(t){return m(t.getFullYear(),4).substr(2)},YYYY:function(t){return m(t.getFullYear(),4)},M:function(t){return t.getMonth()+1},MM:function(t){return m(t.getMonth()+1,2)},MMM:function(t,e){return e.monthsShort[t.getMonth()]},MMMM:function(t,e){return e.months[t.getMonth()]},D:function(t){return t.getDate()},DD:function(t){return m(t.getDate(),2)},H:function(t){return t.getHours()},HH:function(t){return m(t.getHours(),2)},h:function(t){return t=t.getHours(),t===0?12:12<t?t%12:t},hh:function(){return m(Y.h.apply(Y,arguments),2)},m:function(t){return t.getMinutes()},mm:function(t){return m(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return m(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return m(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return m(t.getMilliseconds(),3)},d:function(t){return t.getDay()},dd:function(t,e){return e.weekdaysMin[t.getDay()]},ddd:function(t,e){return e.weekdaysShort[t.getDay()]},dddd:function(t,e){return e.weekdays[t.getDay()]},A:function(t,e){return(e.meridiem||Z)(t.getHours(),t.getMinutes(),!1)},a:function(t,e){return(e.meridiem||Z)(t.getHours(),t.getMinutes(),!0)},Z:function(t){return B(q(t),":")},ZZ:function(t){return B(q(t))},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()},w:function(t,e){return function(s,n){var n=1<arguments.length&&n!==void 0?n:{},r=(r=n.firstDayOfWeek)===void 0?0:r,n=n.firstWeekContainsDate,n=n===void 0?1:n,s=A(s),o=E(s,r),s=W(s,{firstDayOfWeek:r,firstWeekContainsDate:n}),r=o.getTime()-s.getTime();return Math.round(r/6048e5)+1}(t,{firstDayOfWeek:e.firstDayOfWeek,firstWeekContainsDate:e.firstWeekContainsDate})},ww:function(t,e){return m(Y.w(t,e),2)}};function ut(t,n,a){var a=2<arguments.length&&a!==void 0?a:{},n=n?String(n):"YYYY-MM-DDTHH:mm:ss.SSSZ",o=A(t);if(!L(t=o)||isNaN(t.getTime()))return"Invalid Date";var s=a.locale||P;return n.replace(dt,function(r,l){return l||(typeof Y[r]=="function"?"".concat(Y[r](o,s)):r)})}function J(t){return function(e){if(Array.isArray(e)){for(var i=0,a=new Array(e.length);i<e.length;i++)a[i]=e[i];return a}}(t)||function(e){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)==="[object Arguments]")return Array.from(e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function R(t,e){var i,a=Object.keys(t);return Object.getOwnPropertySymbols&&(i=Object.getOwnPropertySymbols(t),e&&(i=i.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),a.push.apply(a,i)),a}function pt(t,e){return function(i){if(Array.isArray(i))return i}(t)||function(i,a){if(Symbol.iterator in Object(i)||Object.prototype.toString.call(i)==="[object Arguments]"){var n=[],o=!0,s=!1,r=void 0;try{for(var l,c=i[Symbol.iterator]();!(o=(l=c.next()).done)&&(n.push(l.value),!a||n.length!==a);o=!0);}catch(y){s=!0,r=y}finally{try{o||c.return==null||c.return()}finally{if(s)throw r}}return n}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function $(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function u(a,e,i){var a=Array.isArray(a)?a:[a],n=typeof i=="string"?function(o){return o=parseInt(o,10),$({},i,o)}:i;a.forEach(function(o){Q[o]=[e,n]})}function ht(t){return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")}function I(t){return function(e){if(e=e[t],Array.isArray(e))return new RegExp(e.map(ht).join("|"));throw new Error("Locale[".concat(t,"] need an array"))}}function N(t,e){return function(i,a){if(a=a[t],!Array.isArray(a))throw new Error("Locale[".concat(t,"] need an array"));if(a=a.indexOf(i),a<0)throw new Error("Invalid Word");return $({},e,a)}}var mt=/(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g,V=/\d/,b=/\d\d/,D=/\d\d?/,X=/[+-]?\d+/,x="year",U="month",z="hour",G="minute",K="second",O="millisecond",Q={};function yt(t,e,i){var a=e.match(mt);if(!a)throw new Error;for(var n=a.length,o={},s=0;s<n;s+=1){var r=a[s],l=Q[r];if(l){var c=typeof l[0]=="function"?l[0](i):l[0],l=l[1],c=(c.exec(t)||[])[0],o=function(M){for(var k=1;k<arguments.length;k++){var S=arguments[k]!=null?arguments[k]:{};k%2?R(S,!0).forEach(function(w){$(M,w,S[w])}):Object.getOwnPropertyDescriptors?Object.defineProperties(M,Object.getOwnPropertyDescriptors(S)):R(S).forEach(function(w){Object.defineProperty(M,w,Object.getOwnPropertyDescriptor(S,w))})}return M}({},o,{},l(c,i));t=t.replace(c,"")}else{if(l=r.replace(/^\[|\]$/g,""),t.indexOf(l)!==0)throw new Error("not match");t=t.substr(l.length)}}return o}function _t(t,e,i){i=2<arguments.length&&i!==void 0?i:{};try{var a=i.locale,n=a===void 0?P:a,o=i.backupDate,s=o===void 0?new Date:o,r=yt(t,e,n),l=r.year,c=r.month,y=r.day,C=r.hour,M=r.minute,k=r.second,S=r.millisecond,w=r.isPM,st=r.date,at=r.offset,nt=r.weekday,rt=r.week;if(st)return st;var ot,F=[l,c,y,C,M,k,S];if(F[3]=function(p,h){if(p!==void 0&&h!==void 0){if(h){if(p<12)return p+12}else if(p===12)return 0}return p}(F[3],w),rt!==void 0&&c===void 0&&y===void 0)return ot=W(l===void 0?s:new Date(l,3),{firstDayOfWeek:n.firstDayOfWeek,firstWeekContainsDate:n.firstWeekContainsDate}),new Date(ot.getTime()+7*(rt-1)*24*3600*1e3);var j=function(p,h){for(var h=1<arguments.length&&h!==void 0?h:new Date,_=[0,0,1,0,0,0,0],v=[h.getFullYear(),h.getMonth(),h.getDate(),h.getHours(),h.getMinutes(),h.getSeconds(),h.getMilliseconds()],g=!0,f=0;f<7;f++)p[f]===void 0?_[f]=(g?v:_)[f]:(_[f]=p[f],g=!1);return _}(F,s),ct=at!==void 0?(j[6]+=60*at*1e3,function(){for(var p,h=arguments.length,_=new Array(h),v=0;v<h;v++)_[v]=arguments[v];var g=_[0];return g<100&&0<=g?(_[0]+=400,p=new Date(Date.UTC.apply(Date,_)),isFinite(p.getUTCFullYear())&&p.setUTCFullYear(g)):p=new Date(Date.UTC.apply(Date,_)),p}.apply(void 0,J(j))):function(p,h,_,v,g,f,lt){var T;return p<100&&0<=p?(T=new Date(p+400,h,_,v,g,f,lt),isFinite(T.getFullYear())&&T.setFullYear(p)):T=new Date(p,h,_,v,g,f,lt),T}.apply(void 0,J(j));return nt!==void 0&&ct.getDay()!==nt?new Date(NaN):ct}catch(p){return new Date(NaN)}}u("Y",X,x),u("YY",b,function(i){var e=new Date().getFullYear(),e=Math.floor(e/100),i=parseInt(i,10);return $({},x,100*(68<i?e-1:e)+i)}),u("YYYY",/\d{4}/,x),u("M",D,function(t){return $({},U,parseInt(t,10)-1)}),u("MM",b,function(t){return $({},U,parseInt(t,10)-1)}),u("MMM",I("monthsShort"),N("monthsShort",U)),u("MMMM",I("months"),N("months",U)),u("D",D,"day"),u("DD",b,"day"),u(["H","h"],D,z),u(["HH","hh"],b,z),u("m",D,G),u("mm",b,G),u("s",D,K),u("ss",b,K),u("S",V,function(t){return $({},O,100*parseInt(t,10))}),u("SS",b,function(t){return $({},O,10*parseInt(t,10))}),u("SSS",/\d{3}/,O),u(["A","a"],function(t){return t.meridiemParse||/[ap]\.?m?\.?/i},function(t,e){return{isPM:typeof e.isPM=="function"?e.isPM(t):"".concat(t).toLowerCase().charAt(0)==="p"}}),u(["Z","ZZ"],/[+-]\d\d:?\d\d/,function(t){return{offset:(e=(t=pt((t=t).match(/([+-]|\d\d)/g)||["-","0","0"],3))[0],i=t[1],t=t[2],(i=60*parseInt(i,10)+parseInt(t,10))===0?0:e==="+"?-i:+i)};var e,i}),u("x",X,function(t){return{date:new Date(parseInt(t,10))}}),u("X",/[+-]?\d+(\.\d{1,3})?/,function(t){return{date:new Date(1e3*parseFloat(t))}}),u("d",V,"weekday"),u("dd",I("weekdaysMin"),N("weekdaysMin","weekday")),u("ddd",I("weekdaysShort"),N("weekdaysShort","weekday")),u("dddd",I("weekdays"),N("weekdays","weekday")),u("w",D,"week"),u("ww",b,"week");class tt extends d.SInterface{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["select","validate","reset","clear","close"],default:["select","validate","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",default:"YYYY-MM-DD"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},calendar:{description:"Specify if you want to display a calendar or not",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{}},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disable:{description:'Specify what you want to disable. It can be "weekend", "week" or "2022-12-19" (dates)',type:{type:"Array<String>",splitChars:[","," "]},default:[]},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},hours:{description:"Specify the hours you want in the time selector",type:"Array<Number>",default:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},minutes:{description:"Specify the minutes you want in the time selector",type:"Array<Number>",default:[0,5,10,15,20,25,30,25,40,45,50,55]},fromYear:{description:"Specify the first year to allow selection from",type:"Number",default:new Date().getFullYear()-100},toYear:{description:"Specify the last year to allow selection from",type:"Number",default:new Date().getFullYear()+100}}}}var et=globalThis&&globalThis.__awaiter||function(t,e,i,a){return new(i=i||Promise)(function(n,o){function s(c){try{l(a.next(c))}catch(y){o(y)}}function r(c){try{l(a.throw(c))}catch(y){o(y)}}function l(c){var y;c.done?n(c.value):((y=c.value)instanceof i?y:new i(function(C){C(y)})).then(s,r)}l((a=a.apply(t,e||[])).next())})};class it extends d.SLitComponent{constructor(){var e;super(d.__deepMerge({name:"s-datetime-picker",interface:tt})),this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isInInteraction=!1,this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(e=this._$button)!=null&&e.addEventListener("click",i=>i.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return d.SLitComponent.createProperties({},tt)}static get styles(){return d.r`
            ${d.o(`
                .s-datetime-picker{display:inline-block;position:relative}.s-datetime-picker[disabled]{pointer-events:none}.s-datetime-picker .s-backdrop{pointer-events:none;opacity:0}.s-datetime-picker .s-datetime-picker__root{width:100%}.s-datetime-picker .s-datetime-picker__root.is-interacting *{cursor:none!important}.s-datetime-picker .s-datetime-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}@media screen and (max-width: 639px){.s-datetime-picker .s-datetime-picker__picker{position:fixed;bottom:0;top:auto!important;left:0!important;right:auto;width:100vw;transform:translateY(100%)}}.s-datetime-picker[inline] .s-datetime-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-datetime-picker .s-datetime-picker__actions{display:flex}.s-datetime-picker .s-datetime-picker__actions button{flex-grow:1;text-align:center}.s-datetime-picker:focus-within .s-datetime-picker__picker{opacity:1;pointer-events:all}.s-datetime-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-datetime-picker .s-datetime-picker__calendar:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__calendar table{width:100%}.s-datetime-picker .s-datetime-picker__calendar-item{cursor:pointer;touch-action:manipulation}.s-datetime-picker .s-datetime-picker__calendar-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__selector{height:8em;overflow-y:auto;scroll-snap-type:y mandatory;flex-grow:1}.s-datetime-picker .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__selector-item:first-child{-webkit-margin-before:2.5em;margin-block-start:2.5em}.s-datetime-picker .s-datetime-picker__selector-item:last-child{-webkit-margin-after:2.5em;margin-block-end:2.5em}.s-datetime-picker .s-datetime-picker__selector-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__date-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:first-child{-webkit-margin-before:1em;margin-block-start:1em}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:last-child{-webkit-margin-after:1em;margin-block-end:1em}.s-datetime-picker .s-datetime-picker__date-selectors,.s-datetime-picker .s-datetime-picker__time-selectors{position:relative;display:flex}

            `)}
        `}static get state(){return{year:0,month:0,day:0,hour:12,minutes:0,displayedYear:0,displayedMonth:0,format:void 0}}mount(){return et(this,void 0,void 0,function*(){this._restoreState()})}firstUpdated(){var e;return et(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$input||(this._$input=this.querySelector("input")),(e=this._$input)!=null&&e.hasAttribute("name")||(e=this._$input)!=null&&e.setAttribute("name",this.props.name),(e=this._$input)!=null&&e.hasAttribute("placeholder")||(e=this._$input)!=null&&e.setAttribute("placeholder",this.props.placeholder),(e=this._$input)!=null&&e.hasAttribute("autocomplete")||(e=this._$input)!=null&&e.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0),this._$days=this.querySelector(".s-datetime-picker__days"),this._$months=this.querySelector(".s-datetime-picker__months"),this._$years=this.querySelector(".s-datetime-picker__years"),this._$hours=this.querySelector(".s-datetime-picker__hours"),this._$minutes=this.querySelector(".s-datetime-picker__minutes"),this.addEventListener("focusin",i=>{var a;(a=this._floatApi)!=null&&a.update()}),this._updateInput("init"),this.props.inline||(this._floatApi=d.__makeFloat(this._$picker,this._$root,Object.assign({},this.props.floatSettings))),this._scrollSelectorsToStateValues("initial"),this._initInteractions()})}_isDateNeeded(){return this.props.format.match(/(d{1,4}|D{1,2}|M{1,4}|Y{2,4})/)}_isTimeNeeded(){return this.props.format.match(/(h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3})/)}_isSelectedDatetimeValid(){return!this._isDateDisabled(this.state.day,this.state.month,this.state.year)}_isDateDisabled(e,i=this.state.displayedMonth,a=this.state.displayedYear){if(a!==-1&&this.props.disable.includes(String(a)))return!0;if(i!==-1){var n=["january","february","march","april","may","june","july","august","september","october","november","december"];for(let c=0;c<n.length;c++){var o=n[c];if(this.props.disable.includes(o)&&i===c)return!0}}if(e===-1)return!1;var s=new Date(a,i,e).getDay(),r=["sunday","monday","thuesday","wednesday","thursday","friday","saturday"];for(let c=0;c<r.length;c++){var l=r[c];if(this.props.disable.includes(l)&&s===c)return!0}return!!this.props.disable.includes(this._getDisableDateFromDate(e))||!!(this.props.disable.includes("week")&&1<s&&s<=5)||!(!this.props.disable.includes("weekend")||s!==0&&s!==6)||void 0}_setDay(e,i=!1){this.state.day=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$days,!0,i)}),this._updateInput("select")}_setMonth(e,i=!1){this.state.month=e,this.state.displayedMonth=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$months,!0,i)}),this._updateInput("select")}_setYear(e,i=!1){this.state.year=e,this.state.displayedYear=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$years,!0,i)}),this._updateInput("select")}_setHour(e,i=!1){this.state.hour=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$hours,!0,i)}),this._updateInput("select")}_setMinutes(e,i=!1){this.state.minutes=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$minutes,!0,i)}),this._updateInput("select")}_initInteractions(){let e,i,a,n,o;this._$years.addEventListener("scroll",s=>{d.__isUserScrolling(this._$years)&&(clearTimeout(a),this._$years.classList.add("scrolling"),a=setTimeout(()=>{var r=this._getSelectedIdxFromSelector(this._$years);this._setYear(parseInt(this._$years.children[r-1].innerText)),this._$years.classList.remove("scrolling")},400))}),this._$months.addEventListener("scroll",s=>{d.__isUserScrolling(this._$months)&&(clearTimeout(i),this._$months.classList.add("scrolling"),i=setTimeout(()=>{var r=this._getSelectedIdxFromSelector(this._$months);this._setMonth(r-1),this._$months.classList.remove("scrolling")},400))}),this._$days.addEventListener("scroll",s=>{d.__isUserScrolling(this._$days)&&(clearTimeout(e),this._$days.classList.add("scrolling"),e=setTimeout(()=>{var r=this._getSelectedIdxFromSelector(this._$days);this._setDay(r),this._$days.classList.remove("scrolling")},400))}),this._$hours.addEventListener("scroll",s=>{d.__isUserScrolling(this._$hours)&&(clearTimeout(n),this._$hours.classList.add("scrolling"),n=setTimeout(()=>{var r=this._getSelectedIdxFromSelector(this._$hours);this._setHour(parseInt(this._$hours.children[r-1].innerText)),this._$hours.classList.remove("scrolling")},400))}),this._$minutes.addEventListener("scroll",s=>{d.__isUserScrolling(this._$minutes)&&(clearTimeout(o),this._$minutes.classList.add("scrolling"),o=setTimeout(()=>{var r=this._getSelectedIdxFromSelector(this._$minutes);this._setMinutes(parseInt(this._$minutes.children[r-1].innerText)),this._$minutes.classList.remove("scrolling")},400))})}_getSelectedIdxFromSelector(n){var i=n.getBoundingClientRect(),i=n.scrollTop+i.height/2,a=n.children.length,n=Array.from(n.children).reduce((o,s)=>o+s.getBoundingClientRect().height,0);return Math.round(a/n*i)}_scrollSelectorsToStateValues(e){e=e!=="initial",this._scrollSelectorToActiveItem(this._$years,e),this._scrollSelectorToActiveItem(this._$months,e),this._scrollSelectorToActiveItem(this._$days,e),this._scrollSelectorToActiveItem(this._$hours,e),this._scrollSelectorToActiveItem(this._$minutes,e)}_scrollSelectorToActiveItem(e,i=!0,a){const n=e.querySelector(".active");var o;n&&(o=n.getBoundingClientRect(),e.scrollTo({top:o.height*Array.from(e.children).indexOf(n),left:0,behavior:i?"smooth":"instant"}))}_updateInput(e){e!=="init"&&!this.props.updateInput.includes(e)||(this._$input.value=ut(new Date(this.state.year,this.state.month,this.state.day,this.state.hour,this.state.minutes,0),this.props.format),e!=="init"&&this.componentUtils.dispatchEvent("change",{detail:{}}),this.requestUpdate())}_restoreState(){var e;{this.state.value=void 0;let i=new Date;(e=this._$input)!=null&&e.value&&(i=_t(this._$input.value,this.props.format,{backupDate:new Date})),this.state.year=i.getFullYear(),this.state.month=i.getMonth(),this.state.day=i.getDate(),this.state.displayedYear=this.state.year,this.state.displayedMonth=this.state.month}}_validate(){var e,i;this._updateInput("validate"),(i=(e=document.activeElement)==null?void 0:e.blur)!=null&&i.call(e)}_clear(){this._updateInput("clear")}_reset(){this._updateInput("reset")}_copy(){const e=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,setTimeout(()=>{this.props.copyIconClass=e},1e3)}_getDisableDateFromDate(e){return`${this.state.displayedYear}-${String(this.state.displayedMonth+1).padStart(2,"0")}-`+String(e).padStart(2,"0")}_getMinutes(){return this.props.minutes}_getHours(){return this.props.hours}_getDaysInMonth(e,i){return new Date(e,i+1,0).getDate()}_getDays(){var e=this._getDaysInMonth(this.state.displayedYear,this.state.displayedMonth);return Array.from(Array(e).keys())}_getMonths(){return this.props.i18n.months.filter((e,i)=>!0)}_getYears(){const e=[];for(let i=this.props.fromYear;i<=this.props.toYear;i++)e.push(i);return e}render(){var e;let i=new Date(this.state.displayedYear,this.state.displayedMonth).getDay(),a=32-new Date(this.state.displayedYear,this.state.displayedMonth,32).getDate();const n=new Date;let o=1;return d.$`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isInInteraction?"is-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":d.$`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${(e=this.state.value)!=null?e:this.props.value}"
                          />
                      `}

                <div
                    class="${this.componentUtils.className("__injected","s-group")}"
                >
                    ${!this._hasInput&&this.props.input?d.$`
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${(e=this.state.value)!=null?e:this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className("__input","s-input")}"
                              />
                          `:(this._hasInput,"")}
                    ${!this._hasButton&&this.props.button?d.$`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?d.$`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?d.$`
                          <div
                              class="${this.componentUtils.className("__backdrop")} ${this.props.backdropClass}"
                          ></div>
                      `:""}
                <div
                    class="${this.componentUtils.className("__picker")}"
                    tabindex="-1"
                >
                    <div
                        class="${this.componentUtils.className("__calendar")} ${this._isDateNeeded()&&this.props.calendar?"active":""}"
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Mon
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Tue
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Wed
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Thu
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Fri
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Sat
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            class="${this.componentUtils.className("__calendar-day")}"
                                        >
                                            Sun
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            ${Array.from(Array(6).keys()).map(s=>d.$`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(r=>{const l=o;var c=d.$`
                                                    ${s===0&&r<i-1?d.$` <td></td>`:o>a?d.$`<td></td>`:d.$`
                                                              <td>
                                                                  <div
                                                                      @click=${y=>this._setDay(l)}
                                                                      class="${this.componentUtils.className("__calendar-item")} ${o===n.getDate()&&n.getMonth()===this.state.displayedMonth&&n.getFullYear()===this.state.displayedYear?"today":""} ${this.componentUtils.className("__calendar-item")} ${o===this.state.day&&this.state.month===this.state.displayedMonth&&this.state.year===this.state.displayedYear?"active":""} ${this._isDateDisabled(o)?"disabled":""}"
                                                                  >
                                                                      <span
                                                                          >${o}</span
                                                                      >
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;return s===0&&r<i-1||o++,c})}
                                    </tr>
                                `)}
                        </table>
                    </div>
                    <div
                        class="${this.componentUtils.className("__date-selectors")} ${this._isDateNeeded()?"active":""}"
                    >
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__days")}"
                        >
                            ${this._getDays().map(s=>d.$`
                                    <div
                                        @click=${()=>this._setDay(s+1)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__day")} ${this.state.day===s+1?"active":""} ${this._isDateDisabled(s+1)?"disabled":""}"
                                    >
                                        <span>
                                            ${String(s+1).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__months")}"
                        >
                            ${this._getMonths().map((s,r)=>d.$`
                                    <div
                                        @click=${()=>this._setMonth(r)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__month")} ${this.state.displayedMonth===r?"active":""} ${this._isDateDisabled(-1,r)?"disabled":""}"
                                    >
                                        <span> ${s} </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__years")}"
                        >
                            ${this._getYears().map((s,r)=>d.$`
                                    <div
                                        @click=${()=>this._setYear(s)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__year")} ${this.state.displayedYear===s?"active":""} ${this._isDateDisabled(-1,-1,s)?"disabled":""}"
                                    >
                                        <span> ${s} </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    <div
                        class="${this.componentUtils.className("__time-selectors")} ${this._isTimeNeeded()?"active":""}"
                    >
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__hours")}"
                        >
                            ${this._getHours().map(s=>d.$`
                                    <div
                                        @click=${()=>this._setHour(s)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__hour")} ${this.state.hour===s?"active":""}"
                                    >
                                        <span>
                                            ${String(s).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__minutes")}"
                        >
                            ${this._getMinutes().map((s,r)=>d.$`
                                    <div
                                        @click=${()=>this._setMinutes(s)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__minutes")} ${this.state.minutes===s?"active":""}"
                                    >
                                        <span>
                                            ${String(s).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    ${this.props.actions.length?d.$`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?d.$`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${s=>{s.preventDefault(),this._clear()}}
                                            >
                                                ${(e=this.props.i18n.clear)!=null?e:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?d.$`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${s=>{s.preventDefault(),this._reset()}}
                                            >
                                                ${(e=this.props.i18n.reset)!=null?e:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?d.$`
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.componentUtils.className("__validate","s-btn s-color--accent")}"
                                                @click=${s=>{s.preventDefault(),this._validate()}}
                                            >
                                                ${(e=this.props.i18n.validate)!=null?e:"Validate"}
                                            </button>
                                        `:""}
                              </div>
                          `:""}
                </div>
            </div>
        `}}H.default=function(t={},e="s-datetime-picker"){it.define(it,t,e)},Object.defineProperty(H,Symbol.toStringTag,{value:"Module"})});
