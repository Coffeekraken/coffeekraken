import{S as g,k as l,l as m,u as y,_ as v,m as u}from"./index-1804220e.js";class h extends g{static get _definition(){return{name:{type:"String",description:'Specify the name to assign to the internal input[type="range"]'},value:{type:"Number",description:"Specify the initial range value"},values:{type:"Object",description:'Specify some values in array like ["hello","world"] that will be used for tooltip. Your range steps MUST be integers for this to work properly'},min:{type:"Number",description:"Specify the minimal value or the range",default:0},max:{type:"Number",description:"Specify the maximal value of the range",default:100},step:{type:"Number",description:"Specify the steps between each values"},target:{type:"String",description:"Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"},tooltip:{type:"Boolean",description:"Specify if you want to display the value inside a tooltip on top of the thumb",default:!1},disabled:{type:"Boolean",description:"Specify if this range is disabled",default:!1}}}}const $=`.s-range{display:block;width:100%}.s-range:not([mounted])>*{display:none}.s-range[disabled]{pointer-events:none}.s-range_root{display:flex;width:100%}.s-range_input{flex-grow:1;opacity:1!important}.s-range_input:hover+.s-range_tooltip,.s-range_input:focus+.s-range_tooltip{opacity:1!important}.s-range_tooltip{transition:none}
`;var S=globalThis&&globalThis.__awaiter||function(a,t,e,i){return new(e=e||Promise)(function(o,p){function d(s){try{r(i.next(s))}catch(n){p(n)}}function f(s){try{r(i.throw(s))}catch(n){p(n)}}function r(s){var n;s.done?o(s.value):((n=s.value)instanceof e?n:new e(function(_){_(n)})).then(d,f)}r((i=i.apply(a,t||[])).next())})};class c extends l{static get properties(){return l.propertiesFromInterface({},h)}static get styles(){return m`
            ${y(`
                ${$}
            `)}
        `}constructor(){super(v({name:"s-range",interface:h}))}firstUpdated(){var t;return S(this,void 0,void 0,function*(){this._$input=this.querySelector("input"),this._$tooltip=this.querySelector(".s-range_tooltip"),this._$input.addEventListener("input",e=>{this._handleTooltip(),this._handleTarget()}),this.props.target&&(this._$targets=Array.from(document.querySelectorAll(this.props.target))),this._$input.value=this.props.value,(t=this._$input)!=null&&t.form&&this._$input.form.addEventListener("reset",()=>{setTimeout(()=>{this._handleTooltip(),this._handleTarget()})}),this._handleTooltip(),this._handleTarget()})}_handleTarget(){this._$targets&&this._$targets.forEach(t=>{t.innerHTML=this._$input.value,t.value=this._$input.value})}_handleTooltip(){if(this._$tooltip){var t=this._$input.value,e=this._$input.min||0,i=this._$input.max||100,i=Number(100*(t-e)/(i-e));this._$tooltip.style.left=`calc(${i}% + (${8-.15*i}px))`;let o=t;this.props.values&&this.props.values[t]&&(o=this.props.values[t]),this._$tooltip.innerHTML=o}}render(){return u`
            <div class="${this.utils.cls("_root","s-tooltip-container")}">
                <input
                    class="${this.utils.cls("_input","s-range")}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.props.name}"
                    value="${this.props.value}"
                    min="${this.props.min}"
                    max="${this.props.max}"
                    step="${this.props.step}"
                />
                ${this.props.tooltip?u`
                          <div
                              class="${this.utils.cls("_tooltip","s-tooltip")}"
                          ></div>
                      `:""}
            </div>
        `}}function T(a={},t="s-range",e){c.define(t,c,a,e)}export{T as default};
