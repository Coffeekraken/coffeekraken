import{v as d,c,w as p,x as w,y as V,z as x,a as k,A as b,b as C,B as S,C as L,D as g,E as M,d as E}from"./index.esm.js";function j(e){return typeof e=="string"&&e!==""&&e.trim()!==""&&/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(e)}function A(e){return/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(e)}function B(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.toLowerCase())}function D(e){return e.match(/^([0-9]{4})-(1[0-2]|0[1-9])$/)||e.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/)||e.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/)||e.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/)}function O(e){return e.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)||e.match(/^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/)}function T(e){return e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/)||e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)||e.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/)||e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/)}function N(e){try{return!!new URL(e)}catch{return!1}}const q={min:{string:d("Must have at least %n characters",{id:"s-validator.min.string"}),object:d("Must have at least %n properties",{id:"s-validator.min.object"}),number:d("Must be greater than %n",{id:"s-validator.min.number"}),array:d("Must have at least %n items",{id:"s-validator.min.array"})},max:{string:d("Must have at max %n characters",{id:"s-validator.max.string"}),object:d("Must have at max %n properties",{id:"s-validator.max.object"}),number:d("Must be lower than %n",{id:"s-validator.max.number"}),array:d("Must have at max %n items",{id:"s-validator.max.array"})},email:{default:d("Must be a valid email address",{id:"s-validator.email.default"})},required:{default:d("This is required",{id:"s-validator.required.default"})},isoDate:{default:d("Must be a valid ISO date",{id:"s-validator.isoDate.default"})},isoTime:{default:d("Must be a valid ISO time",{id:"s-validator.isoTime.default"})},isoDateTime:{default:d("Must be a valid ISO date time",{id:"s-validator.isoDateTime.default"})},integer:{default:d("Must be an integer",{id:"s-validator.integer.default"})},number:{default:d("Must be an number",{id:"s-validator.number.default"})},negative:{default:d("Must be a negative number",{id:"s-validator.negative.default"})},positive:{default:d("Must be a positive number",{id:"s-validator.positive.default"})},pattern:{default:d("Must match the pattern %pattern",{id:"s-validator.pattern.default"})},alphanum:{default:d("Must contain only alphanumeric characters",{id:"s-validator.alphanum.default"})},creditCard:{default:d("Must be a valid credit card number",{id:"s-validator.creditCard.default"})},color:{default:d("Must be a valid color (hex, rgb, rgba, hsl, hsla)",{id:"s-validator.color.default"})},hex:{default:d("Must be a valid hex color",{id:"s-validator.hex.default"})},type:{default:d("Must be of type %type",{id:"s-validator.type.default"})},base64:{default:d("Must be a valid base64 string",{id:"s-validator.base64.default"})},url:{default:d("Must be a valid url",{id:"s-validator.url.default"}),secure:d("Must be a secure url",{id:"s-validator.url.secure"})},password:{default:d("Must be a password string",{id:"s-validator.password.default"}),weak:d("Must be a password elligible string",{id:"s-validator.password.weak"}),medium:d("Must be >=6 characters, at least 1 lowercase/uppercase/special character",{id:"s-validator.password.medium"}),strong:d("Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character",{id:"s-validator.password.strong"})}},z={description:"Validate a specific type",type:"String",values:["string","number","boolean","integer","array","object"]};function R(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.type},t??{});switch(r.toLowerCase()){case"array":a=Array.isArray(e);break;case"boolean":a=e===!0||e===!1;break;case"integer":a=w(e);break;case"number":a=typeof e=="number";break;case"string":a=typeof e=="string";break;case"object":a=p(e);break;case"checkbox":case"select":a=p(e)&&e.id;break;case"image":a=p(e)&&e.url;break;case"video":a=p(e)&&e.sources&&(e.sources.webm||e.sources.mp4||e.sources.ogg);break;case"datetime":a=p(e)&&e.iso&&e.value&&e.format;break;case"link":a=p(e)&&e.text&&e.url;break;case"color":a=p(e)&&(e.format==="hex"||e.format==="hexa"||e.format==="hsl"||e.format==="hsla"||e.format==="rgb"||e.format==="rgba")&&e.value}return a||(s=(t=i.i18n)==null?void 0:t.default.replace("%type",i.type)),{valid:a,message:s}}const Z={description:"Validate a base64 string",type:"Boolean"};function I(e,r,i){let s;var a,i=c({i18n:i.i18n.base64,trim:!0},i??{});return typeof e!="string"?{valid:!1,message:(a=i.i18n)==null?void 0:a.default}:{valid:a=j(e=i.trim?e.trim():e),message:s=a?s:i.i18n.default}}const F={description:"Validate an alphanum string",type:"Boolean"};function H(e,r,t){let s,a;return t=c({i18n:t.i18n.alphanum,trim:!0},t??{}),typeof e!="string"?{valid:!1,message:t.i18n.default}:{valid:a=(e=t.trim?e.trim():e).match(/^[a-z0-9]+$/i),message:s=a?s:(e=t.i18n)==null?void 0:e.default}}const P={description:"Validate a color string",type:"Boolean"};function U(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.color,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:(i.trim&&(e=e.trim()),{valid:a=V(e),message:s=a?s:(t=i.i18n)==null?void 0:t.default})}const W={description:"Validate a credit card string",type:"Boolean"};function Y(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.creditCard,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:{valid:a=A(e=i.trim?e.trim():e),message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const G={description:"Validate an email string",type:"Boolean"};function J(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.email,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:{valid:a=B(e=i.trim?e.trim():e),message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const K={description:"Validate a hexadecimal string",type:"Boolean"};function Q(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.hex,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:{valid:a=(e=i.trim?e.trim():e).match(/^#[a-zA-Z0-9]{3,6}$/),message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const X={description:"Validate an integer",type:"Boolean"};function ee(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.integer,cast:!0,trim:!0},t??{});return typeof e!="string"&&typeof e!="number"?{valid:!1,message:i.i18n.default}:(typeof(e=typeof e=="string"&&i.trim?e.trim():e)=="string"&&i.cast&&(e=Number(e)),(a=!isNaN(e)&&Number.isInteger(e))||(s=(t=i.i18n)==null?void 0:t.default),{valid:a,message:s})}const te={description:"Validate an iso date string",type:"Boolean"};function ie(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.isoDate,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:{valid:a=D(e=i.trim?e.trim():e),message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const ae={description:"Validate an iso date string",type:"Boolean"};function re(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.isoDateTime,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:{valid:a=O(e=i.trim?e.trim():e),message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const se={description:"Validate an iso time string",type:"Boolean"};function ne(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.isoTime,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:{valid:a=T(e=i.trim?e.trim():e),message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const le={description:'Validate string, array, object and number using the "max" rule',type:"Number"};function oe(e,r,t){var s,a;let i,o;var n=c({i18n:(s=t==null?void 0:t.i18n)==null?void 0:s.max,trim:!0},t??{});switch(!0){case typeof e=="string":n.trim&&(e=e.trim()),o=e.length<=r,i=(a=n.i18n)==null?void 0:a.string.replace("%n",r);break;case typeof e=="number":o=e<=r,i=(a=n.i18n)==null?void 0:a.number.replace("%n",r);break;case Array.isArray(e):o=e.length<=r,i=(a=n.i18n)==null?void 0:a.array.replace("%n",r);break;case typeof e=="object":o=Object.keys(e).length<=r,i=(a=n.i18n)==null?void 0:a.object.replace("%n",r);break;default:return{valid:!1,message:n.i18n.string}}return{valid:o,message:i}}const de={description:'Validate string, array, object and number using the "min" rule',type:"Number"};function ue(e,r,t){var s,a;let i,o;var n=c({i18n:(s=t==null?void 0:t.i18n)==null?void 0:s.min,trim:!0},t??{});switch(!0){case typeof e=="string":n.trim&&(e=e.trim()),o=e.length>=r,i=(a=n.i18n)==null?void 0:a.string.replace("%n",r);break;case typeof e=="number":o=r<=e,i=(a=n.i18n)==null?void 0:a.number.replace("%n",r);break;case Array.isArray(e):o=e.length>=r,i=(a=n.i18n)==null?void 0:a.array.replace("%n",r);break;case typeof e=="object":o=Object.keys(e).length>=r,i=(a=n.i18n)==null?void 0:a.object.replace("%n",r);break;default:return{valid:!1,message:n.i18n.string}}return{valid:o,message:i}}const ce={description:"Validate an negative number",type:"Boolean"};function fe(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.negative,cast:!0,trim:!0},t??{});return typeof e!="string"&&typeof e!="number"?{valid:!1,message:i.i18n.default}:(typeof(e=typeof e=="string"&&i.trim?e.trim():e)=="string"&&i.cast&&(e=Number(e)),(a=!isNaN(e)&&e<0)||(s=(t=i.i18n)==null?void 0:t.default),{valid:a,message:s})}const me={description:"Validate an number",type:"Boolean"};function pe(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.number,cast:!0,trim:!0},t??{});return typeof e!="string"&&typeof e!="number"?{valid:!1,message:i.i18n.default}:(typeof(e=typeof e=="string"&&i.trim?e.trim():e)=="string"&&i.cast&&(e=Number(e)),(a=!isNaN(e))||(s=(t=i.i18n)==null?void 0:t.default),{valid:a,message:s})}const ve={description:"Validate a password string",type:"String"};function he(e,r,t){let s,a=!1;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.password,trim:!0,weakReg:/.*/,mediumReg:/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,strongReg:/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:(i.trim&&(e=e.trim()),t=[],i.weakReg.test(e)&&(e&&t.push("weak"),r==="weak")&&(a=!0),i.mediumReg.test(e)&&(e&&t.push("medium"),r==="medium")&&(a=!0),(a=i.strongReg.test(e)&&(e&&t.push("strong"),r==="strong")?!0:a)||(s=(e=i.i18n)==null?void 0:e[r]),{valid:a,message:s,metas:{levels:["weak","medium","strong"],validLevels:t}})}const ge={description:"Validate a string using a regex pattern",type:"String"};function ye(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.pattern,trim:!0},t??{});return typeof e!="string"?{valid:!1,message:i.i18n.default}:(i.trim&&(e=e.trim()),{valid:a=new RegExp(r).test(e),message:s=a?s:(t=i.i18n)==null?void 0:t.default.replace("%pattern",r)})}const be={description:"Validate an positive number",type:"Boolean"};function _e(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.positive,cast:!0,trim:!0},t??{});return typeof e!="string"&&typeof e!="number"?{valid:!1,message:i.i18n.default}:(typeof(e=typeof e=="string"&&i.trim?e.trim():e)=="string"&&i.cast&&(e=Number(e)),(a=!isNaN(e)&&0<=e)||(s=(t=i.i18n)==null?void 0:t.default),{valid:a,message:s})}const $e={description:"Make sure a value has been provided",type:"Boolean"};function we(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.required,trim:!0},t??{});return{valid:a=(e=typeof e=="string"&&i.trim?e.trim():e)!=null&&e!=="",message:s=a?s:(t=i.i18n)==null?void 0:t.default}}const Ve={description:"Make sure the provided value is a valid url",type:"Boolean"};function xe(e,r,t){let s,a;var i=c({i18n:(i=t==null?void 0:t.i18n)==null?void 0:i.url,trim:!0,secure:!1},t??{});return typeof e=="string"&&i.trim&&(e=e.trim()),(a=N(e))||(s=(t=i.i18n)==null?void 0:t.default),a&&i.secure&&(e.match(/^https:\/\//)||(a=!1,s=(t=i.i18n)==null?void 0:t.secure)),{valid:a,message:s}}class l extends x{static registerValidator(r,t,s){l._validators[r]={validator:t,settings:s}}static registerPreset(r,t,s){l._presets[r]={rules:t,settings:s}}static getValidatorsDefinition(){var r,t,s={};for([r,t]of Object.entries(l._validators))t.settings.definition&&(s[r]=t.settings.definition);return s}constructor(r){super(c({i18n:q},r??{}))}validate(r,t){var s,a,i={valid:!0,rules:{},messages:[]};let o=t;if(typeof t=="string"){if(!l._presets[t])throw new Error(`Sorry but the preset "${t}" is not registered`);o=l._presets[t].rules}if(!o.required&&(r==null||r===""))return{valid:!0,messages:null};for([s,a]of Object.entries(o)){var n=p(a)?a:{},f=(f=a==null?void 0:a.value)!=null?f:a,u=l._validators[s];if(!u)throw new Error(`Sorry but the validator "${s}" is not registered`);n=Object.assign(Object.assign({},n),{i18n:(n=this.settings.i18n[s])!=null?n:{}}),(u=u.validator(r,f,n)).valid?i.rules[s]=u:(u.message=(f=u.message)==null?void 0:f.replace("%value",r).replace("%validator",s),i.valid=!1,i.rules[s]=u,i.messages.push(u.message))}return i}}l._validators={},l._presets={},l.registerValidator("base64",I,{definition:Z}),l.registerValidator("min",ue,{definition:de}),l.registerValidator("max",oe,{definition:le}),l.registerValidator("email",J,{definition:G}),l.registerValidator("required",we,{definition:$e}),l.registerValidator("isoDate",ie,{definition:te}),l.registerValidator("isoTime",ne,{definition:se}),l.registerValidator("isoDateTime",re,{definition:ae}),l.registerValidator("integer",ee,{definition:X}),l.registerValidator("number",pe,{definition:me}),l.registerValidator("negative",fe,{definition:ce}),l.registerValidator("positive",_e,{definition:be}),l.registerValidator("pattern",ye,{definition:ge}),l.registerValidator("alphanum",H,{definition:F}),l.registerValidator("creditCard",Y,{definition:W}),l.registerValidator("color",U,{definition:P}),l.registerValidator("hex",Q,{definition:K}),l.registerValidator("type",R,{definition:z}),l.registerValidator("password",he,{definition:ve}),l.registerValidator("url",xe,{definition:Ve});const ke=`@keyframes error-message-appear{0%{line-height:1;max-height:0}to{max-height:2em;line-height:2}}.s-form-validate+.s-form-validate-error-message{text-align:end;color:hsla(calc(var(--s-color-error-h, 0) + var(--s-color-error-spin ,0)),calc((var(--s-color-error-s, 0)) * 1%),calc((var(--s-color-error-l, 0)) * 1%),var(--s-color-error-a, 1));overflow:hidden;max-height:0;line-height:1;margin:0;animation:.2s error-message-appear var(--s-easing-default, 0) forwards}
`,_=l.getValidatorsDefinition(),$={};for(let[e,r]of Object.entries(_))$[e+"Message"]={description:`The message to display when the validator "${e}" fails`,type:"String"};class h extends k{static get _definition(){return Object.assign(Object.assign(Object.assign({},_),$),{type:{description:"Specify the validation type. Usually automatically detected depending on the field type",type:"String",default:"text"},on:{description:'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',type:"Array<String>",values:["keyup","change","submit","enter","reset"],default:["keyup","change","submit","enter","reset"]},format:{description:'Specify if you want your value to be formatted a certain way. You can specify every "import { __format } from `@coffeekraken/sugar/string`" supported formats',type:"String",values:b.formats},errorClass:{description:"Specify the class to apply when theres an error",type:"String",default:"s-form-validate--error s-color--error"},validClass:{description:"Specify the class to apply on your s-form-validate element when validation is passed successfully",type:"String",default:"s-form-validate--valid s-color--success"},handlers:{description:'Specify some custom handlers by validator that will be executed in addition to the default validate behavior. The handler will take as argument an object containing the "result" SValidator result, the "$feature" that represent the s-validate node, the "$form" node if exists, the "$node" attached node if using the "nodes" property, the "$field" that represent the input field handled and the "props" that represent the feature properties',type:"Object",default:{}},nodes:{description:'Specify a css selector that target some HTMLElements used for the validation. Every HTMLElement has to specify 1 validator by using element attributes (same as on the feature itself). Classes are applied on each "node" to specify if the validator is valid or not',type:"String"},language:{description:"Specify the language you want to use for messages",type:"String",default:"en"},displayError:{description:"Specify if you want to display the error messages or not",type:"Boolean",default:!0},errorContainerAttr:{description:"Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element",type:"String",default:"s-form-validate-error"}})}}var Ce=globalThis&&globalThis.__awaiter||function(e,r,t,s){return new(t=t||Promise)(function(a,i){function o(u){try{f(s.next(u))}catch(m){i(m)}}function n(u){try{f(s.throw(u))}catch(m){i(m)}}function f(u){var m;u.done?a(u.value):((m=u.value)instanceof t?m:new t(function(v){v(m)})).then(o,n)}f((s=s.apply(e,r||[])).next())})};class y extends C{constructor(r,t,s){var a;Object.keys((a=(a=S.getDefaultProps(r))==null?void 0:a.customValidations)!=null?a:{}).forEach(i=>{h.definition[i]||(h.definition[i]={type:"String|Boolean"})}),super(r,t,c({name:"s-form-validate",interface:h,style:ke},s??{})),this._nodeByValidator={},this._isDirty=!1,this._isValidating=!1,(a=this.props.handlers)!=null&&a.password||(r=this.props.handlers)!=null&&(r.password=this._passwordDefaultHandler),this._validator=new l,this._$form=L(this.node,"form"),this._$form&&this._$form.addEventListener("submit",i=>{var o;if(!this._$form._submitHandler){this._$form._submitHandler=!0;const n=[],f=u=>{n.push(u.detail)};this._$form.addEventListener("s-form-validate.error",f),i.preventDefault(),i instanceof CustomEvent&&((o=i.detail)==null||!o.internal)||i.stopPropagation(),setTimeout(()=>{delete this._$form._submitHandler,this._$form.removeEventListener("s-form-validate.error",f),n.length||(this._$form.submit(),i instanceof CustomEvent)||this._$form.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0}))})}}),this.utils.exposeApi({validate:this.validate},this),this.props.nodes&&(this._$nodes=this.node.querySelectorAll(this.props.nodes),this._$nodes.forEach(i=>{for(let n=0;n<i.attributes.length;n++){var o=i.attributes[n];o.name in this.props&&(this.props[g(o.name)]=M(o.value),this._nodeByValidator[g(o.name)]=i)}}))}mount(){E("input,textarea,select",r=>{this._initField(r)},{rootNode:this.node,scopes:!1})}_passwordDefaultHandler({result:r,$feature:t}){var s;r.valid?(t.classList.remove("password-weak"),t.classList.remove("password-medium"),t.classList.remove("password-strong")):(s=r.metas)!=null&&s.levels&&r.metas.levels.forEach(a=>{a!==r.metas.validLevels.slice(-1)[0]?t.classList.remove("password-"+a):t.classList.add("password-"+a)})}_initField(r){this._$field=r,this._$field=this.node,r=this.node.querySelector("input,textarea,select"),r&&(this._$field=r),this._$field.setAttribute("novalidate","true"),["required","maxlength","minlength","max","min","pattern"].forEach(t=>{!this._$field.hasAttribute(t)||this.props[t]||(this.props[t]=this._$field.getAttribute(t),t!=="maxlength"&&t!=="minlength"&&this._$field.removeAttribute(t))}),["keydown","change"].forEach(t=>{this._$field.addEventListener(t,s=>{!this.props.format||s.target.type!=="text"&&s.target.tagName.toLowerCase()!=="textarea"||setTimeout(()=>{var a=this.format((a=s.target.value)!=null?a:"",this.props.format);a!==s.target.value&&(this._$field.value=a)})})}),this.props.on.forEach(t=>{var s;t==="enter"?this._$field.addEventListener("keyup",a=>{a.keyCode===13&&(this._$form?this._$form.dispatchEvent(new CustomEvent("submit",{bubbles:!1,detail:{internal:!0}})):this.validate(a))}):t==="reset"?(s=this._$field.form)!=null&&s.addEventListener(t,a=>{setTimeout(()=>{this.validate(a)})}):t==="submit"?(s=this._$field.form)!=null&&s.addEventListener(t,a=>{var i;a.preventDefault(),a instanceof CustomEvent&&((i=a.detail)==null||!i.internal)||(a.stopPropagation(),this.validate(a))}):t==="keyup"?this.node.addEventListener(t,a=>{this._isDirty&&this.validate(a)}):this.node.addEventListener(t,a=>{this.validate(a)})})}format(r,t){return b(r,t)}validate(r){var t;if(!this._$field)throw new Error("No $field has been found to be validated...");var s=this._getFieldValue();if(((t=r==null?void 0:r.currentTarget)==null?void 0:t.tagName.toLowerCase())==="form"&&r.type!=="reset"&&r.preventDefault(),!this._isValidating){this._isValidating=!0,setTimeout(()=>{this._isValidating=!1});let n;var a,i,o={};for([a,i]of Object.entries(l.getValidatorsDefinition()))this.props[a]!==void 0&&(o[a]=this.props[a]);o.type==="text"&&(o.type="string"),n=this._validator.validate(s,o),r.type==="reset"&&(n={valid:!0}),this._applyResult(n,r)}}_getFieldValue(){switch(!0){case this._$field.type==="checkbox":return this._getCheckboxValues();case this._$field.type==="range":return this._getRangeValue();case this._$field.tagName.toLowerCase()==="select":return this._getSelectValues();case this._$field.type==="radio":return this._getRadioValue();default:return this._$field.value}}_getCheckboxValues(){return Array.from(this.node.querySelectorAll('input[type="checkbox"]:checked')).map(r=>r.value)}_getRadioValue(){return this.node.querySelector('input[type="radio"]:checked').value}_getRangeValue(){return parseFloat(this._$field.value)}_getSelectValues(){return Array.from(this._$field.querySelectorAll("option")).filter(r=>r.selected).map(r=>r.value)}_applyResult(r,t){var s,a;return Ce(this,void 0,void 0,function*(){for(var[i,o]of Object.entries(l.getValidatorsDefinition()))this.props[i]&&this.props.handlers[i]&&(yield this.props.handlers[i]({result:Object.assign({},(s=(s=r.rules)==null?void 0:s[i])!=null?s:r),props:this.props,$feature:this.node,$form:this._$form,$field:this._$field,$node:(s=this._nodeByValidator)==null?void 0:s[i]}));if(r.valid){if(this._isDirty=!1,t.type!=="reset"?this.node.classList.add(...this.props.validClass.split(" ")):this.node.classList.remove(...this.props.validClass.split(" ")),this.node.classList.remove(...this.props.errorClass.split(" ")),(a=this._$error)!=null&&a.hasAttribute("s-form-validate-error")&&(a=this._$error)!=null&&a.remove(),Object.keys(this._nodeByValidator).length)for(var[n,f]of Object.entries(r.rules))this._nodeByValidator[n]&&(this._nodeByValidator[n].classList.remove(...this.props.errorClass.split(" ")),this._nodeByValidator[n].classList.add(...this.props.validClass.split(" ")));this.utils.dispatchEvent("valid",{detail:r})}else{this._isDirty=!0,this.node.classList.add(...this.props.errorClass.split(" ")),this.node.classList.remove(...this.props.validClass.split(" "));var u=Object.keys(r.rules)[0];if(Object.keys(this._nodeByValidator).length)for(var[m,v]of Object.entries(r.rules))this._nodeByValidator[m]&&(v.valid?(this._nodeByValidator[m].classList.remove(...this.props.errorClass.split(" ")),this._nodeByValidator[m].classList.add(...this.props.validClass.split(" "))):(this._nodeByValidator[m].classList.remove(...this.props.validClass.split(" ")),this._nodeByValidator[m].classList.add(...this.props.errorClass.split(" "))));else u=this.props[u+"Message"]||r.messages[0],this.props.displayError&&(this._$error=(a=this.node.querySelector(`[${this.props.errorContainerAttr}]`))!=null?a:this.node.nextElementSibling,this._$error&&this._$error.hasAttribute("s-form-validate-error")||(this._$error=document.createElement("p"),this._$error.setAttribute("s-form-validate-error","true"),this._$error.classList.add("s-form-validate-error-message"),this.node.parentNode.insertBefore(this._$error,this.node.nextSibling)),this._$error.innerHTML=u);this.utils.dispatchEvent("error",{detail:r})}})}}function Le(e={},r="s-form-validate"){y.define(r,y,Object.assign({mountWhen:"inViewport"},e))}export{Le as default};
