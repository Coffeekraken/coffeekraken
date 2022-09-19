define(["exports","./index.d9d97e89"],function(p,n){"use strict";class l extends n.SInterface{static get _definition(){return{name:{type:"String",description:'Specify the name to assign to the internal input[type="range"]'},value:{type:"Number",description:"Specify the initial range value"},min:{type:"Number",description:"Specify the minimal value or the range",default:0},max:{type:"Number",description:"Specify the maximal value of the range",default:100},step:{type:"Number",description:"Specify the steps between each values"},target:{type:"String",description:"Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"},tooltip:{type:"Boolean",description:"Specify if you want to display the value inside a tooltip on top of the thumb",default:!1},disabled:{type:"Boolean",description:"Specify if this range is disabled",default:!1}}}}var c=globalThis&&globalThis.__awaiter||function(a,t,i,e){return new(i=i||Promise)(function(d,h){function _(s){try{r(e.next(s))}catch(o){h(o)}}function f(s){try{r(e.throw(s))}catch(o){h(o)}}function r(s){var o;s.done?d(s.value):((o=s.value)instanceof i?o:new i(function(g){g(o)})).then(_,f)}r((e=e.apply(a,t||[])).next())})};class u extends n.SLitComponent{static get properties(){return n.SLitComponent.createProperties({},l)}static get styles(){return n.r`
            ${n.o(`
                .s-range{display:block;width:100%}.s-range:not([mounted])>*{display:none}.s-range[disabled]{pointer-events:none}.s-range__root{display:flex;width:100%}.s-range__input{flex-grow:1;opacity:1!important}.s-range__input:hover+.s-range__tooltip,.s-range__input:focus+.s-range__tooltip{opacity:1!important}.s-range__tooltip{transition:none}

            `)}
        `}constructor(){super(n.__deepMerge({name:"s-range",interface:l}))}firstUpdated(){var t;return c(this,void 0,void 0,function*(){this._$input=this.querySelector("input"),this._$tooltip=this.querySelector(".s-range__tooltip"),this._$input.addEventListener("input",i=>{this._handleTooltip(),this._handleTarget()}),this.props.target&&(this._$targets=Array.from(document.querySelectorAll(this.props.target))),this._$input.value=this.props.value,(t=this._$input)!=null&&t.form&&this._$input.form.addEventListener("reset",()=>{setTimeout(()=>{this._handleTooltip(),this._handleTarget()})}),this._handleTooltip(),this._handleTarget()})}_handleTarget(){this._$targets&&this._$targets.forEach(t=>{t.innerHTML=this._$input.value,t.value=this._$input.value})}_handleTooltip(){var t,i,e;this._$tooltip&&(t=this._$input.value,i=this._$input.min||0,e=this._$input.max||100,e=Number(100*(t-i)/(e-i)),this._$tooltip.style.left=`calc(${e}% + (${8-.15*e}px))`,this._$tooltip.innerHTML=t)}render(){return n.$`
            <div
                class="${this.componentUtils.className("__root","s-tooltip-container")}"
            >
                <input
                    class="${this.componentUtils.className("__input","s-range")}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.props.name}"
                    value="${this.props.value}"
                    min="${this.props.min}"
                    max="${this.props.max}"
                    step="${this.props.step}"
                />
                ${this.props.tooltip?n.$`
                          <div
                              class="${this.componentUtils.className("__tooltip","s-tooltip")}"
                          ></div>
                      `:""}
            </div>
        `}}p.default=function(a={},t="s-range"){u.define(u,a,t)},Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})});
