import{M as At,S as b,a as _,_ as m,r as S,o as x,b as D,c as H,$ as p,d as I,e as v,f as j,g as bt,h as Ut,i as Tt,j as Et,k as Lt,l as Z,m as jt,n as Ot,p as Yt,q as Ft}from"./index.esm.js";import{c as Vt,d as Ht}from"./SClipboardCopy.7813b1ca.js";function qt(e=navigator.userAgent){return new At(e).mobile()!==null}function Pt(e){return/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(e)}function Rt(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.toLowerCase())}function Bt(e){return e.match(/^([0-9]{4})-(1[0-2]|0[1-9])$/)||e.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/)||e.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/)||e.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/)}function Wt(e){return e.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)||e.match(/^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/)}function zt(e){return e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/)||e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)||e.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/)||e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/)}function X(e){function t(i){i.preventDefault()}return e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("touchmove",t,{passive:!0}),e.addEventListener("touchend",t,{passive:!0}),e.addEventListener("touchcancel",t,{passive:!0}),function(){e.removeEventListener("touchstart",t),e.removeEventListener("touchmove",t),e.removeEventListener("touchend",t),e.removeEventListener("touchcancel",t)}}class J extends b{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["pointerdown","pointerup","pointermove","validate","eyedropper","reset","clear","close"],default:["pointerup","validate","eyedropper","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",values:["hex","hexa","rgb","rgba","hsl","hsla"],default:"hex"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate"}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},eyeDropper:{description:"Specify if you want the eye dropper capability to pick a color anywhere on the screen or not",type:"Boolean",default:!0},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{position:"auto",shift:10,offset:0,arrow:!1,arrowSize:15,arrowPadding:10}},eyeDropperIconClass:{description:'Specify the class you want to apply on the "i" that display the "eyeDropper" icon',type:"String",default:"s-icon s-icon--eye-dropper"},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1}}}}function Zt(e={},t="s-color-picker"){G.define(t,G,e)}var Xt=`.s-color-picker{display:inline-block;position:relative}.s-color-picker[disabled]{pointer-events:none}.s-color-picker *[disabled]{opacity:1!important}.s-color-picker .s-backdrop{pointer-events:none;opacity:0}.s-color-picker .s-color-picker__root{display:flex;width:100%}.s-color-picker .s-color-picker__root.is-alpha-interacting *,.s-color-picker .s-color-picker__root.is-shade-interacting *,.s-color-picker .s-color-picker__root.is-hue-interacting *{cursor:none!important}.s-color-picker .s-color-picker__injected{display:flex;width:100%}.s-color-picker .s-color-picker__injected input{flex-grow:1}.s-color-picker .s-color-picker__injected button{flex-grow:0}.s-color-picker .s-color-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}.s-color-picker[inline] .s-color-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-color-picker:focus-within .s-color-picker__picker{opacity:1;pointer-events:all}.s-color-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-color-picker .s-color-picker__chest{position:absolute;top:0;left:0;width:100%;height:100%;opacity:.02;pointer-events:none}.s-color-picker .s-color-picker__chest:before{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:repeating-linear-gradient(0deg,#000 0,#000 10px,#fff 10px,#fff 20px);background-position:50% 50%;z-index:-1}.s-color-picker .s-color-picker__chest:after{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:repeating-linear-gradient(90deg,#000 0,#000 10px,#fff 10px,#fff 20px);background-position:50% 50%;mix-blend-mode:difference;z-index:-1}.s-color-picker .s-color-picker__selectors{display:flex;height:215px}.s-color-picker .s-color-picker__shade-wrapper{position:relative;aspect-ratio:16/9;cursor:all-scroll;flex-grow:1}.s-color-picker .s-color-picker__shade-wrapper canvas{width:100%;height:100%;position:relative}.s-color-picker .s-color-picker__hue-wrapper,.s-color-picker .s-color-picker__alpha-wrapper{position:relative;width:30px;cursor:row-resize;flex-grow:0;flex-shrink:0}.s-color-picker .s-color-picker__hue-wrapper canvas,.s-color-picker .s-color-picker__alpha-wrapper canvas{width:100%;height:100%;position:relative}.s-color-picker .s-color-picker__hue-wrapper:after,.s-color-picker .s-color-picker__alpha-wrapper:after{content:"";display:block;width:100%;height:5px;background:red;position:absolute;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none}.s-color-picker .s-color-picker__hue-wrapper:after{top:calc((100 / 360 * var(--s-color-picker-h, 0)) * 1%)}.s-color-picker .s-color-picker__alpha-wrapper{display:none;background:white}.s-color-picker .s-color-picker__alpha-wrapper.active{display:block}.s-color-picker .s-color-picker__alpha-wrapper:after{top:calc(100% - var(--s-color-picker-a, 0) * 100 * 1%)}.s-color-picker .s-color-picker__shade-wrapper:after{content:"";display:block;width:10px;height:10px;background:red;position:absolute;left:50%;transform:translate(-50%,-50%);z-index:10;top:calc(100% - var(--s-color-picker-shade-y, 0) * 1%);left:calc(var(--s-color-picker-shade-x, 0) * 1%);pointer-events:none}.s-color-picker .s-color-picker__metas{display:flex;flex-wrap:nowrap}.s-color-picker .s-color-picker__metas .s-color-picker__btn{flex-grow:0}.s-color-picker .s-color-picker__formats{display:flex}.s-color-picker .s-color-picker__color{display:flex;position:relative}.s-color-picker .s-color-picker__actions{display:flex}.s-color-picker .s-color-picker__actions button{flex-grow:1;text-align:center}.s-color-picker .s-color-picker__color-input{flex-shrink:1;flex-grow:1}.s-color-picker .s-color-picker__preview{position:relative;width:50px;flex-shrink:0;flex-grow:0;cursor:pointer;background-color:hsla(var(--s-color-picker-h),calc(var(--s-color-picker-s) * 1%),calc(var(--s-color-picker-l) * 1%),var(--s-color-picker-a))}.s-color-picker .s-color-picker__preview i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.s-color-picker .s-color-picker__eye-dropper{position:absolute;top:0;right:50px;width:50px;height:100%;background:rgba(0,0,0,0);cursor:pointer}.s-color-picker .s-color-picker__eye-dropper i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}[dir=rtl] .s-color-picker .s-color-picker__picker,.s-color-picker[dir=rtl] .s-color-picker__picker{right:auto;left:0}
`,O=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,a){function o(l){try{c(s.next(l))}catch(h){a(h)}}function n(l){try{c(s.throw(l))}catch(h){a(h)}}function c(l){var h;l.done?r(l.value):((h=l.value)instanceof i?h:new i(function(f){f(h)})).then(o,n)}c((s=s.apply(e,t||[])).next())})};class G extends _{constructor(){var t;super(m({name:"s-color-picker",interface:J})),this.state={},this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isShadeInInteraction=!1,this._isAlphaInInteraction=!1,this._isHueInInteraction=!1,this.state={h:0,s:0,l:0,a:1,metasFormat:"hex",value:void 0},this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(t=this._$button)!=null&&t.addEventListener("pointerup",i=>i.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return _.createProperties({},J)}static get styles(){return S`
            ${x(`
                ${Xt}
            `)}
        `}mount(){return O(this,void 0,void 0,function*(){this._hueColor=new D("#000"),this._color=new D("#000")})}firstUpdated(){return O(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$colorInput=this.querySelector("."+this.componentUtils.uniqueClassName("__color-input")),this._$shade=this.querySelector("."+this.componentUtils.uniqueClassName("__shade")),this._shadeCtx=this._$shade.getContext("2d"),this._$hue=this.querySelector("."+this.componentUtils.uniqueClassName("__hue")),this._hueCtx=this._$hue.getContext("2d"),this._$alpha=this.querySelector("."+this.componentUtils.uniqueClassName("__alpha")),this._alphaCtx=this._$alpha.getContext("2d"),this._$input||(this._$input=this.querySelector("input")),this.componentUtils.fastdom.mutate(()=>{var t;(t=this._$input)!=null&&t.hasAttribute("name")||(t=this._$input)!=null&&t.setAttribute("name",this.props.name),(t=this._$input)!=null&&t.hasAttribute("placeholder")||(t=this._$input)!=null&&t.setAttribute("placeholder",this.props.placeholder),(t=this._$input)!=null&&t.hasAttribute("autocomplete")||(t=this._$input)!=null&&t.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0)}),this.addEventListener("focusin",t=>{var i;(i=this._floatApi)!=null&&i.update()}),X(this.querySelector(".s-color-picker__selectors")),X(this.querySelector(".s-color-picker__metas")),this._isAlphaWanted()||(this.state.a=1),this._initColor(),this._initHueSelector(),this._updateAlphaSelector(),this._updateShadeCanvas(),this._initSelectionInteractions(),this._restoreState(),this._updateInput("init"),this.props.inline||qt()||(this._floatApi=H(this._$picker,this._$root,this.props.floatSettings))})}_initColor(){var t=(t=this.props.value)!=null?t:(t=this._$input)==null?void 0:t.value;t&&(this._inputColor=new D(t)),!this.state.value&&t?(this._color=new D(t),this._isAlphaWanted()||(this._color.a=1)):(this._color.h=this.state.h,this._color.s=this.state.s,this._color.l=this.state.l,this._color.a=this.state.a)}_updateInput(t){if(t==="init"||this.props.updateInput.includes(t)){switch(this.props.format){case"hex":this.state.value=this._color.toHexString();break;case"hexa":this.state.value=this._color.toHexaString();break;case"rgb":this.state.value=this._color.toRgbString();break;case"rgba":this.state.value=this._color.toRgbaString();break;case"hsl":this.state.value=this._color.toHslString();break;case"hsla":this.state.value=this._color.toHslaString()}this._$input&&this._$input.value!==this.state.value&&(this._$input.value=this.state.value),t!=="init"&&this.componentUtils.dispatchEvent("change",{detail:this._color.toObject()}),this.requestUpdate()}}_restoreState(){this._setAlpha(this._color.a),this._setHue(this._color.h),this._setShade(this._color.s,this._color.l)}_setMetasFormat(t){return this.state.metasFormat=t,this.requestUpdate(),!1}_validate(){var t,i;this._updateInput("validate"),(i=(t=document.activeElement)==null?void 0:t.blur)!=null&&i.call(t)}_clear(){this._inputColor?(this._setAlpha(this._inputColor.a),this._setHue(this._inputColor.h),this._setShade(this._inputColor.s,this._inputColor.l)):(this._setAlpha(1),this._setHue(0),this._setShade(0,0)),this._updateInput("clear")}_reset(){this._setAlpha(this._originalState.a),this._setHue(this._originalState.h),this._setShade(this._originalState.s,this._originalState.l),this._updateInput("reset")}_isAlphaWanted(){return this.props.format.includes("a")}_initSelectionInteractions(){let t=!1,i=(this._$shade.addEventListener("pointerdown",s=>{t=!0,this._isShadeInInteraction=!0,this._$shade.setPointerCapture(s.pointerId),this._setShadeFromEvent(s,!1),this._updateInput("pointerdown"),this.requestUpdate()}),this._$shade.addEventListener("pointermove",s=>{s.preventDefault(),t&&(this._setShadeFromEvent(s,!1),this._updateInput("pointermove"))}),this._$shade.addEventListener("pointerup",s=>{t=!1,this._isShadeInInteraction=!1,this._$shade.releasePointerCapture(s.pointerId),this._setShadeFromEvent(s,!0),this._updateInput("pointerup"),this.requestUpdate()}),!1);this._$alpha.addEventListener("pointerdown",s=>{i=!0,this._isAlphaInInteraction=!0,this._$alpha.setPointerCapture(s.pointerId),this._setAlphaFromEvent(s,!1),this._updateInput("pointerdown"),this.requestUpdate()}),this._$alpha.addEventListener("pointermove",s=>{s.preventDefault(),i&&(this._setAlphaFromEvent(s,!1),this._updateInput("pointermove"))}),this._$alpha.addEventListener("pointerup",s=>{i=!1,this._isAlphaInInteraction=!1,this._$alpha.releasePointerCapture(s.pointerId),this._setAlphaFromEvent(s,!0),this._updateInput("pointerup"),this.requestUpdate()})}_setHueFromEvent(s,i=!0){var r=s.target.getBoundingClientRect(),s=s.clientY-r.top,r=100-Math.round(100/r.height*s);let a=360-Math.round(3.6*r);360<(a=a<0?0:a)&&(a=360),this._setHue(a,i)}_setHue(t,i=!0){i&&(this.state.h=t),this._color.h=t,this.style.setProperty("--s-color-picker-h",t),this._updateShadeCanvas(),this._updateAlphaSelector(),this.requestUpdate()}_setShadeFromEvent(a,i=!0){var s=a.target.getBoundingClientRect(),r=a.clientY-s.top,a=a.clientX-s.left;let o=100-Math.round(100/s.height*r),n=Math.round(100/s.width*a);100<(o=o<0?0:o)&&(o=100),100<(n=n<0?0:n)&&(n=100),this._setShade(n,.5*o,i)}_setShade(t,i,s=!0){var r=i+(100-t)/2,a=(r*=2*i/100,t);s&&(this.state.s=a,this.state.l=r),this._color.s=a,this._color.l=r,this.style.setProperty("--s-color-picker-shade-x",t),this.style.setProperty("--s-color-picker-shade-y",100<2*i?100:2*i),this.style.setProperty("--s-color-picker-s",a),this.style.setProperty("--s-color-picker-l",r),this._updateShadeCanvas(),this.requestUpdate()}_setAlphaFromEvent(r,i=!0){var s=r.target.getBoundingClientRect(),r=r.clientY-s.top;let a=100-Math.round(100/s.height*r);100<(a=a<0?0:a)&&(a=100),this._setAlpha(a/100,i)}_setAlpha(t,i=!0){i&&(this.state.a=t),this._color.a=t,this.style.setProperty("--s-color-picker-a",t),this._updateAlphaSelector(),this.requestUpdate()}_copy(){const t=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,Vt(this._$colorInput.value),setTimeout(()=>{this.props.copyIconClass=t},1e3)}_eyeDropper(){return O(this,void 0,void 0,function*(){var i=yield new EyeDropper().open();i.sRGBHex&&(i=new D(i.sRGBHex),this._setAlpha(1),this._setHue(i.h),this._setShade(i.s,i.l),this._updateInput("eyedropper"))})}_initHueSelector(){var t=this._$hue.getBoundingClientRect();this._hueCtx.canvas.width=t.width,this._hueCtx.canvas.height=t.height;const i=this._hueCtx.createLinearGradient(0,0,0,t.height);i.addColorStop(0,"rgb(255, 0, 0)"),i.addColorStop(1/6,"rgb(255, 255, 0)"),i.addColorStop(2/6,"rgb(0, 255, 0)"),i.addColorStop(.5,"rgb(0, 255, 255)"),i.addColorStop(4/6,"rgb(0, 0, 255)"),i.addColorStop(5/6,"rgb(255, 0, 255)"),i.addColorStop(1,"rgb(255, 0, 0)"),this._hueCtx.fillStyle=i,this._hueCtx.fillRect(0,0,3*t.width,t.height);let s=!1;this._$hue.addEventListener("pointerdown",r=>{s=!0,this._isHueInInteraction=!0,this.requestUpdate(),this._$hue.setPointerCapture(r.pointerId),this._setHueFromEvent(r,!1),this._updateInput("pointerdown")}),this._$hue.addEventListener("pointermove",r=>{r.preventDefault(),s&&(this._setHueFromEvent(r),this._updateInput("pointermove",!1))}),this._$hue.addEventListener("pointerup",r=>{s=!1,this._isHueInInteraction=!1,this.requestUpdate(),this._$hue.releasePointerCapture(r.pointerId),this._setHueFromEvent(r,!0),this._updateInput("pointerup",!0)})}_updateAlphaSelector(){var t=this._$alpha.getBoundingClientRect();this._alphaCtx.canvas.width=t.width,this._alphaCtx.canvas.height=t.height;const i=this._alphaCtx.createLinearGradient(0,0,0,t.height);i.addColorStop(0,`rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 1)`),i.addColorStop(1,`rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 0)`),this._alphaCtx.fillStyle=i,this._alphaCtx.fillRect(0,0,3*t.width,t.height)}_updateShadeCanvas(){let t=this._shadeCtx.createLinearGradient(0,0,this._shadeCtx.canvas.width,0);const i=this._color.clone(),s=(i.s=100,i.l=50,t.addColorStop(0,"#fff"),t.addColorStop(1,i.toHex()),this._shadeCtx.fillStyle=t,this._shadeCtx.fillRect(0,0,this._shadeCtx.canvas.width,this._shadeCtx.canvas.height),this._shadeCtx.createLinearGradient(0,0,0,this._shadeCtx.canvas.height));s.addColorStop(0,"rgba(0,0,0,0)"),s.addColorStop(1,"#000"),this._shadeCtx.fillStyle=s,this._shadeCtx.fillRect(0,0,this._shadeCtx.canvas.width,this._shadeCtx.canvas.height)}render(){var t;return p`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isShadeInInteraction?"is-shade-interacting":""} ${this._isAlphaInInteraction?"is-alpha-interacting":""} ${this._isHueInInteraction?"is-hue-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":p`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${(t=this.state.value)!=null?t:this.props.value}"
                          />
                      `}

                <div
                    class="${this.componentUtils.className("__injected","s-group")}"
                >
                    ${!this._hasInput&&this.props.input?p`
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${(t=this.state.value)!=null?t:this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className("__input","s-input")}"
                              />
                          `:(this._hasInput,"")}
                    ${!this._hasButton&&this.props.button?p`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?p`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?p`
                          <div
                              class="${this.componentUtils.className("__backdrop")} ${this.props.backdropClass}"
                          ></div>
                      `:""}
                <div
                    class="${this.componentUtils.className("__picker")}"
                    tabindex="-1"
                >
                    <div
                        class="${this.componentUtils.className("__selectors")}"
                    >
                        <div
                            class="${this.componentUtils.className("__shade-wrapper")}"
                        >
                            <div
                                class="${this.componentUtils.className("__chest")}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className("__shade")}"
                                style="opacity: ${this._color.a}"
                            ></canvas>
                        </div>
                        <div
                            class="${this.componentUtils.className("__hue-wrapper")}"
                        >
                            <div
                                class="${this.componentUtils.className("__chest")}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className("__hue")}"
                            ></canvas>
                        </div>
                        <div
                            class="${this.componentUtils.className("__alpha-wrapper")} ${this._isAlphaWanted()?"active":""}"
                        >
                            <div
                                class="${this.componentUtils.className("__chest")}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className("__alpha")}"
                            ></canvas>
                        </div>
                    </div>

                    <div class="${this.componentUtils.className("__metas")}">
                        <div
                            class="${this.componentUtils.className("__formats")}"
                        >
                            <button
                                class="${this.componentUtils.className("__btn")} ${this.componentUtils.className("__hex-btn")} ${this.state.metasFormat==="hex"?"active":""}"
                                @click=${i=>i.preventDefault()}
                                @pointerup=${i=>{i.preventDefault(),this._setMetasFormat("hex")}}
                            >
                                HEX${this._isAlphaWanted()?"A":""}
                            </button>
                            <button
                                class="${this.componentUtils.className("__btn")} ${this.componentUtils.className("__rgb-btn")} ${this.state.metasFormat==="rgb"?"active":""}"
                                @click=${i=>i.preventDefault()}
                                @pointerup=${i=>{i.preventDefault(),this._setMetasFormat("rgb")}}
                            >
                                RGB${this._isAlphaWanted()?"A":""}
                            </button>
                            <button
                                class="${this.componentUtils.className("__btn")} ${this.componentUtils.className("__hsl-btn")} ${this.state.metasFormat==="hsl"?"active":""}"
                                @click=${i=>i.preventDefault()}
                                @pointerup=${i=>{i.preventDefault(),this._setMetasFormat("hsl")}}
                            >
                                HSL${this._isAlphaWanted()?"A":""}
                            </button>
                        </div>
                        <div
                            class="${this.componentUtils.className("__color")}"
                        >
                            <input
                                type="text"
                                readonly
                                class="${this.componentUtils.className("__color-input")}"
                                value="${this.state.metasFormat==="hex"?this._isAlphaWanted()?this._color.toHexaString():this._color.toHexString():this.state.metasFormat==="rgb"?this._isAlphaWanted()?this._color.toRgbaString():this._color.toRgbString():this._isAlphaWanted()?this._color.toHslaString():this._color.toHslString()}"
                            />
                            <div
                                class="${this.componentUtils.className("__preview")} "
                                @pointerup=${()=>this._copy()}
                            >
                                ${this.props.copyIconClass?p`
                                          <i
                                              class="${this.props.copyIconClass}"
                                          ></i>
                                      `:""}
                            </div>
                            ${this.props.eyeDropper&&window.EyeDropper?p`
                                      <div
                                          class="${this.componentUtils.className("__eye-dropper")} "
                                          @pointerup=${()=>this._eyeDropper()}
                                      >
                                          ${this.props.eyeDropperIconClass?p`
                                                    <i
                                                        class="${this.props.eyeDropperIconClass}"
                                                    ></i>
                                                `:""}
                                      </div>
                                  `:""}
                        </div>
                    </div>
                    ${this.props.actions.length?p`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?p`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${i=>i.preventDefault()}
                                                @pointerup=${i=>{i.preventDefault(),this._clear()}}
                                            >
                                                ${(t=this.props.i18n.clear)!=null?t:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?p`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${i=>i.preventDefault()}
                                                @pointerup=${i=>{i.preventDefault(),this._reset()}}
                                            >
                                                ${(t=this.props.i18n.reset)!=null?t:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?p`
                                            <button
                                                class="${this.componentUtils.className("__validate","s-btn s-color--accent")}"
                                                @click=${i=>i.preventDefault()}
                                                @pointerup=${i=>{i.preventDefault(),this._validate()}}
                                            >
                                                ${(t=this.props.i18n.validate)!=null?t:"Validate"}
                                            </button>
                                        `:""}
                              </div>
                          `:""}
                </div>
            </div>
        `}}function $t(e){return e instanceof Date||Object.prototype.toString.call(e)==="[object Date]"}function T(e){return $t(e)?new Date(e.getTime()):e==null?new Date(NaN):new Date(e)}function Jt(e){return $t(e)&&!isNaN(e.getTime())}function wt(e){var i=1<arguments.length&&arguments[1]!==void 0?arguments[1]:0;if(!(0<=i&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6");var t=T(e),i=(t.getDay()+7-i)%7;return t.setDate(t.getDate()-i),t.setHours(0,0,0,0),t}function kt(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},s=t.firstDayOfWeek,i=s===void 0?0:s,s=t.firstWeekContainsDate,r=s===void 0?1:s;if(!(1<=r&&r<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7");for(var a=T(e),o=a.getFullYear(),n=new Date(0),c=o+1;o-1<=c&&(n.setFullYear(c,0,r),n.setHours(0,0,0,0),n=wt(n,i),!(a.getTime()>=n.getTime()));c--);return n}function Gt(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},r=t.firstDayOfWeek,r=r===void 0?0:r,t=t.firstWeekContainsDate,t=t===void 0?1:t,s=T(e),i=wt(s,r),s=kt(s,{firstDayOfWeek:r,firstWeekContainsDate:t}),r=i.getTime()-s.getTime();return Math.round(r/6048e5)+1}var St={months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],firstDayOfWeek:0,firstWeekContainsDate:1},Kt=/\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;function g(e){for(var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:2,i="".concat(Math.abs(e)),s=e<0?"-":"";i.length<t;)i="0".concat(i);return s+i}function K(e){return 15*Math.round(e.getTimezoneOffset()/15)}function Q(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"",i=0<e?"-":"+",s=Math.abs(e),r=s%60;return i+g(Math.floor(s/60),2)+t+g(r,2)}var tt=function(e,t,i){return e=e<12?"AM":"PM",i?e.toLocaleLowerCase():e},A={Y:function(e){return e=e.getFullYear(),(e<=9999?"":"+").concat(e)},YY:function(e){return g(e.getFullYear(),4).substr(2)},YYYY:function(e){return g(e.getFullYear(),4)},M:function(e){return e.getMonth()+1},MM:function(e){return g(e.getMonth()+1,2)},MMM:function(e,t){return t.monthsShort[e.getMonth()]},MMMM:function(e,t){return t.months[e.getMonth()]},D:function(e){return e.getDate()},DD:function(e){return g(e.getDate(),2)},H:function(e){return e.getHours()},HH:function(e){return g(e.getHours(),2)},h:function(e){return e=e.getHours(),e===0?12:12<e?e%12:e},hh:function(){return g(A.h.apply(A,arguments),2)},m:function(e){return e.getMinutes()},mm:function(e){return g(e.getMinutes(),2)},s:function(e){return e.getSeconds()},ss:function(e){return g(e.getSeconds(),2)},S:function(e){return Math.floor(e.getMilliseconds()/100)},SS:function(e){return g(Math.floor(e.getMilliseconds()/10),2)},SSS:function(e){return g(e.getMilliseconds(),3)},d:function(e){return e.getDay()},dd:function(e,t){return t.weekdaysMin[e.getDay()]},ddd:function(e,t){return t.weekdaysShort[e.getDay()]},dddd:function(e,t){return t.weekdays[e.getDay()]},A:function(e,t){return(t.meridiem||tt)(e.getHours(),e.getMinutes(),!1)},a:function(e,t){return(t.meridiem||tt)(e.getHours(),e.getMinutes(),!0)},Z:function(e){return Q(K(e),":")},ZZ:function(e){return Q(K(e))},X:function(e){return Math.floor(e.getTime()/1e3)},x:function(e){return e.getTime()},w:function(e,t){return Gt(e,{firstDayOfWeek:t.firstDayOfWeek,firstWeekContainsDate:t.firstWeekContainsDate})},ww:function(e,t){return g(A.w(e,t),2)}};function Qt(e,t){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},s=t?String(t):"YYYY-MM-DDTHH:mm:ss.SSSZ",r=T(e);if(!Jt(r))return"Invalid Date";var a=i.locale||St;return s.replace(Kt,function(o,n){return n||(typeof A[o]=="function"?"".concat(A[o](r,a)):o)})}function et(e){return ie(e)||ee(e)||te()}function te(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function ee(e){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)==="[object Arguments]")return Array.from(e)}function ie(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}function it(e,t){var i,s=Object.keys(e);return Object.getOwnPropertySymbols&&(i=Object.getOwnPropertySymbols(e),t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),s.push.apply(s,i)),s}function se(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?it(i,!0).forEach(function(s){w(e,s,i[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):it(i).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(i,s))})}return e}function re(e,t){return ne(e)||oe(e,t)||ae()}function ae(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function oe(e,t){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)==="[object Arguments]"){var i=[],s=!0,r=!1,a=void 0;try{for(var o,n=e[Symbol.iterator]();!(s=(o=n.next()).done)&&(i.push(o.value),!t||i.length!==t);s=!0);}catch(c){r=!0,a=c}finally{try{s||n.return==null||n.return()}finally{if(r)throw a}}return i}}function ne(e){if(Array.isArray(e))return e}function w(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var le=/(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g,st=/\d/,$=/\d\d/,ce=/\d{3}/,pe=/\d{4}/,k=/\d\d?/,he=/[+-]\d\d:?\d\d/,rt=/[+-]?\d+/,de=/[+-]?\d+(\.\d{1,3})?/,Y="year",U="month",at="day",ot="hour",nt="minute",lt="second",F="millisecond",xt={},u=function(s,t,i){var s=Array.isArray(s)?s:[s],r=typeof i=="string"?function(a){return a=parseInt(a,10),w({},i,a)}:i;s.forEach(function(a){xt[a]=[t,r]})},ue=function(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")},M=function(e){return function(t){if(t=t[e],Array.isArray(t))return new RegExp(t.map(ue).join("|"));throw new Error("Locale[".concat(e,"] need an array"))}},N=function(e,t){return function(i,s){if(s=s[e],!Array.isArray(s))throw new Error("Locale[".concat(e,"] need an array"));if(s=s.indexOf(i),s<0)throw new Error("Invalid Word");return w({},t,s)}};function me(e){return e.meridiemParse||/[ap]\.?m?\.?/i}function fe(e){return"".concat(e).toLowerCase().charAt(0)==="p"}function _e(i){var i=re(i.match(/([+-]|\d\d)/g)||["-","0","0"],3),t=i[0],s=i[1],i=i[2],s=60*parseInt(s,10)+parseInt(i,10);return s===0?0:t==="+"?-s:+s}function ye(e,t){if(e!==void 0&&t!==void 0){if(t){if(e<12)return e+12}else if(e===12)return 0}return e}function ve(e){for(var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:new Date,i=[0,0,1,0,0,0,0],s=[t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()],r=!0,a=0;a<7;a++)e[a]===void 0?i[a]=(r?s:i)[a]:(i[a]=e[a],r=!1);return i}function ge(e,t,i,s,r,a,o){var n;return e<100&&0<=e?(n=new Date(e+400,t,i,s,r,a,o),isFinite(n.getFullYear())&&n.setFullYear(e)):n=new Date(e,t,i,s,r,a,o),n}function be(){for(var e,t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];var r=i[0];return r<100&&0<=r?(i[0]+=400,e=new Date(Date.UTC.apply(Date,i)),isFinite(e.getUTCFullYear())&&e.setUTCFullYear(r)):e=new Date(Date.UTC.apply(Date,i)),e}function $e(e,t,i){var s=t.match(le);if(!s)throw new Error;for(var r=s.length,a={},o=0;o<r;o+=1){var n=s[o],c=xt[n];if(c){var l=typeof c[0]=="function"?c[0](i):c[0],c=c[1],l=(l.exec(e)||[])[0],a=se({},a,{},c(l,i));e=e.replace(l,"")}else{if(c=n.replace(/^\[|\]$/g,""),e.indexOf(c)!==0)throw new Error("not match");e=e.substr(c.length)}}return a}function we(e,t){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};try{var s=i.locale,r=s===void 0?St:s,a=i.backupDate,o=a===void 0?new Date:a,n=$e(e,t,r),c=n.year,l=n.month,h=n.day,f=n.hour,C=n.minute,It=n.second,Mt=n.millisecond,Nt=n.isPM,q=n.date,P=n.offset,R=n.weekday,B=n.week;if(q)return q;var W,E=[c,l,h,f,C,It,Mt];if(E[3]=ye(E[3],Nt),B!==void 0&&l===void 0&&h===void 0)return W=kt(c===void 0?o:new Date(c,3),{firstDayOfWeek:r.firstDayOfWeek,firstWeekContainsDate:r.firstWeekContainsDate}),new Date(W.getTime()+7*(B-1)*24*3600*1e3);var L=ve(E,o),z=P!==void 0?(L[6]+=60*P*1e3,be.apply(void 0,et(L))):ge.apply(void 0,et(L));return R!==void 0&&z.getDay()!==R?new Date(NaN):z}catch{return new Date(NaN)}}u("Y",rt,Y),u("YY",$,function(i){var t=new Date().getFullYear(),t=Math.floor(t/100),i=parseInt(i,10);return w({},Y,100*(68<i?t-1:t)+i)}),u("YYYY",pe,Y),u("M",k,function(e){return w({},U,parseInt(e,10)-1)}),u("MM",$,function(e){return w({},U,parseInt(e,10)-1)}),u("MMM",M("monthsShort"),N("monthsShort",U)),u("MMMM",M("months"),N("months",U)),u("D",k,at),u("DD",$,at),u(["H","h"],k,ot),u(["HH","hh"],$,ot),u("m",k,nt),u("mm",$,nt),u("s",k,lt),u("ss",$,lt),u("S",st,function(e){return w({},F,100*parseInt(e,10))}),u("SS",$,function(e){return w({},F,10*parseInt(e,10))}),u("SSS",ce,F),u(["A","a"],me,function(e,t){return{isPM:typeof t.isPM=="function"?t.isPM(e):fe(e)}}),u(["Z","ZZ"],he,function(e){return{offset:_e(e)}}),u("x",rt,function(e){return{date:new Date(parseInt(e,10))}}),u("X",de,function(e){return{date:new Date(1e3*parseFloat(e))}}),u("d",st,"weekday"),u("dd",M("weekdaysMin"),N("weekdaysMin","weekday")),u("ddd",M("weekdaysShort"),N("weekdaysShort","weekday")),u("dddd",M("weekdays"),N("weekdays","weekday")),u("w",k,"week"),u("ww",$,"week");class ct extends b{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["select","validate","reset","clear","close"],default:["select","validate","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",default:"YYYY-MM-DD"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},calendar:{description:"Specify if you want to display a calendar or not",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{}},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disable:{description:'Specify what you want to disable. It can be "weekend", "week" or "2022-12-19" (dates)',type:{type:"Array<String>",splitChars:[","," "]},default:[]},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},hours:{description:"Specify the hours you want in the time selector",type:"Array<Number>",default:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},minutes:{description:"Specify the minutes you want in the time selector",type:"Array<Number>",default:[0,5,10,15,20,25,30,25,40,45,50,55]},fromYear:{description:"Specify the first year to allow selection from",type:"Number",default:new Date().getFullYear()-100},toYear:{description:"Specify the last year to allow selection from",type:"Number",default:new Date().getFullYear()+100}}}}var ke=`.s-datetime-picker{display:inline-block;position:relative}.s-datetime-picker[disabled]{pointer-events:none}.s-datetime-picker .s-backdrop{pointer-events:none;opacity:0}.s-datetime-picker .s-datetime-picker__root{width:100%}.s-datetime-picker .s-datetime-picker__root.is-interacting *{cursor:none!important}.s-datetime-picker .s-datetime-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}@media screen and (max-width: 639px){.s-datetime-picker .s-datetime-picker__picker{position:fixed;bottom:0;top:auto!important;left:0!important;right:auto;width:100vw;transform:translateY(100%)}}.s-datetime-picker[inline] .s-datetime-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-datetime-picker .s-datetime-picker__actions{display:flex}.s-datetime-picker .s-datetime-picker__actions button{flex-grow:1;text-align:center}.s-datetime-picker:focus-within .s-datetime-picker__picker{opacity:1;pointer-events:all}.s-datetime-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-datetime-picker .s-datetime-picker__calendar:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__calendar table{width:100%}.s-datetime-picker .s-datetime-picker__calendar-item{cursor:pointer;touch-action:manipulation}.s-datetime-picker .s-datetime-picker__calendar-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__selector{height:8em;overflow-y:auto;scroll-snap-type:y mandatory;flex-grow:1}.s-datetime-picker .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__selector-item:first-child{-webkit-margin-before:2.5em;margin-block-start:2.5em}.s-datetime-picker .s-datetime-picker__selector-item:last-child{-webkit-margin-after:2.5em;margin-block-end:2.5em}.s-datetime-picker .s-datetime-picker__selector-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__date-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:first-child{-webkit-margin-before:1em;margin-block-start:1em}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:last-child{-webkit-margin-after:1em;margin-block-end:1em}.s-datetime-picker .s-datetime-picker__date-selectors,.s-datetime-picker .s-datetime-picker__time-selectors{position:relative;display:flex}
