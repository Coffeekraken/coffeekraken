import{css,unsafeCSS,html}from"lit";import __SInterface from"@coffeekraken/s-interface";import __SLitComponent from"@coffeekraken/s-lit-component";import __deepMerge from"@coffeekraken/sugar/shared/object/deepMerge";class SRangeComponentInterface extends __SInterface{static get _definition(){return{name:{type:"String",description:'Specify the name to assign to the internal input[type="range"]'},value:{type:"String",description:"Specify the initial range value"},min:{type:"Number",description:"Specify the minimal value or the range",default:0},max:{type:"Number",description:"Specify the maximal value of the range",default:100},step:{type:"Number",description:"Specify the steps between each values"},target:{type:"String",description:"Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"},tooltip:{type:"Boolean",description:"Specify if you want to display the value inside a tooltip on top of the thumb",default:!1},disabled:{type:"Boolean",description:"Specify if this range is disabled",default:!1}}}}var __css="s-range {\n    display: block;\n    width: 100%;\n\n}\n\n    s-range:not([mounted]) > * {\n        display: none;\n    }\n\n    s-range[disabled] {\n        pointer-events: none;\n    }\n.s-range {\n    display: flex;\n    width: 100%;\n}\n.s-range__input {\n    flex-grow: 1;\n    opacity: 1 !important;\n}\n.s-range__input:hover + .s-range__tooltip,\n.s-range__input:focus + .s-range__tooltip {\n    opacity: 1 !important;\n}\n.s-range__tooltip {\n    transition: none;\n}\ns-range:not([bare]) {\n}\n",__awaiter=globalThis&&globalThis.__awaiter||function(t,s,r,p){return new(r=r||Promise)(function(n,e){function i(t){try{o(p.next(t))}catch(t){e(t)}}function a(t){try{o(p.throw(t))}catch(t){e(t)}}function o(t){var e;t.done?n(t.value):((e=t.value)instanceof r?e:new r(function(t){t(e)})).then(i,a)}o((p=p.apply(t,s||[])).next())})};class SRange extends __SLitComponent{static get properties(){return __SLitComponent.properties({},SRangeComponentInterface)}static get styles(){return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `}constructor(){super(__deepMerge({litComponent:{shadowDom:!1},componentUtils:{interface:SRangeComponentInterface}}))}firstUpdated(){return __awaiter(this,void 0,void 0,function*(){this._$input=this.querySelector("input"),this._$tooltip=this.querySelector(".s-range__tooltip"),this._$input.addEventListener("input",t=>{this._handleTooltip(),this._handleTarget()}),this.props.target&&(this._$targets=Array.from(document.querySelectorAll(this.props.target))),this._handleTooltip(),this._handleTarget()})}_handleTarget(){this._$targets&&this._$targets.forEach(t=>{t.innerHTML=this._$input.value,t.value=this._$input.value})}_handleTooltip(){var t,e,n;this._$tooltip&&(t=this._$input.value,n=this._$input.min||0,e=this._$input.max||100,n=Number(100*(t-n)/(e-n)),this._$tooltip.style.left=`calc(${n}% + (${8-.15*n}px))`,this._$tooltip.innerHTML=t)}render(){return html`
            <div
                class="${this.componentUtils.className("","s-tooltip-container")}"
            >
                <input
                    class="${this.componentUtils.className("__input","s-range")}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.name}"
                    value="${this.value}"
                    min="${this.min}"
                    max="${this.max}"
                    step="${this.step}"
                />
                ${this.props.tooltip?html`
                          <div
                              class="${this.componentUtils.className("__tooltip","s-tooltip")}"
                          ></div>
                      `:""}
            </div>
        `}}function define(t={},e="s-range"){__SLitComponent.setDefaultProps(e,t),customElements.define(e,SRange)}export{SRange as default,define};