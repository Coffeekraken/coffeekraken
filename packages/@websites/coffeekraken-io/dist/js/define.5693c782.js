import{c as at,e as C,f as rt,r as nt,o as ot,m as ct,n as f,$ as u}from"./index.esm.js";function X(t){return t instanceof Date||Object.prototype.toString.call(t)==="[object Date]"}function k(t){return X(t)?new Date(t.getTime()):t==null?new Date(NaN):new Date(t)}function lt(t){return X(t)&&!isNaN(t.getTime())}function z(t){var s=1<arguments.length&&arguments[1]!==void 0?arguments[1]:0;if(!(0<=s&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6");var e=k(t),s=(e.getDay()+7-s)%7;return e.setDate(e.getDate()-s),e.setHours(0,0,0,0),e}function G(t){var e=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},i=e.firstDayOfWeek,s=i===void 0?0:i,i=e.firstWeekContainsDate,r=i===void 0?1:i;if(!(1<=r&&r<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7");for(var o=k(t),a=o.getFullYear(),n=new Date(0),c=a+1;a-1<=c&&(n.setFullYear(c,0,r),n.setHours(0,0,0,0),n=z(n,s),!(o.getTime()>=n.getTime()));c--);return n}function dt(t){var e=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},r=e.firstDayOfWeek,r=r===void 0?0:r,e=e.firstWeekContainsDate,e=e===void 0?1:e,i=k(t),s=z(i,r),i=G(i,{firstDayOfWeek:r,firstWeekContainsDate:e}),r=s.getTime()-i.getTime();return Math.round(r/6048e5)+1}var K={months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],firstDayOfWeek:0,firstWeekContainsDate:1},ut=/\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;function p(t){for(var e=1<arguments.length&&arguments[1]!==void 0?arguments[1]:2,s="".concat(Math.abs(t)),i=t<0?"-":"";s.length<e;)s="0".concat(s);return i+s}function x(t){return 15*Math.round(t.getTimezoneOffset()/15)}function F(t){var e=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"",s=0<t?"-":"+",i=Math.abs(t),r=i%60;return s+p(Math.floor(i/60),2)+e+p(r,2)}var j=function(t,e,s){return t=t<12?"AM":"PM",s?t.toLocaleLowerCase():t},$={Y:function(t){return t=t.getFullYear(),(t<=9999?"":"+").concat(t)},YY:function(t){return p(t.getFullYear(),4).substr(2)},YYYY:function(t){return p(t.getFullYear(),4)},M:function(t){return t.getMonth()+1},MM:function(t){return p(t.getMonth()+1,2)},MMM:function(t,e){return e.monthsShort[t.getMonth()]},MMMM:function(t,e){return e.months[t.getMonth()]},D:function(t){return t.getDate()},DD:function(t){return p(t.getDate(),2)},H:function(t){return t.getHours()},HH:function(t){return p(t.getHours(),2)},h:function(t){return t=t.getHours(),t===0?12:12<t?t%12:t},hh:function(){return p($.h.apply($,arguments),2)},m:function(t){return t.getMinutes()},mm:function(t){return p(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return p(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return p(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return p(t.getMilliseconds(),3)},d:function(t){return t.getDay()},dd:function(t,e){return e.weekdaysMin[t.getDay()]},ddd:function(t,e){return e.weekdaysShort[t.getDay()]},dddd:function(t,e){return e.weekdays[t.getDay()]},A:function(t,e){return(e.meridiem||j)(t.getHours(),t.getMinutes(),!1)},a:function(t,e){return(e.meridiem||j)(t.getHours(),t.getMinutes(),!0)},Z:function(t){return F(x(t),":")},ZZ:function(t){return F(x(t))},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()},w:function(t,e){return dt(t,{firstDayOfWeek:e.firstDayOfWeek,firstWeekContainsDate:e.firstWeekContainsDate})},ww:function(t,e){return p($.w(t,e),2)}};function pt(t,e){var s=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},i=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",r=k(t);if(!lt(r))return"Invalid Date";var o=s.locale||K;return i.replace(ut,function(a,n){return n||(typeof $[a]=="function"?"".concat($[a](r,o)):a)})}function E(t){return yt(t)||mt(t)||ht()}function ht(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function mt(t){if(Symbol.iterator in Object(t)||Object.prototype.toString.call(t)==="[object Arguments]")return Array.from(t)}function yt(t){if(Array.isArray(t)){for(var e=0,s=new Array(t.length);e<t.length;e++)s[e]=t[e];return s}}function H(t,e){var s,i=Object.keys(t);return Object.getOwnPropertySymbols&&(s=Object.getOwnPropertySymbols(t),e&&(s=s.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),i.push.apply(i,s)),i}function _t(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?H(s,!0).forEach(function(i){y(t,i,s[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):H(s).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(s,i))})}return t}function ft(t,e){return $t(t)||vt(t,e)||gt()}function gt(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function vt(t,e){if(Symbol.iterator in Object(t)||Object.prototype.toString.call(t)==="[object Arguments]"){var s=[],i=!0,r=!1,o=void 0;try{for(var a,n=t[Symbol.iterator]();!(i=(a=n.next()).done)&&(s.push(a.value),!e||s.length!==e);i=!0);}catch(c){r=!0,o=c}finally{try{i||n.return==null||n.return()}finally{if(r)throw o}}return s}}function $t(t){if(Array.isArray(t))return t}function y(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var bt=/(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g,W=/\d/,m=/\d\d/,kt=/\d{3}/,St=/\d{4}/,_=/\d\d?/,wt=/[+-]\d\d:?\d\d/,L=/[+-]?\d+/,Dt=/[+-]?\d+(\.\d{1,3})?/,M="year",b="month",P="day",R="hour",q="minute",B="second",I="millisecond",Q={},l=function(i,e,s){var i=Array.isArray(i)?i:[i],r=typeof s=="string"?function(o){return o=parseInt(o,10),y({},s,o)}:s;i.forEach(function(o){Q[o]=[e,r]})},Mt=function(t){return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")},g=function(t){return function(e){if(e=e[t],Array.isArray(e))return new RegExp(e.map(Mt).join("|"));throw new Error("Locale[".concat(t,"] need an array"))}},v=function(t,e){return function(s,i){if(i=i[t],!Array.isArray(i))throw new Error("Locale[".concat(t,"] need an array"));if(i=i.indexOf(s),i<0)throw new Error("Invalid Word");return y({},e,i)}};function It(t){return t.meridiemParse||/[ap]\.?m?\.?/i}function Yt(t){return"".concat(t).toLowerCase().charAt(0)==="p"}function Tt(s){var s=ft(s.match(/([+-]|\d\d)/g)||["-","0","0"],3),e=s[0],i=s[1],s=s[2],i=60*parseInt(i,10)+parseInt(s,10);return i===0?0:e==="+"?-i:+i}function Nt(t,e){if(t!==void 0&&e!==void 0){if(e){if(t<12)return t+12}else if(t===12)return 0}return t}function At(t){for(var e=1<arguments.length&&arguments[1]!==void 0?arguments[1]:new Date,s=[0,0,1,0,0,0,0],i=[e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()],r=!0,o=0;o<7;o++)t[o]===void 0?s[o]=(r?i:s)[o]:(s[o]=t[o],r=!1);return s}function Ut(t,e,s,i,r,o,a){var n;return t<100&&0<=t?(n=new Date(t+400,e,s,i,r,o,a),isFinite(n.getFullYear())&&n.setFullYear(t)):n=new Date(t,e,s,i,r,o,a),n}function Ot(){for(var t,e=arguments.length,s=new Array(e),i=0;i<e;i++)s[i]=arguments[i];var r=s[0];return r<100&&0<=r?(s[0]+=400,t=new Date(Date.UTC.apply(Date,s)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(r)):t=new Date(Date.UTC.apply(Date,s)),t}function Ct(t,e,s){var i=e.match(bt);if(!i)throw new Error;for(var r=i.length,o={},a=0;a<r;a+=1){var n=i[a],c=Q[n];if(c){var d=typeof c[0]=="function"?c[0](s):c[0],c=c[1],d=(d.exec(t)||[])[0],o=_t({},o,{},c(d,s));t=t.replace(d,"")}else{if(c=n.replace(/^\[|\]$/g,""),t.indexOf(c)!==0)throw new Error("not match");t=t.substr(c.length)}}return o}function xt(t,e){var s=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};try{var i=s.locale,r=i===void 0?K:i,o=s.backupDate,a=o===void 0?new Date:o,n=Ct(t,e,r),c=n.year,d=n.month,h=n.day,S=n.hour,tt=n.minute,et=n.second,st=n.millisecond,it=n.isPM,Y=n.date,T=n.offset,N=n.weekday,A=n.week;if(Y)return Y;var U,w=[c,d,h,S,tt,et,st];if(w[3]=Nt(w[3],it),A!==void 0&&d===void 0&&h===void 0)return U=G(c===void 0?a:new Date(c,3),{firstDayOfWeek:r.firstDayOfWeek,firstWeekContainsDate:r.firstWeekContainsDate}),new Date(U.getTime()+7*(A-1)*24*3600*1e3);var D=At(w,a),O=T!==void 0?(D[6]+=60*T*1e3,Ot.apply(void 0,E(D))):Ut.apply(void 0,E(D));return N!==void 0&&O.getDay()!==N?new Date(NaN):O}catch{return new Date(NaN)}}l("Y",L,M),l("YY",m,function(s){var e=new Date().getFullYear(),e=Math.floor(e/100),s=parseInt(s,10);return y({},M,100*(68<s?e-1:e)+s)}),l("YYYY",St,M),l("M",_,function(t){return y({},b,parseInt(t,10)-1)}),l("MM",m,function(t){return y({},b,parseInt(t,10)-1)}),l("MMM",g("monthsShort"),v("monthsShort",b)),l("MMMM",g("months"),v("months",b)),l("D",_,P),l("DD",m,P),l(["H","h"],_,R),l(["HH","hh"],m,R),l("m",_,q),l("mm",m,q),l("s",_,B),l("ss",m,B),l("S",W,function(t){return y({},I,100*parseInt(t,10))}),l("SS",m,function(t){return y({},I,10*parseInt(t,10))}),l("SSS",kt,I),l(["A","a"],It,function(t,e){return{isPM:typeof e.isPM=="function"?e.isPM(t):Yt(t)}}),l(["Z","ZZ"],wt,function(t){return{offset:Tt(t)}}),l("x",L,function(t){return{date:new Date(parseInt(t,10))}}),l("X",Dt,function(t){return{date:new Date(1e3*parseFloat(t))}}),l("d",W,"weekday"),l("dd",g("weekdaysMin"),v("weekdaysMin","weekday")),l("ddd",g("weekdaysShort"),v("weekdaysShort","weekday")),l("dddd",g("weekdays"),v("weekdays","weekday")),l("w",_,"week"),l("ww",m,"week");class Z extends at{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["select","validate","reset","clear","close"],default:["select","validate","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",default:"YYYY-MM-DD"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},calendar:{description:"Specify if you want to display a calendar or not",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{}},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disable:{description:'Specify what you want to disable. It can be "weekend", "week" or "2022-12-19" (dates)',type:{type:"Array<String>",splitChars:[","," "]},default:[]},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},hours:{description:"Specify the hours you want in the time selector",type:"Array<Number>",default:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},minutes:{description:"Specify the minutes you want in the time selector",type:"Array<Number>",default:[0,5,10,15,20,25,30,25,40,45,50,55]},fromYear:{description:"Specify the first year to allow selection from",type:"Number",default:new Date().getFullYear()-100},toYear:{description:"Specify the last year to allow selection from",type:"Number",default:new Date().getFullYear()+100}}}}var Ft=`.s-datetime-picker{display:inline-block;position:relative}.s-datetime-picker[disabled]{pointer-events:none}.s-datetime-picker .s-backdrop{pointer-events:none;opacity:0}.s-datetime-picker .s-datetime-picker__root{width:100%}.s-datetime-picker .s-datetime-picker__root.is-interacting *{cursor:none!important}.s-datetime-picker .s-datetime-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}@media screen and (max-width: 639px){.s-datetime-picker .s-datetime-picker__picker{position:fixed;bottom:0;top:auto!important;left:0!important;right:auto;width:100vw;transform:translateY(100%)}}.s-datetime-picker[inline] .s-datetime-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-datetime-picker .s-datetime-picker__actions{display:flex}.s-datetime-picker .s-datetime-picker__actions button{flex-grow:1;text-align:center}.s-datetime-picker:focus-within .s-datetime-picker__picker{opacity:1;pointer-events:all}.s-datetime-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-datetime-picker .s-datetime-picker__calendar:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__calendar table{width:100%}.s-datetime-picker .s-datetime-picker__calendar-item{cursor:pointer;touch-action:manipulation}.s-datetime-picker .s-datetime-picker__calendar-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__selector{height:8em;overflow-y:auto;scroll-snap-type:y mandatory;flex-grow:1}.s-datetime-picker .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__selector-item:first-child{-webkit-margin-before:2.5em;margin-block-start:2.5em}.s-datetime-picker .s-datetime-picker__selector-item:last-child{-webkit-margin-after:2.5em;margin-block-end:2.5em}.s-datetime-picker .s-datetime-picker__selector-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__date-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:first-child{-webkit-margin-before:1em;margin-block-start:1em}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:last-child{-webkit-margin-after:1em;margin-block-end:1em}.s-datetime-picker .s-datetime-picker__date-selectors,.s-datetime-picker .s-datetime-picker__time-selectors{position:relative;display:flex}
`,J=globalThis&&globalThis.__awaiter||function(t,e,s,i){return new(s=s||Promise)(function(r,o){function a(d){try{c(i.next(d))}catch(h){o(h)}}function n(d){try{c(i.throw(d))}catch(h){o(h)}}function c(d){var h;d.done?r(d.value):((h=d.value)instanceof s?h:new s(function(S){S(h)})).then(a,n)}c((i=i.apply(t,e||[])).next())})};class V extends C{constructor(){var e;super(rt({name:"s-datetime-picker",interface:Z})),this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isInInteraction=!1,this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(e=this._$button)!=null&&e.addEventListener("click",s=>s.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return C.createProperties({},Z)}static get styles(){return nt`
            ${ot(`
                ${Ft}
            `)}
        `}static get state(){return{year:0,month:0,day:0,hour:12,minutes:0,displayedYear:0,displayedMonth:0,format:void 0}}mount(){return J(this,void 0,void 0,function*(){this._restoreState()})}firstUpdated(){var e;return J(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$input||(this._$input=this.querySelector("input")),(e=this._$input)!=null&&e.hasAttribute("name")||(e=this._$input)!=null&&e.setAttribute("name",this.props.name),(e=this._$input)!=null&&e.hasAttribute("placeholder")||(e=this._$input)!=null&&e.setAttribute("placeholder",this.props.placeholder),(e=this._$input)!=null&&e.hasAttribute("autocomplete")||(e=this._$input)!=null&&e.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0),this._$days=this.querySelector(".s-datetime-picker__days"),this._$months=this.querySelector(".s-datetime-picker__months"),this._$years=this.querySelector(".s-datetime-picker__years"),this._$hours=this.querySelector(".s-datetime-picker__hours"),this._$minutes=this.querySelector(".s-datetime-picker__minutes"),this.addEventListener("focusin",s=>{var i;(i=this._floatApi)!=null&&i.update()}),this._updateInput("init"),this.props.inline||(this._floatApi=ct(this._$picker,this._$root,Object.assign({},this.props.floatSettings))),this._scrollSelectorsToStateValues("initial"),this._initInteractions()})}_isDateNeeded(){return this.props.format.match(/(d{1,4}|D{1,2}|M{1,4}|Y{2,4})/)}_isTimeNeeded(){return this.props.format.match(/(h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3})/)}_isSelectedDatetimeValid(){return!this._isDateDisabled(this.state.day,this.state.month,this.state.year)}_isDateDisabled(e,s=this.state.displayedMonth,i=this.state.displayedYear){if(i!==-1&&this.props.disable.includes(String(i)))return!0;if(s!==-1){var r=["january","february","march","april","may","june","july","august","september","october","november","december"];for(let d=0;d<r.length;d++){var o=r[d];if(this.props.disable.includes(o)&&s===d)return!0}}if(e===-1)return!1;var a=new Date(i,s,e).getDay(),n=["sunday","monday","thuesday","wednesday","thursday","friday","saturday"];for(let d=0;d<n.length;d++){var c=n[d];if(this.props.disable.includes(c)&&a===d)return!0}return!!this.props.disable.includes(this._getDisableDateFromDate(e))||!!(this.props.disable.includes("week")&&1<a&&a<=5)||!(!this.props.disable.includes("weekend")||a!==0&&a!==6)||void 0}_setDay(e,s=!1){this.state.day=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$days,!0,s)}),this._updateInput("select")}_setMonth(e,s=!1){this.state.month=e,this.state.displayedMonth=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$months,!0,s)}),this._updateInput("select")}_setYear(e,s=!1){this.state.year=e,this.state.displayedYear=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$years,!0,s)}),this._updateInput("select")}_setHour(e,s=!1){this.state.hour=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$hours,!0,s)}),this._updateInput("select")}_setMinutes(e,s=!1){this.state.minutes=e,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$minutes,!0,s)}),this._updateInput("select")}_initInteractions(){let e,s,i,r,o;this._$years.addEventListener("scroll",a=>{f(this._$years)&&(clearTimeout(i),this._$years.classList.add("scrolling"),i=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$years);this._setYear(parseInt(this._$years.children[n-1].innerText)),this._$years.classList.remove("scrolling")},400))}),this._$months.addEventListener("scroll",a=>{f(this._$months)&&(clearTimeout(s),this._$months.classList.add("scrolling"),s=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$months);this._setMonth(n-1),this._$months.classList.remove("scrolling")},400))}),this._$days.addEventListener("scroll",a=>{f(this._$days)&&(clearTimeout(e),this._$days.classList.add("scrolling"),e=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$days);this._setDay(n),this._$days.classList.remove("scrolling")},400))}),this._$hours.addEventListener("scroll",a=>{f(this._$hours)&&(clearTimeout(r),this._$hours.classList.add("scrolling"),r=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$hours);this._setHour(parseInt(this._$hours.children[n-1].innerText)),this._$hours.classList.remove("scrolling")},400))}),this._$minutes.addEventListener("scroll",a=>{f(this._$minutes)&&(clearTimeout(o),this._$minutes.classList.add("scrolling"),o=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$minutes);this._setMinutes(parseInt(this._$minutes.children[n-1].innerText)),this._$minutes.classList.remove("scrolling")},400))})}_getSelectedIdxFromSelector(r){var s=r.getBoundingClientRect(),s=r.scrollTop+s.height/2,i=r.children.length,r=Array.from(r.children).reduce((o,a)=>o+a.getBoundingClientRect().height,0);return Math.round(i/r*s)}_scrollSelectorsToStateValues(e){e=e!=="initial",this._scrollSelectorToActiveItem(this._$years,e),this._scrollSelectorToActiveItem(this._$months,e),this._scrollSelectorToActiveItem(this._$days,e),this._scrollSelectorToActiveItem(this._$hours,e),this._scrollSelectorToActiveItem(this._$minutes,e)}_scrollSelectorToActiveItem(e,s=!0,i){const r=e.querySelector(".active");var o;r&&(o=r.getBoundingClientRect(),e.scrollTo({top:o.height*Array.from(e.children).indexOf(r),left:0,behavior:s?"smooth":"instant"}))}_updateInput(e){e!=="init"&&!this.props.updateInput.includes(e)||(this._$input.value=pt(new Date(this.state.year,this.state.month,this.state.day,this.state.hour,this.state.minutes,0),this.props.format),e!=="init"&&this.componentUtils.dispatchEvent("change",{detail:{}}),this.requestUpdate())}_restoreState(){var e;{this.state.value=void 0;let s=new Date;(e=this._$input)!=null&&e.value&&(s=xt(this._$input.value,this.props.format,{backupDate:new Date})),this.state.year=s.getFullYear(),this.state.month=s.getMonth(),this.state.day=s.getDate(),this.state.displayedYear=this.state.year,this.state.displayedMonth=this.state.month}}_validate(){var e,s;this._updateInput("validate"),(s=(e=document.activeElement)==null?void 0:e.blur)!=null&&s.call(e)}_clear(){this._updateInput("clear")}_reset(){this._updateInput("reset")}_copy(){const e=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,setTimeout(()=>{this.props.copyIconClass=e},1e3)}_getDisableDateFromDate(e){return`${this.state.displayedYear}-${String(this.state.displayedMonth+1).padStart(2,"0")}-`+String(e).padStart(2,"0")}_getMinutes(){return this.props.minutes}_getHours(){return this.props.hours}_getDaysInMonth(e,s){return new Date(e,s+1,0).getDate()}_getDays(){var e=this._getDaysInMonth(this.state.displayedYear,this.state.displayedMonth);return Array.from(Array(e).keys())}_getMonths(){return this.props.i18n.months.filter((e,s)=>!0)}_getYears(){const e=[];for(let s=this.props.fromYear;s<=this.props.toYear;s++)e.push(s);return e}render(){var e;let s=new Date(this.state.displayedYear,this.state.displayedMonth).getDay(),i=32-new Date(this.state.displayedYear,this.state.displayedMonth,32).getDate();const r=new Date;let o=1;return u`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isInInteraction?"is-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":u`
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
                    ${!this._hasInput&&this.props.input?u`
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
                    ${!this._hasButton&&this.props.button?u`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?u`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?u`
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
                            ${Array.from(Array(6).keys()).map(a=>u`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(n=>{const c=o;var d=u`
                                                    ${a===0&&n<s-1?u` <td></td>`:o>i?u`<td></td>`:u`
                                                              <td>
                                                                  <div
                                                                      @click=${h=>this._setDay(c)}
                                                                      class="${this.componentUtils.className("__calendar-item")} ${o===r.getDate()&&r.getMonth()===this.state.displayedMonth&&r.getFullYear()===this.state.displayedYear?"today":""} ${this.componentUtils.className("__calendar-item")} ${o===this.state.day&&this.state.month===this.state.displayedMonth&&this.state.year===this.state.displayedYear?"active":""} ${this._isDateDisabled(o)?"disabled":""}"
                                                                  >
                                                                      <span
                                                                          >${o}</span
                                                                      >
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;return a===0&&n<s-1||o++,d})}
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
                            ${this._getDays().map(a=>u`
                                    <div
                                        @click=${()=>this._setDay(a+1)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__day")} ${this.state.day===a+1?"active":""} ${this._isDateDisabled(a+1)?"disabled":""}"
                                    >
                                        <span>
                                            ${String(a+1).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__months")}"
                        >
                            ${this._getMonths().map((a,n)=>u`
                                    <div
                                        @click=${()=>this._setMonth(n)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__month")} ${this.state.displayedMonth===n?"active":""} ${this._isDateDisabled(-1,n)?"disabled":""}"
                                    >
                                        <span> ${a} </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__years")}"
                        >
                            ${this._getYears().map((a,n)=>u`
                                    <div
                                        @click=${()=>this._setYear(a)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__year")} ${this.state.displayedYear===a?"active":""} ${this._isDateDisabled(-1,-1,a)?"disabled":""}"
                                    >
                                        <span> ${a} </span>
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
                            ${this._getHours().map(a=>u`
                                    <div
                                        @click=${()=>this._setHour(a)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__hour")} ${this.state.hour===a?"active":""}"
                                    >
                                        <span>
                                            ${String(a).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__minutes")}"
                        >
                            ${this._getMinutes().map((a,n)=>u`
                                    <div
                                        @click=${()=>this._setMinutes(a)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__minutes")} ${this.state.minutes===a?"active":""}"
                                    >
                                        <span>
                                            ${String(a).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    ${this.props.actions.length?u`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?u`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${a=>{a.preventDefault(),this._clear()}}
                                            >
                                                ${(e=this.props.i18n.clear)!=null?e:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?u`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${a=>{a.preventDefault(),this._reset()}}
                                            >
                                                ${(e=this.props.i18n.reset)!=null?e:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?u`
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.componentUtils.className("__validate","s-btn s-color--accent")}"
                                                @click=${a=>{a.preventDefault(),this._validate()}}
                                            >
                                                ${(e=this.props.i18n.validate)!=null?e:"Validate"}
                                            </button>
                                        `:""}
                              </div>
                          `:""}
                </div>
            </div>
        `}}function Ht(t={},e="s-datetime-picker"){V.define(V,t,e)}export{Ht as default};