`,pt=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,a){function o(l){try{c(s.next(l))}catch(h){a(h)}}function n(l){try{c(s.throw(l))}catch(h){a(h)}}function c(l){var h;l.done?r(l.value):((h=l.value)instanceof i?h:new i(function(f){f(h)})).then(o,n)}c((s=s.apply(e,t||[])).next())})};class Se extends _{constructor(){var t;super(m({name:"s-datetime-picker",interface:ct})),this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isInInteraction=!1,this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(t=this._$button)!=null&&t.addEventListener("click",i=>i.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return _.createProperties({},ct)}static get styles(){return S`
            ${x(`
                ${ke}
            `)}
        `}static get state(){return{year:0,month:0,day:0,hour:12,minutes:0,displayedYear:0,displayedMonth:0,format:void 0}}mount(){return pt(this,void 0,void 0,function*(){this._restoreState()})}firstUpdated(){return pt(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$input||(this._$input=this.querySelector("input")),this.componentUtils.fastdom.mutate(()=>{var t;(t=this._$input)!=null&&t.hasAttribute("name")||(t=this._$input)!=null&&t.setAttribute("name",this.props.name),(t=this._$input)!=null&&t.hasAttribute("placeholder")||(t=this._$input)!=null&&t.setAttribute("placeholder",this.props.placeholder),(t=this._$input)!=null&&t.hasAttribute("autocomplete")||(t=this._$input)!=null&&t.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0)}),this._$days=this.querySelector(".s-datetime-picker__days"),this._$months=this.querySelector(".s-datetime-picker__months"),this._$years=this.querySelector(".s-datetime-picker__years"),this._$hours=this.querySelector(".s-datetime-picker__hours"),this._$minutes=this.querySelector(".s-datetime-picker__minutes"),this.addEventListener("focusin",t=>{var i;(i=this._floatApi)!=null&&i.update()}),this._updateInput("init"),this.props.inline||(this._floatApi=H(this._$picker,this._$root,Object.assign({},this.props.floatSettings))),this._scrollSelectorsToStateValues("initial"),this._initInteractions()})}_isDateNeeded(){return this.props.format.match(/(d{1,4}|D{1,2}|M{1,4}|Y{2,4})/)}_isTimeNeeded(){return this.props.format.match(/(h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3})/)}_isSelectedDatetimeValid(){return!this._isDateDisabled(this.state.day,this.state.month,this.state.year)}_isDateDisabled(t,i=this.state.displayedMonth,s=this.state.displayedYear){if(s!==-1&&this.props.disable.includes(String(s)))return!0;if(i!==-1){var r=["january","february","march","april","may","june","july","august","september","october","november","december"];for(let l=0;l<r.length;l++){var a=r[l];if(this.props.disable.includes(a)&&i===l)return!0}}if(t===-1)return!1;var o=new Date(s,i,t).getDay(),n=["sunday","monday","thuesday","wednesday","thursday","friday","saturday"];for(let l=0;l<n.length;l++){var c=n[l];if(this.props.disable.includes(c)&&o===l)return!0}return!!this.props.disable.includes(this._getDisableDateFromDate(t))||!!(this.props.disable.includes("week")&&1<o&&o<=5)||!(!this.props.disable.includes("weekend")||o!==0&&o!==6)||void 0}_setDay(t,i=!1){this.state.day=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$days,!0,i)}),this._updateInput("select")}_setMonth(t,i=!1){this.state.month=t,this.state.displayedMonth=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$months,!0,i)}),this._updateInput("select")}_setYear(t,i=!1){this.state.year=t,this.state.displayedYear=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$years,!0,i)}),this._updateInput("select")}_setHour(t,i=!1){this.state.hour=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$hours,!0,i)}),this._updateInput("select")}_setMinutes(t,i=!1){this.state.minutes=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$minutes,!0,i)}),this._updateInput("select")}_initInteractions(){let t,i,s,r,a;this._$years.addEventListener("scroll",o=>{I(this._$years)&&(clearTimeout(s),this._$years.classList.add("scrolling"),s=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$years);this._setYear(parseInt(this._$years.children[n-1].innerText)),this._$years.classList.remove("scrolling")},400))}),this._$months.addEventListener("scroll",o=>{I(this._$months)&&(clearTimeout(i),this._$months.classList.add("scrolling"),i=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$months);this._setMonth(n-1),this._$months.classList.remove("scrolling")},400))}),this._$days.addEventListener("scroll",o=>{I(this._$days)&&(clearTimeout(t),this._$days.classList.add("scrolling"),t=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$days);this._setDay(n),this._$days.classList.remove("scrolling")},400))}),this._$hours.addEventListener("scroll",o=>{I(this._$hours)&&(clearTimeout(r),this._$hours.classList.add("scrolling"),r=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$hours);this._setHour(parseInt(this._$hours.children[n-1].innerText)),this._$hours.classList.remove("scrolling")},400))}),this._$minutes.addEventListener("scroll",o=>{I(this._$minutes)&&(clearTimeout(a),this._$minutes.classList.add("scrolling"),a=setTimeout(()=>{var n=this._getSelectedIdxFromSelector(this._$minutes);this._setMinutes(parseInt(this._$minutes.children[n-1].innerText)),this._$minutes.classList.remove("scrolling")},400))})}_getSelectedIdxFromSelector(r){var i=r.getBoundingClientRect(),i=r.scrollTop+i.height/2,s=r.children.length,r=Array.from(r.children).reduce((a,o)=>a+o.getBoundingClientRect().height,0);return Math.round(s/r*i)}_scrollSelectorsToStateValues(t){t=t!=="initial",this._scrollSelectorToActiveItem(this._$years,t),this._scrollSelectorToActiveItem(this._$months,t),this._scrollSelectorToActiveItem(this._$days,t),this._scrollSelectorToActiveItem(this._$hours,t),this._scrollSelectorToActiveItem(this._$minutes,t)}_scrollSelectorToActiveItem(t,i=!0,s){const r=t.querySelector(".active");var a;r&&(a=r.getBoundingClientRect(),t.scrollTo({top:a.height*Array.from(t.children).indexOf(r),left:0,behavior:i?"smooth":"instant"}))}_updateInput(t){t!=="init"&&!this.props.updateInput.includes(t)||(this._$input.value=Qt(new Date(this.state.year,this.state.month,this.state.day,this.state.hour,this.state.minutes,0),this.props.format),t!=="init"&&this.componentUtils.dispatchEvent("change",{detail:{}}),this.requestUpdate())}_restoreState(){var t;{this.state.value=void 0;let i=new Date;(t=this._$input)!=null&&t.value&&(i=we(this._$input.value,this.props.format,{backupDate:new Date})),this.state.year=i.getFullYear(),this.state.month=i.getMonth(),this.state.day=i.getDate(),this.state.displayedYear=this.state.year,this.state.displayedMonth=this.state.month}}_validate(){var t,i;this._updateInput("validate"),(i=(t=document.activeElement)==null?void 0:t.blur)!=null&&i.call(t)}_clear(){this._updateInput("clear")}_reset(){this._updateInput("reset")}_copy(){const t=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,setTimeout(()=>{this.props.copyIconClass=t},1e3)}_getDisableDateFromDate(t){return`${this.state.displayedYear}-${String(this.state.displayedMonth+1).padStart(2,"0")}-`+String(t).padStart(2,"0")}_getMinutes(){return this.props.minutes}_getHours(){return this.props.hours}_getDaysInMonth(t,i){return new Date(t,i+1,0).getDate()}_getDays(){var t=this._getDaysInMonth(this.state.displayedYear,this.state.displayedMonth);return Array.from(Array(t).keys())}_getMonths(){return this.props.i18n.months.filter((t,i)=>!0)}_getYears(){const t=[];for(let i=this.props.fromYear;i<=this.props.toYear;i++)t.push(i);return t}render(){var t;let i=new Date(this.state.displayedYear,this.state.displayedMonth).getDay(),s=32-new Date(this.state.displayedYear,this.state.displayedMonth,32).getDate();const r=new Date;let a=1;return p`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isInInteraction?"is-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":p`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${(t=this.state.value)!=null?t:this.props.value}"
                          />
                      `}

                <div
                    class="${this.componentUtils.className("__injected","s-group")}"
                >
                    ${!this._hasInput&&this.props.input?p`
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${(t=this.state.value)!=null?t:this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className("__input","s-input")}"
                              />
                          `:(this._hasInput,"")}
                    ${!this._hasButton&&this.props.button?p`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?p`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?p`
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
                            ${Array.from(Array(6).keys()).map(o=>p`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(n=>{const c=a;var l=p`
                                                    ${o===0&&n<i-1?p` <td></td>`:a>s?p`<td></td>`:p`
                                                              <td>
                                                                  <div
                                                                      @click=${h=>this._setDay(c)}
                                                                      class="${this.componentUtils.className("__calendar-item")} ${a===r.getDate()&&r.getMonth()===this.state.displayedMonth&&r.getFullYear()===this.state.displayedYear?"today":""} ${this.componentUtils.className("__calendar-item")} ${a===this.state.day&&this.state.month===this.state.displayedMonth&&this.state.year===this.state.displayedYear?"active":""} ${this._isDateDisabled(a)?"disabled":""}"
                                                                  >
                                                                      <span
                                                                          >${a}</span
                                                                      >
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;return o===0&&n<i-1||a++,l})}
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
                            ${this._getDays().map(o=>p`
                                    <div
                                        @click=${()=>this._setDay(o+1)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__day")} ${this.state.day===o+1?"active":""} ${this._isDateDisabled(o+1)?"disabled":""}"
                                    >
                                        <span>
                                            ${String(o+1).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__months")}"
                        >
                            ${this._getMonths().map((o,n)=>p`
                                    <div
                                        @click=${()=>this._setMonth(n)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__month")} ${this.state.displayedMonth===n?"active":""} ${this._isDateDisabled(-1,n)?"disabled":""}"
                                    >
                                        <span> ${o} </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__years")}"
                        >
                            ${this._getYears().map((o,n)=>p`
                                    <div
                                        @click=${()=>this._setYear(o)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__year")} ${this.state.displayedYear===o?"active":""} ${this._isDateDisabled(-1,-1,o)?"disabled":""}"
                                    >
                                        <span> ${o} </span>
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
                            ${this._getHours().map(o=>p`
                                    <div
                                        @click=${()=>this._setHour(o)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__hour")} ${this.state.hour===o?"active":""}"
                                    >
                                        <span>
                                            ${String(o).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__minutes")}"
                        >
                            ${this._getMinutes().map((o,n)=>p`
                                    <div
                                        @click=${()=>this._setMinutes(o)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__minutes")} ${this.state.minutes===o?"active":""}"
                                    >
                                        <span>
                                            ${String(o).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    ${this.props.actions.length?p`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?p`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${o=>{o.preventDefault(),this._clear()}}
                                            >
                                                ${(t=this.props.i18n.clear)!=null?t:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?p`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${o=>{o.preventDefault(),this._reset()}}
                                            >
                                                ${(t=this.props.i18n.reset)!=null?t:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?p`
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.componentUtils.className("__validate","s-btn s-color--accent")}"
                                                @click=${o=>{o.preventDefault(),this._validate()}}
                                            >
                                                ${(t=this.props.i18n.validate)!=null?t:"Validate"}
                                            </button>
                                        `:""}
                              </div>
                          `:""}
                </div>
            </div>
        `}}function xe(e={},t="s-datetime-picker"){_.define(t,Se,e)}class ht extends b{static get _definition(){return{name:{description:"Specify a name that will be attributed to the hidden input created automatically",type:"String",default:"rate"},value:{description:"Specify a base value for the rating",type:"Number",default:3},min:{description:"Specify the minimum rate you accept",type:"Number",default:1},max:{description:"Specify the maximum rate you accept",type:"Number",default:5},icon:{description:'This works only if you use the "s-icon:..." class notation. Define the icon you want to use',type:"String",default:"star"},iconClass:{description:'Specify a custom icon class you want to use. If this is set, override the "icon" parameter',type:"String"},readonly:{description:"Specify if you want your rating component to just display the value and that the user cannot interact with it or not",type:"Boolean",default:!1,physical:!0}}}}function Ce(e={},t="s-rating"){dt.define(t,dt,e)}var De=`.s-rating{display:inline-block;position:relative;cursor:pointer}.s-rating .s-rating__icons-wrapper{display:flex}.s-rating .s-rating__base{opacity:.3}.s-rating .s-rating__rate{position:absolute;top:0;left:0}.s-rating:hover .s-rating__rate{-webkit-clip-path:polygon(0 0,100% 0,100% 100%,0 100%);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}.s-rating .s-rating__rate{-webkit-clip-path:polygon(0 0,calc(var(--s-rating-percent) * 1%) 0,calc(var(--s-rating-percent) * 1%) 100%,0 100%);clip-path:polygon(0 0,calc(var(--s-rating-percent) * 1%) 0,calc(var(--s-rating-percent) * 1%) 100%,0 100%)}.s-rating .s-rating__rate i:hover~i{opacity:0}.s-rating[readonly]{pointer-events:none}
`;class dt extends _{constructor(){super({name:"s-rating",interface:ht}),this.state={value:0}}static get properties(){return _.createProperties({},ht)}static get styles(){return S`
            ${x(De)}
        `}mount(){this._setRating(this.props.value)}_setRating(t){this.state.value=t,this.componentUtils.dispatchEvent("change",{detail:this.state})}render(){return p`
            <div
                class="${this.componentUtils.className("__root")}"
                style="--s-rating-rate: ${this.state.value}; --s-rating-min: ${this.props.min}; --s-rating-max: ${this.props.max}; --s-rating-percent: ${100/this.props.max*this.state.value};"
            >
                <input
                    type="hidden"
                    name="${this.props.name}"
                    value="${this.state.value}"
                />
                <div
                    class="${this.componentUtils.className("__base")} ${this.componentUtils.className("__icons-wrapper")}"
                >
                    ${[...Array(this.props.max).keys()].map(t=>p`
                            <i
                                class="${this.props.iconClass||"s-icon:"+this.props.icon}"
                            ></i>
                        `)}
                </div>
                <div
                    class="${this.componentUtils.className("__rate")} ${this.componentUtils.className("__icons-wrapper")}"
                >
                    ${[...Array(this.props.max).keys()].map(t=>p`
                            <i
                                @click=${()=>this._setRating(t+1)}
                                class="${this.props.iconClass||"s-icon:"+this.props.icon}"
                            ></i>
                        `)}
                </div>
            </div>
        `}}class ut extends b{static get _definition(){return{to:{description:"The target when to scroll. Must be a valid css selector",type:"String",required:!0},duration:{description:"Specify the duration of the scroll in ms",type:"number",default:v.get("scroll.duration")},offset:{description:"Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...",type:"number",default:v.get("scroll.offset")},offsetX:{description:"Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...",type:"number",default:v.get("scroll.offsetX")},offsetY:{description:"Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...",type:"number",default:v.get("scroll.offsetY")}}}}function Ie(e={},t="s-scroll"){mt.define(t,mt,e)}var Me=`s-scroll{display:inline-block;cursor:pointer}
`,Ne=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,a){function o(l){try{c(s.next(l))}catch(h){a(h)}}function n(l){try{c(s.throw(l))}catch(h){a(h)}}function c(l){var h;l.done?r(l.value):((h=l.value)instanceof i?h:new i(function(f){f(h)})).then(o,n)}c((s=s.apply(e,t||[])).next())})};class mt extends _{static get properties(){return _.createProperties({},ut)}static get styles(){return S`
            ${x(`
                ${Me}
            `)}
        `}constructor(){super(m({name:"s-scroll",interface:ut}))}firstUpdated(){return Ne(this,void 0,void 0,function*(){this.addEventListener("click",t=>{t.preventDefault(),this._scrollTo(this.props.to)})})}_scrollTo(t){var i=v.get("scroll"),s=this.props.duration||(i==null?void 0:i.duration)||300,r=this.props.offset||i.offset||0,a=this.props.offsetX||i.offsetX||r,o=this.props.offsetY||i.offsetY||r;switch(t){case"top":j("top",{duration:s,offset:r,offsetX:a,offsetY:o});break;case"bottom":j("bottom",{duration:s,offset:r,offsetX:a,offsetY:o});break;default:var n=document.querySelector(t);if(console.log("SCRO",t,n),!n)return;j(n,{duration:s,offset:r,offsetX:a,offsetY:o})}}render(){return p``}}class ft extends b{static get _definition(){return{darkModeicon:{description:"Specify if you want to dark mode icon or not",type:"Boolean",default:!1},darkModeIconClass:{description:"Specify the class to apply on the i tag for the dark mode icon",type:"String",default:"s-icon:dark-mode"}}}}var Ae=`.s-theme-switcher{display:inline-block;position:relative;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item{display:flex;align-items:center;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode{opacity:0;pointer-events:none;display:flex;align-items:center}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode.visible{opacity:1;pointer-events:all}
`;function Ue(e={},t="s-theme-switcher"){_t.define(t,_t,e)}class _t extends _{constructor(){super({name:"s-theme-switcher",interface:ft}),this._themes=v.themes}static get properties(){return _.createProperties({},ft)}static get styles(){return S`
            ${x(Ae)}
        `}_toggleDarkMode(){v.isDark()?v.setThemeVariant("light"):v.setThemeVariant("dark"),this.componentUtils.dispatchEvent("change",{detail:v}),this.requestUpdate()}_setTheme(t){v.setTheme(t),this.requestUpdate()}render(){const t=Object.keys(this._themes),i=v.getThemeMetas(),s=v.theme;return p`
            <div class="${this.componentUtils.className("__root")}">
                ${t.length===1?p`
                          <input
                              type="checkbox"
                              @change=${()=>this._toggleDarkMode()}
                              class="${this.componentUtils.className("__switch","s-switch")}"
                              ?checked=${v.isDark()}
                          />
                          ${this.props.darkModeIcon?p`
                                    <i
                                        class="${this.componentUtils.className("__icon")} ${this.props.darkModeIconClass}"
                                    ></i>
                                `:""}
                      `:p`
                          <div
                              class="${this.componentUtils.className("__dropdown-container")} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${i.title} (${i.variant})
                              </span>
                              <div
                                  class="${this.componentUtils.className("__dropdown")} s-dropdown"
                              >
                                  ${t.map(r=>{var a=this._themes[r];return p`
                                          <div
                                              class="${this.componentUtils.className("__dropdown-item","s-dropdown-item")} ${s===r?"active":""}"
                                              @click=${o=>{o.preventDefault(),this._setTheme(r)}}
                                          >
                                              <div
                                                  class="${this.componentUtils.className("__theme-name")}"
                                              >
                                                  ${a.metas.title}
                                              </div>
                                              <div
                                                  class="${this.componentUtils.className("__dark-mode")} ${s===r?"visible":""}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${o=>{o.stopPropagation(),this._toggleDarkMode()}}
                                                      class="${this.componentUtils.className("__switch","s-switch")}"
                                                      ?checked=${v.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon?p`
                                                            <i
                                                                class="${this.componentUtils.className("__icon")} ${this.props.darkModeIconClass}"
                                                            ></i>
                                                        `:""}
                                              </div>
                                          </div>
                                      `})}
                              </div>
                          </div>
                      `}
            </div>
        `}}class Te extends b{static get _definition(){return{ref:{description:"Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM",type:"String"},position:{description:"Specify the placement of your floating element. By default it will try to be placed as good as possible.",type:"String",values:["top","right","bottom","left","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end","auto"],default:"auto"},shift:{description:"Specify a space between the floating element and the viewport side to respect",type:"Number",default:10},offset:{description:"Specify a space between the floating element and the reference one to respect",type:"Number"},arrow:{description:"Specify if you want an arrow or not",type:"Boolean",default:!0},arrowSize:{description:"Specify the size of the arrow in px",type:"Number",default:15},arrowPadding:{description:"Specify the padding of the arrow in px",type:"Number",default:10}}}}function Ee(e={},t="s-floating"){yt.define(t,yt,Object.assign({},e))}var Le=`.s-floating{transform:none;transition:none}.s-floating:before{content:none}.s-floating:after{content:none}.s-floating .s-floating__arrow{position:absolute;background:hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));width:var(--arrow-size, 8px);height:var(--arrow-size, 8px);transform:rotate(45deg)}
`;class yt extends bt{constructor(t,i,s){super(t,i,m({name:"s-floating",interface:Te,style:Le},s!=null?s:{})),this.props.ref?this._$ref=document.querySelector(this.props.ref):this._$ref=this.node.parentElement}mount(){this.props.offset===void 0&&this.props.arrow&&(this.props.offset=this.props.arrowSize),H(this.node,this._$ref,this.props)}}var y={min:{string:"Must have at least %n characters",object:"Must have at least %n properties",number:"Must be greater than %n",array:"Must have at least %n items"},max:{string:"Must have at max %n characters",object:"Must have at max %n properties",number:"Must be lower than %n",array:"Must have at max %n items"},email:{string:"Must be a valid email address"},required:{default:"This is required"},isoDate:{string:"Must be a valid ISO date"},isoTime:{string:"Must be a valid ISO time"},isoDateTime:{string:"Must be a valid ISO date time"},integer:{string:"Must be an integer"},number:{string:"Must be an number"},negative:{string:"Must be a negative number"},positive:{string:"Must be a positive number"},pattern:{string:"Must match the pattern %pattern"},alphanum:{string:"Must contain only alphanumeric characters"},creditCard:{string:"Must be a valid credit card number"},color:{string:"Must be a valid color (hex, rgb, rgba, hsl, hsla)"},hex:{string:"Must be a valid hex color"},password:{weak:"",medium:"Must be >=6 characters, at least 1 lowercase/uppercase/special character",strong:"Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character"}};const je={description:"Validate an alphanum string",type:"String"};function Oe(e,t){let i,s;if(t=m({i18n:y.alphanum,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "alphanum" validation only works with string');return{valid:s=(e=t.trim?e.trim():e).match(/^[a-z0-9]+$/i),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const Ye={description:"Validate a color string",type:"String"};function Fe(e,t){let i,s;if(t=m({i18n:y.color,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "color" validation only works with string');return t.trim&&(e=e.trim()),{valid:s=Ut(e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const Ve={description:"Validate a credit card string",type:"String"};function He(e,t){let i,s;if(t=m({i18n:y.creditCard,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "creditCard" validation only works with string');return{valid:s=Pt(e=t.trim?e.trim():e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const qe={description:"Validate an email string",type:"String"};function Pe(e,t){let i,s;if(t=m({i18n:y.email,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "email" validation only works with string');return{valid:s=Rt(e=t.trim?e.trim():e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const Re={description:"Validate a hexadecimal string",type:"String"};function Be(e,t){let i,s;if(t=m({i18n:y.hex,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "hex" validation only works with string');return{valid:s=(e=t.trim?e.trim():e).match(/^#[a-zA-Z0-9]{3,6}$/),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const We={description:"Validate an integer",type:"number"};function ze(e,t){let i,s;if(t=m({i18n:y.integer,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "integer" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e)&&Number.isInteger(e))||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}}const Ze={description:"Validate an iso date string",type:"String"};function Xe(e,t){let i,s;if(t=m({i18n:y.isoDate,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "isoDate" validation only works with string');return{valid:s=Bt(e=t.trim?e.trim():e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const Je={description:"Validate an iso date string",type:"String"};function Ge(e,t){let i,s;if(t=m({i18n:y.isoDateTime,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "isoDateTime" validation only works with string');return{valid:s=Wt(e=t.trim?e.trim():e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const Ke={description:"Validate an iso time string",type:"String"};function Qe(e,t){let i,s;if(t=m({i18n:y.isoTime,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "isoTime" validation only works with string');return{valid:s=zt(e=t.trim?e.trim():e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}}const ti={description:'Validate string, array, object and number using the "max" rule',type:"String|Array|Object|Number"};function ei(e,t,i){var s;let r,a;var o=m({i18n:y.max,trim:!0},i!=null?i:{});switch(!0){case typeof e=="string":o.trim&&(e=e.trim()),a=e.length<=t,r=(s=o.i18n)==null?void 0:s.string.replace("%n",t);break;case typeof e=="number":a=e<=t,r=(s=o.i18n)==null?void 0:s.number.replace("%n",t);break;case Array.isArray(e):a=e.length<=t,r=(s=o.i18n)==null?void 0:s.array.replace("%n",t);break;case typeof e=="object":a=Object.keys(e).length<=t,r=(s=o.i18n)==null?void 0:s.object.replace("%n",t);break;default:throw new Error('Sorry but the "max" validation only works with string, number, array or object values.')}return{valid:a,message:r}}const ii={description:'Validate string, array, object and number using the "min" rule',type:"String|Array|Object|Number"};function si(e,t,i){var s;let r,a;var o=m({i18n:y.min,trim:!0},i!=null?i:{});switch(!0){case typeof e=="string":o.trim&&(e=e.trim()),a=e.length>=t,r=(s=o.i18n)==null?void 0:s.string.replace("%n",t);break;case typeof e=="number":a=t<=e,r=(s=o.i18n)==null?void 0:s.number.replace("%n",t);break;case Array.isArray(e):a=e.length>=t,r=(s=o.i18n)==null?void 0:s.array.replace("%n",t);break;case typeof e=="object":a=Object.keys(e).length>=t,r=(s=o.i18n)==null?void 0:s.object.replace("%n",t);break;default:throw new Error('Sorry but the "min" validation only works with string, number, array or object values.')}return{valid:a,message:r}}const ri={description:"Validate an negative number",type:"number"};function ai(e,t){let i,s;if(t=m({i18n:y.negative,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "negative" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e)&&e<0)||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}}const oi={description:"Validate an number",type:"number"};function ni(e,t){let i,s;if(t=m({i18n:y.number,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "number" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e))||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}}const li={description:"Validate a password string",type:"String"};function ci(e,t,i){let s,r=!1;const a=m({i18n:y.password,trim:!0,weakReg:/.*/,mediumReg:/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,strongReg:/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/},i!=null?i:{});if(typeof e!="string")throw new Error('Sorry but the "password" validation only works with string');a.trim&&(e=e.trim());let o=[];return a.weakReg.test(e)&&(e&&o.push("weak"),t==="weak"&&(r=!0)),a.mediumReg.test(e)&&(e&&o.push("medium"),t==="medium"&&(r=!0)),a.strongReg.test(e)&&(e&&o.push("strong"),t==="strong"&&(r=!0)),r||(s=(i=a.i18n)==null?void 0:i[t]),{valid:r,message:s,metas:{levels:["weak","medium","strong"],validLevels:o}}}const pi={description:"Validate a string using a regex pattern",type:"String"};function hi(e,t,i){let s,r;if(i=m({i18n:y.pattern,trim:!0},i!=null?i:{}),typeof e!="string")throw new Error('Sorry but the "pattern" validation only works with string');return i.trim&&(e=e.trim()),{valid:r=new RegExp(t).test(e),message:s=r?s:(e=i.i18n)==null?void 0:e.string.replace("%pattern",t)}}const di={description:"Validate an positive number",type:"number"};function ui(e,t){let i,s;if(t=m({i18n:y.positive,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "positive" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e)&&0<=e)||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}}const mi={description:"Make sure a value has been provided",type:"Boolean"};function fi(e,t){let i,s;return t=m({i18n:y.required,trim:!0},t!=null?t:{}),{valid:s=(e=typeof e=="string"&&t.trim?e.trim():e)!=null&&e!=="",message:i=s?i:(e=t.i18n)==null?void 0:e.default}}class d extends Tt{constructor(t){super(m({i18n:y},t!=null?t:{}))}static registerValidator(t,i,s){d._validators[t]={validator:i,settings:s}}static registerPreset(t,i,s){d._presets[t]={rules:i,settings:s}}static getValidatorsDefinition(){const t={};for(var[i,s]of Object.entries(d._validators))s.settings.definition&&(t[i]=s.settings.definition);return t}validate(t,i,s){var r,a;let o={valid:!0,rules:{},messages:[]},n=i;if(typeof i=="string"){if(!d._presets[i])throw new Error(`Sorry but the preset "${i}" is not registered`);n=d._presets[i].rules}for([r,a]of Object.entries(n)){let l=(c=a.settings)!=null?c:{},h=(c=a.value)!=null?c:a,f;const C=d._validators[r];if(!C)throw new Error(`Sorry but the validator "${r}" is not registered`);var c=Object.assign(Object.assign({},l),{i18n:(c=this.settings.i18n[r])!=null?c:{}});(f=typeof i=="boolean"?C.validator(t,c):C.validator(t,h,c)).valid?o.rules[r]=f:(f.message=f.message.replace("%value",t).replace("%validator",r),o.valid=!1,o.rules[r]=f,o.messages.push(f.message))}return o}}d._validators={},d._presets={},d.registerValidator("min",si,{definition:ii}),d.registerValidator("max",ei,{definition:ti}),d.registerValidator("email",Pe,{definition:qe}),d.registerValidator("required",fi,{definition:mi}),d.registerValidator("isoDate",Xe,{definition:Ze}),d.registerValidator("isoTime",Qe,{definition:Ke}),d.registerValidator("isoDateTime",Ge,{definition:Je}),d.registerValidator("integer",ze,{definition:We}),d.registerValidator("number",ni,{definition:oi}),d.registerValidator("negative",ai,{definition:ri}),d.registerValidator("positive",ui,{definition:di}),d.registerValidator("pattern",hi,{definition:pi}),d.registerValidator("alphanum",Oe,{definition:je}),d.registerValidator("creditCard",He,{definition:Ve}),d.registerValidator("color",Fe,{definition:Ye}),d.registerValidator("hex",Be,{definition:Re}),d.registerValidator("password",ci,{definition:li});var _i=`@-webkit-keyframes error-message-appear{0%{line-height:1;max-height:0}to{max-height:2em;line-height:2}}@keyframes error-message-appear{0%{line-height:1;max-height:0}to{max-height:2em;line-height:2}}.s-form-validate+.s-form-validate-error-message{text-align:end;color:hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0)) * 1%),calc((var(--s-theme-color-error-l, 0)) * 1%),var(--s-theme-color-error-a, 1));overflow:hidden;max-height:0;line-height:1;margin:0;-webkit-animation:.2s error-message-appear var(--s-theme-easing-default, 0) forwards;animation:.2s error-message-appear var(--s-theme-easing-default, 0) forwards}
`;const Ct=d.getValidatorsDefinition(),Dt={};for(let[e,t]of Object.entries(Ct))Dt[e+"Message"]={description:`The message to display when the validator "${e}" fails`,type:"String"};class V extends b{static get _definition(){return Object.assign(Object.assign(Object.assign({},Ct),Dt),{type:{description:"Specify the validation type. Usually automatically detected depending on the field type",type:"String",default:"text"},on:{description:'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',type:"Array<String>",values:["keyup","change","submit","enter","reset"],default:["keyup","change","submit","enter","reset"]},errorClass:{description:"Specify the class to apply when theres an error",type:"String",default:"s-form-validate--error s-color--error"},validClass:{description:"Specify the class to apply on your s-form-validate element when validation is passed successfully",type:"String",default:"s-form-validate--valid s-color--success"},handlers:{description:'Specify some custom handlers by validator that will be executed in addition to the default validate behavior. The handler will take as argument an object containing the "result" SValidator result, the "$feature" that represent the s-validate node, the "$form" node if exists, the "$node" attached node if using the "nodes" property, the "$field" that represent the input field handled and the "props" that represent the feature properties',type:"Object",default:{}},nodes:{description:'Specify a css selector that target some HTMLElements used for the validation. Every HTMLElement has to specify 1 validator by using element attributes (same as on the feature itself). Classes are applied on each "node" to specify if the validator is valid or not',type:"String"},language:{description:"Specify the language you want to use for messages",type:"String",default:"en"},displayError:{description:"Specify if you want to display the error messages or not",type:"Boolean",default:!0},errorContainerAttr:{description:"Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element",type:"String",default:"s-form-validate-error"}})}}function yi(e={},t="s-form-validate"){vt.define(t,vt,Object.assign({mountWhen:"interact"},e))}var vi=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,a){function o(l){try{c(s.next(l))}catch(h){a(h)}}function n(l){try{c(s.throw(l))}catch(h){a(h)}}function c(l){var h;l.done?r(l.value):((h=l.value)instanceof i?h:new i(function(f){f(h)})).then(o,n)}c((s=s.apply(e,t||[])).next())})};class vt extends bt{constructor(t,i,s){var r;Object.keys((r=(r=Et.getDefaultProps(t))==null?void 0:r.customValidations)!=null?r:{}).forEach(a=>{V.definition[a]||(V.definition[a]={type:"String|Boolean"})}),super(t,i,m({name:"s-form-validate",interface:V,style:_i},s!=null?s:{})),this._nodeByValidator={},this._isDirty=!1,this._isValidating=!1,(r=this.props.handlers)!=null&&r.password||(t=this.props.handlers)!=null&&(t.password=this._passwordDefaultHandler),this._validator=new d,this._$form=Lt(this.node,"form"),this._$form&&this._$form.addEventListener("submit",a=>{var o;if(!this._$form._submitHandler){this._$form._submitHandler=!0;const n=[],c=l=>{n.push(l.detail)};this._$form.addEventListener("s-form-validate.error",c),a.preventDefault(),a instanceof CustomEvent&&((o=a.detail)==null||!o.internal)||a.stopPropagation(),setTimeout(()=>{delete this._$form._submitHandler,this._$form.removeEventListener("s-form-validate.error",c),n.length||(this._$form.submit(),a instanceof CustomEvent||this._$form.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0})))})}}),this.componentUtils.exposeApi({validate:this.validate},this),this.props.nodes&&(this._$nodes=this.node.querySelectorAll(this.props.nodes),this._$nodes.forEach(a=>{for(let n=0;n<a.attributes.length;n++){var o=a.attributes[n];o.name in this.props&&(this.props[Z(o.name)]=jt(o.value),this._nodeByValidator[Z(o.name)]=a)}}))}mount(){Ot("input,textarea,select",t=>{this._initField(t)},{rootNode:this.node,scopes:!1}),this.props.type&&(this.props.type==="text"?this._validationType="string":this._validationType=this.props.type)}_passwordDefaultHandler({result:t,$feature:i}){var s;t.valid?(i.classList.remove("password-weak"),i.classList.remove("password-medium"),i.classList.remove("password-strong")):(s=t.metas)!=null&&s.levels&&t.metas.levels.forEach(r=>{r!==t.metas.validLevels.slice(-1)[0]?i.classList.remove("password-"+r):i.classList.add("password-"+r)})}_initField(t){this._$field=t,this._$field=this.node,t=this.node.querySelector("input,textarea,select"),t&&(this._$field=t),this.componentUtils.fastdom.mutate(()=>{this._$field.setAttribute("novalidate","true"),["required","maxlength","minlength","max","min","pattern"].forEach(i=>{!this._$field.hasAttribute(i)||this.props[i]||(this.props[i]=this._$field.getAttribute(i),i!=="maxlength"&&i!=="minlength"&&this._$field.removeAttribute(i))})}),this.props.on.forEach(i=>{var s;i==="enter"?this._$field.addEventListener("keyup",r=>{r.keyCode===13&&(this._$form?this._$form.dispatchEvent(new CustomEvent("submit",{bubbles:!1,detail:{internal:!0}})):this.validate(r))}):i==="reset"?(s=this._$field.form)!=null&&s.addEventListener(i,r=>{setTimeout(()=>{this.validate(r)})}):i==="submit"?(s=this._$field.form)!=null&&s.addEventListener(i,r=>{var a;r.preventDefault(),r instanceof CustomEvent&&((a=r.detail)==null||!a.internal)||(r.stopPropagation(),this.validate(r))}):i==="keyup"?this.node.addEventListener(i,r=>{this._isDirty&&this.validate(r)}):this.node.addEventListener(i,r=>{this.validate(r)})})}validate(t){if(!this._$field)throw new Error("No $field has been found to be validated...");if(((r=t==null?void 0:t.currentTarget)==null?void 0:r.tagName.toLowerCase())==="form"&&t.type!=="reset"&&t.preventDefault(),!this._isValidating){this._isValidating=!0,setTimeout(()=>{this._isValidating=!1});let a;const o={};for(var[i,s]of Object.entries(d.getValidatorsDefinition()))this.props[i]!==void 0&&(o[i]=this.props[i]);var r=this._getFieldValue();a=this._validator.validate(r,o),t.type==="reset"&&(a={valid:!0}),this._applyResult(a,t)}}_getFieldValue(){switch(!0){case this._$field.type==="checkbox":return this._getCheckboxValues();case this._$field.type==="range":return this._getRangeValue();case this._$field.tagName.toLowerCase()==="select":return this._getSelectValues();case this._$field.type==="radio":return this._getRadioValue();default:return this._$field.value}}_getCheckboxValues(){return Array.from(this.node.querySelectorAll('input[type="checkbox"]:checked')).map(t=>t.value)}_getRadioValue(){return this.node.querySelector('input[type="radio"]:checked').value}_getRangeValue(){return parseFloat(this._$field.value)}_getSelectValues(){return Array.from(this._$field.querySelectorAll("option")).filter(t=>t.selected).map(t=>t.value)}_applyResult(t,i){var s,r;return vi(this,void 0,void 0,function*(){for(var[a,o]of Object.entries(d.getValidatorsDefinition()))this.props[a]&&this.props.handlers[a]&&(yield this.props.handlers[a]({result:Object.assign({},(s=(s=t.rules)==null?void 0:s[a])!=null?s:t),props:this.props,$feature:this.node,$form:this._$form,$field:this._$field,$node:(s=this._nodeByValidator)==null?void 0:s[a]}));if(t.valid){if(this._isDirty=!1,i.type!=="reset"?this.node.classList.add(...this.props.validClass.split(" ")):this.node.classList.remove(...this.props.validClass.split(" ")),this.node.classList.remove(...this.props.errorClass.split(" ")),(r=this._$error)!=null&&r.hasAttribute("s-form-validate-error")&&(r=this._$error)!=null&&r.remove(),Object.keys(this._nodeByValidator).length)for(var[n,c]of Object.entries(t.rules))this._nodeByValidator[n]&&(this._nodeByValidator[n].classList.remove(...this.props.errorClass.split(" ")),this._nodeByValidator[n].classList.add(...this.props.validClass.split(" ")));this.componentUtils.dispatchEvent("valid",{detail:t})}else{this._isDirty=!0,this.node.classList.add(...this.props.errorClass.split(" ")),this.node.classList.remove(...this.props.validClass.split(" "));var l=Object.keys(t.rules)[0];if(Object.keys(this._nodeByValidator).length)for(var[h,f]of Object.entries(t.rules))this._nodeByValidator[h]&&(f.valid?(this._nodeByValidator[h].classList.remove(...this.props.errorClass.split(" ")),this._nodeByValidator[h].classList.add(...this.props.validClass.split(" "))):(this._nodeByValidator[h].classList.remove(...this.props.validClass.split(" ")),this._nodeByValidator[h].classList.add(...this.props.errorClass.split(" "))));else l=this.props[l+"Message"]||t.messages[0],this.props.displayError&&(this._$error=(r=this.node.querySelector(`[${this.props.errorContainerAttr}]`))!=null?r:this.node.nextElementSibling,this._$error&&this._$error.hasAttribute("s-form-validate-error")||(this._$error=document.createElement("p"),this._$error.setAttribute("s-form-validate-error","true"),this._$error.classList.add("s-form-validate-error-message"),this.node.parentNode.insertBefore(this._$error,this.node.nextSibling)),this._$error.innerHTML=l);this.componentUtils.dispatchEvent("error",{detail:t})}})}}class gt extends b{static get _definition(){return{name:{type:"String",description:'Specify the name to assign to the internal input[type="range"]'},value:{type:"Number",description:"Specify the initial range value"},min:{type:"Number",description:"Specify the minimal value or the range",default:0},max:{type:"Number",description:"Specify the maximal value of the range",default:100},step:{type:"Number",description:"Specify the steps between each values"},target:{type:"String",description:"Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"},tooltip:{type:"Boolean",description:"Specify if you want to display the value inside a tooltip on top of the thumb",default:!1},disabled:{type:"Boolean",description:"Specify if this range is disabled",default:!1}}}}var gi=`.s-range{display:block;width:100%}.s-range:not([mounted])>*{display:none}.s-range[disabled]{pointer-events:none}.s-range__root{display:flex;width:100%}.s-range__input{flex-grow:1;opacity:1!important}.s-range__input:hover+.s-range__tooltip,.s-range__input:focus+.s-range__tooltip{opacity:1!important}.s-range__tooltip{transition:none}
`,bi=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,a){function o(l){try{c(s.next(l))}catch(h){a(h)}}function n(l){try{c(s.throw(l))}catch(h){a(h)}}function c(l){var h;l.done?r(l.value):((h=l.value)instanceof i?h:new i(function(f){f(h)})).then(o,n)}c((s=s.apply(e,t||[])).next())})};class $i extends _{static get properties(){return _.createProperties({},gt)}static get styles(){return S`
            ${x(`
                ${gi}
            `)}
        `}constructor(){super(m({name:"s-range",interface:gt}))}firstUpdated(){var t;return bi(this,void 0,void 0,function*(){this._$input=this.querySelector("input"),this._$tooltip=this.querySelector(".s-range__tooltip"),this._$input.addEventListener("input",i=>{this._handleTooltip(),this._handleTarget()}),this.props.target&&(this._$targets=Array.from(document.querySelectorAll(this.props.target))),this._$input.value=this.props.value,(t=this._$input)!=null&&t.form&&this._$input.form.addEventListener("reset",()=>{setTimeout(()=>{this._handleTooltip(),this._handleTarget()})}),this._handleTooltip(),this._handleTarget()})}_handleTarget(){this._$targets&&this._$targets.forEach(t=>{t.innerHTML=this._$input.value,t.value=this._$input.value})}_handleTooltip(){var t,i,s;this._$tooltip&&(t=this._$input.value,i=this._$input.min||0,s=this._$input.max||100,s=Number(100*(t-i)/(s-i)),this._$tooltip.style.left=`calc(${s}% + (${8-.15*s}px))`,this._$tooltip.innerHTML=t)}render(){return p`
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
                ${this.props.tooltip?p`
                          <div
                              class="${this.componentUtils.className("__tooltip","s-tooltip")}"
                          ></div>
                      `:""}
            </div>
        `}}function wi(e={},t="s-range"){_.define(t,$i,e)}class ki extends b{static get _definition(){return{platform:{type:"String"}}}}class Si extends _{constructor(){super({shadowDom:!1})}static get properties(){return _.createProperties({},ki)}async firstUpdated(){this._docmap=await Yt(),this.grabItem()}async grabItem(){var t=Ft(this._docmap.map,(r,a)=>{var o,n;return!!a.platform&&!!((n=(o=a.example)==null?void 0:o[0])!=null&&n.code)&&a.platform[0].name===this.props.platform}),s=Object.keys(t).length,i=Object.keys(t),s=Math.floor(Math.random()*s);this.item=t[i[s]],this.requestUpdate(),this.timeout=setTimeout(()=>{this.timeout=void 0,this.requestUpdate()},200)}render(){var t,i,s,r,a,o;return p`
      <div class="ck-discover">
        ${this.item?p`
              <a
                @click="${this.grabItem}"
                class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
              >
                <i class="s-icon:ui-refresh"></i>
              </a>
              ${this.item.async?p`
                    <span class="s-badge:outline s-color:accent">Async</span
                    >&nbsp;
                  `:""}
              ${((i=(t=this.item.type)==null?void 0:t.types)==null?void 0:i[0].type)||this.item.type?p`
                    <span class="s-badge s-color:complementary"
                      >${(o=(a=(r=(s=this.item.type)==null?void 0:s.types)==null?void 0:r[0])==null?void 0:a.type)!=null?o:this.item.type}</span
                    >
                  `:""}
              <br />
              <br />
              <h1 class="s-typo:h3 s-mbe:30">${this.item.name}</h1>
              <p class="s-typo:p s-mbe:30 s-truncate:3">
                ${this.item.description}
              </p>
              ${this.timeout?"":p`
                    <s-code-example lines="8" s-deps css="codeExample">
                      <code
                        hidden
                        lang="${this.props.platform==="ts"||this.props.platform==="node"?"js":this.props.platform==="postcss"?"css":this.props.platform}"
                      >
                        ${this.item.example[0].code}
                      </code>
                    </s-code-example>
                  `}
            `:p`
              <div class="s-code-example-loader">
                <i class="s-loader:spinner s-color:accent"></i>
                &nbsp;
                <p class="s-typo:p s-display:inline-block">
                  Loading code example. Please wait...
                </p>
              </div>
            `}
      </div>
    `}}function xi(e={},t="ck-discover"){_.define(t,Si,e)}class Ci extends b{static get _definition(){return{platform:{type:"String"}}}}class Di extends _{constructor(){super({shadowDom:!1}),this._tabs=[{id:"js",title:"JS"},{id:"css",title:"CSS"},{id:"node",title:"NodeJS"},{id:"php",title:"PHP"}],this.state={activeTabId:"js"}}static get properties(){return _.createProperties({},Ci)}async firstUpdated(){this._$discover=this.querySelector("ck-discover")}render(){return p`
      <div class="ck-discover-tabed">
        <ul class="s-tabs s-color:accent s-mbe:50 @mobile s-tabs:grow">
          ${this._tabs.map(t=>p`
              <li
                class="${this.state.activeTabId===t.id?"active":""}"
                @click=${()=>{this.state.activeTabId=t.id,this._$discover.grabItem()}}
              >
                ${t.title}
              </li>
            `)}
        </ul>
        <ck-discover platform="${this.state.activeTabId}"></ck-discover>
      </div>
    `}}function Ii(e={},t="ck-discover-tabed"){_.define(t,Di,e)}(async()=>(Ht(),Ce(),Zt(),xe(),Ie(),wi(),Ue(),Ee(),yi({customValidations:{coffeekraken:(e,t)=>e==="coffeekraken"?t.message("Are you sure? Krakens are dangerous..."):e}}),xi(),Ii()))();
