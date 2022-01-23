import{css,unsafeCSS,html}from"lit";import{html as html$1}from"lit/static-html.js";import{queryAsync}from"lit/decorators.js";import __SInterface from"@coffeekraken/s-interface";import __SSugarConfig from"@coffeekraken/s-sugar-config";import __isNode from"@coffeekraken/sugar/shared/is/node";import __pikaday from"pikaday";import __whenInteract from"@coffeekraken/sugar/js/dom/detect/whenInteract";import __moment from"moment";import __baseCss from"pikaday/css/pikaday.css?used";import __SLitComponent from"@coffeekraken/s-lit-component";class SDatePickerComponentInterface extends __SInterface{static get _definition(){var e,t;return{name:{descrition:"Specify the name for your input name",type:"String",required:!0},value:{description:"Specify the initial value",type:"String"},placeholder:{description:"Specify a placeholder for your input",type:"String",default:"Select a date"},format:{description:"Specify the format to use for your datepicker",type:"String",default:null!==(e=__SSugarConfig.get("datetime.dateFormat"))&&void 0!==e?e:"YYYY-MM-DD"},firstDay:{type:"Number",description:"Specify the first day of the week. 0 is sunday, 1 monday, etc...",default:1},minDate:{type:"String",description:"the minimum/earliest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())"},maxDate:{type:"String",description:"the maximum/latest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())"},disableWeekends:{type:"Boolean",description:"disallow selection of Saturdays or Sundays",default:!1},yearRange:{type:{type:"Array<Number>",splitChars:[","]},description:"number of years either side (e.g. 10) or array of upper/lower range (e.g. [1900,2015])"},rtl:{type:"Boolean",description:"reverse the calendar for right-to-left languages",default:!__isNode()&&"rtl"===(null===(t=document.querySelector("html"))||void 0===t?void 0:t.getAttribute("dir"))},i18n:{type:"String",description:"language defaults for month and weekday names",default:null!==(t=__SSugarConfig.get("datetime.i18n"))&&void 0!==t?t:{previousMonth:"Previous Month",nextMonth:"Next Month",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},numberOfMonths:{type:"Number",description:"number of visible calendars",default:1},events:{type:{type:"Array<String>",splitChars:[","]},description:"array of dates that you would like to differentiate from regular days (e.g. ['Sat Jun 28 2017', 'Sun Jun 29 2017', 'Tue Jul 01 2017',])",default:[]},noInput:{description:"Specify if you want a visible input injected if you don't have specified yours.",type:"Boolean",default:!1,physical:!0},noButton:{description:"Specify if you want a button attached to your input or not",type:"Boolean",default:!1,physical:!0},arrowIcon:{description:"Specify the svg code for the arrow used across the datepicker",type:"String",default:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>'},calendarIcon:{description:"Specify the svg code for the calendar icon used in the button",type:"String",default:'<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>'}}}}var __css="s-date-picker {\n    display: inline-block;\n    position: relative;\n}\n.s-date-picker {\n    display: flex;\n    width: 100%;\n}\n.s-date-picker__input {\n    flex-grow: 1;\n    padding-inline: var(--s-theme-ui-datePicker-paddingInline, 0.75em);\n    padding-block: var(--s-theme-ui-datePicker-paddingBlock, 0.375em);\n}\n.s-date-picker__button {\n    padding-inline: var(--s-theme-ui-datePicker-paddingInline, 0.75em);\n    padding-block: var(--s-theme-ui-datePicker-paddingBlock, 0.375em);\n    cursor: pointer;\n}\n.s-pikaday {\n    top: 100%;\n    left: auto;\n    right: 0;\n    bottom: auto;\n    display: flex;\n}\ns-date-picker[rtl] .s-pikaday {\n    top: 100%;\n    left: 0;\n    right: auto;\n    bottom: auto;\n}\ns-date-picker:not([bare]):not([rtl]):not([no-button]):not([no-input]) .s-date-picker__input {\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n        }\ns-date-picker:not([bare]):not([rtl]):not([no-button]):not([no-input]) .s-date-picker__button {\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n        }\ns-date-picker:not([bare])[rtl]:not([no-button]):not([no-input]) .s-date-picker__button {\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n            order: 0;\n        }\ns-date-picker:not([bare])[rtl]:not([no-button]):not([no-input]) .s-date-picker__input {\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n            order: 1;\n        }\n.s-date-picker__button {box-shadow: var(--s-theme-depth-0, 0);\n}\n.s-date-picker__button svg {\n        height: 1em;\n    }\n.s-date-picker__button svg,\n        .s-date-picker__button svg > * {\n            box-shadow: 0px 0px 3px 0 hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0) + -10) * 1%),1);\n        }\n",__themeCss="/**\n * This theme is an example to show how you can create your own.\n */\n\n.pika-lendar {\n    width: auto;\n}\n\n.pika-single.s-pikaday {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-foreground-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-foreground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-foreground-lightness-offset, 0)) * 1%),var(--s-theme-color-main-foreground-a, 1));\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-surface-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-main-surface-a, 1));\n    /* border: 1px solid sugar.color(current, border); */\n    border: none;box-shadow: sugar.depth(10px);\n    border-radius: var(--s-theme-ui-datePicker-borderRadius, 10px);\n    padding-inline: var(--s-theme-ui-datePicker-paddingInline, 0.75em);\n    padding-block: var(--s-theme-ui-datePicker-paddingBlock, 0.375em);\n}\n\n.s-pikaday .pika-label {\n    background-color: transparent;\n    color: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));\n    top: -0.5em;\n}\n\n.s-pikaday .pika-prev,\n.s-pikaday .is-rtl .pika-next,\n.s-pikaday .pika-next,\n.s-pikaday .is-rtl .pika-prev {\n    background: none;\n    position: relative;\n    display: inline-block;\n    font-size: 0;\n    color: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));\n    overflow: visible;\n    background: red;\n    opacity: 1;\n    width: 1em;\n    height: 1em;\n    opacity: 0.7;\n}\n\n.s-pikaday .pika-prev:hover,\n    .s-pikaday .pika-prev:focus,\n    .s-pikaday .is-rtl .pika-next:hover,\n    .s-pikaday .is-rtl .pika-next:focus,\n    .s-pikaday .pika-next:hover,\n    .s-pikaday .pika-next:focus,\n    .s-pikaday .is-rtl .pika-prev:hover,\n    .s-pikaday .is-rtl .pika-prev:focus {\n        opacity: 1;\n    }\n\n.s-pikaday .pika-prev:after, .s-pikaday .is-rtl .pika-next:after, .s-pikaday .pika-next:after, .s-pikaday .is-rtl .pika-prev:after {\n        content: '❯';\n        color: inherit;\n        font-size: 1rem;\n        position: absolute;\n        top: 0;\n        left: -2.2em;\n    }\n\n.s-pikaday .pika-prev:after, .s-pikaday.is-rtl .pika-next:after {\n        transform: rotate(180deg);\n        left: 1em;\n    }\n\n.s-pikaday.is-rtl .pika-prev:after {\n        transform: rotate(0deg) !important;\n        left: -2em;\n    }\n\n.s-pikaday .pika-table {\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n    border-radius: var(--s-theme-ui-datePicker-borderRadius, 10px);\n    padding-inline: var(--s-theme-ui-datePicker-paddingInline, 0.75em);\n    padding-block: var(--s-theme-ui-datePicker-paddingBlock, 0.375em);\n}\n\n.s-pikaday .pika-table th * {\n    text-decoration: none;\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n}\n\n.s-pikaday .pika-button {\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    padding-inline: var(--s-theme-ui-datePicker-paddingInline, 0.75em);\n    padding-block: var(--s-theme-ui-datePicker-paddingBlock, 0.375em);\n}\n\n.s-pikaday .pika-week {\n    text-decoration: none;\n}\n\n.s-pikaday .is-today .pika-button {\n    color: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));\n    outline: none;\n}\n\n.s-pikaday .is-selected .pika-button {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    background: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),0.5);\n    box-shadow: none !important;\n}\n\n.s-pikaday .is-disabled .pika-button {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));opacity: var(--s-theme-helpers-disabled-opacity, 0.3) !important;\n}\n\n.s-pikaday .is-disabled .pika-button:hover, .s-pikaday .is-disabled .pika-button:focus, .s-pikaday .is-disabled .pika-button:active {\n            opacity: var(--s-theme-helpers-disabled-opacity, 0.3) !important;\n        }\n\n.s-pikaday .is-disabled .pika-button, .s-pikaday .is-disabled .pika-button * {\n            cursor: not-allowed !important;\n            -webkit-user-select: none !important;\n               -moz-user-select: none !important;\n                -ms-user-select: none !important;\n                    user-select: none !important;\n        }\n\n.s-pikaday .pika-button:hover {\n    color: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-foreground-spin ,0)),calc((var(--s-theme-color-current-s, 0) + var(--s-theme-color-current-foreground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-current-l, 0) + var(--s-theme-color-current-foreground-lightness-offset, 0)) * 1%),var(--s-theme-color-current-foreground-a, 1)) !important;\n    background: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1)) !important;\n}\n",__decorate=globalThis&&globalThis.__decorate||function(e,t,a,r){var n,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,r);else for(var s=e.length-1;0<=s;s--)(n=e[s])&&(i=(o<3?n(i):3<o?n(t,a,i):n(t,a))||i);return 3<o&&i&&Object.defineProperty(t,a,i),i},__awaiter=globalThis&&globalThis.__awaiter||function(e,i,s,c){return new(s=s||Promise)(function(a,t){function r(e){try{o(c.next(e))}catch(e){t(e)}}function n(e){try{o(c.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(r,n)}o((c=c.apply(e,i||[])).next())})};class SDatePicker extends __SLitComponent{constructor(){super({litComponent:{shadowDom:!1},componentUtils:{interface:SDatePickerComponentInterface}})}static get properties(){return __SLitComponent.properties({},SDatePickerComponentInterface)}static get styles(){return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
                ${__themeCss}
            `)}
        `}firstUpdated(){return __awaiter(this,void 0,void 0,function*(){this._$root=this.querySelector("."+this.componentUtils.className("")),this._$input=this.querySelector("input"),this._$input?this._$input.classList.add(this.componentUtils.className("__input")):(this._$input=document.createElement("input"),this._$input.setAttribute("type",this.props.noInput?"hidden":"text"),this.props.noInput||this._$input.setAttribute("class",this.componentUtils.className("__input","s-input"))),this._$input.hasAttribute("name")||this._$input.setAttribute("name",this.props.name),this._$input.hasAttribute("placeholder")||this._$input.setAttribute("placeholder",this.props.placeholder),this._$input.hasAttribute("autocomplete")||this._$input.setAttribute("autocomplete","off"),this.props.rtl&&this._$input.setAttribute("rtl","true"),this._$root.prepend(this._$input);let e;this.props.noButton||(e=yield this._$button),yield __whenInteract(this);const a=this;this._picker=new __pikaday({field:this._$input,format:this.props.format,trigger:e,firstDay:this.props.firstDay,minDate:this.parseDate(this.props.minDate),maxDate:this.parseDate(this.props.maxDate),disableWeekends:this.props.disableWeekends,yearRange:this.props.yearRange,container:this,position:this.props.rtl?"bottom right":"bottom left",reposition:!0,isRTL:this.props.rtl,i18n:this.props.i18n,numberOfMonths:this.props.numberOfMonths,events:this.props.events,defaultDate:this.props.value,theme:this.props.bare?"":"s-pikaday",toString(e,t){return a.dateToString(e,t)},parse(e,t){return a.parseDate(e,t)},onSelect:()=>{this._dispatchEvent("select")},onOpen:()=>{this._dispatchEvent("open")},onClose:()=>{this._dispatchEvent("close")},onDraw:()=>{this._dispatchEvent("draw")}}),Array.from(this.classList).forEach(e=>{e.match(/^s-cs/)&&this._picker.el.classList.add(e)}),["toString","getDate","setDate","getMoment","clear","gotoDate","gotoToday","gotoMonth","nextMonth","prevMonth","gotoYear","setMinDate","setMaxDate","setStartRange","setEndRange","isVisible","show","adjustPosition","hide","destroy"].forEach(e=>{this[e]=this._picker[e].bind(this._picker)})})}parseDate(e,t=this.props.format){return __moment(e,t).toDate()}dateToString(e,t=this.props.format){return __moment(e).format(t)}_dispatchEvent(e){e=new CustomEvent(e,{detail:{dateStr:this._picker.toString(),date:this._picker.getDate()}});this.dispatchEvent(e)}render(){return html`
            <div class="${this.componentUtils.className("")}">
                <slot></slot>
                ${this.props.noButton?"":html`
                          <button
                              onclick="return false"
                              class="${this.componentUtils.className("__button","s-btn")}"
                          >
                              ${html$1([this.calendarIcon])}
                          </button>
                      `}
            </div>
        `}}function define(e={},t="s-date-picker"){__SLitComponent.setDefaultProps(t,e),customElements.define(t,SDatePicker)}__decorate([queryAsync("button")],SDatePicker.prototype,"_$button",void 0);export{SDatePicker as default,define};