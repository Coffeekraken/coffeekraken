var O=(a,H,M)=>new Promise((F,A)=>{var q=b=>{try{x(M.next(b))}catch(T){A(T)}},B=b=>{try{x(M.throw(b))}catch(T){A(T)}},x=b=>b.done?F(b.value):Promise.resolve(b.value).then(q,B);x((M=M.apply(a,H)).next())});define(["./index.f0efa065","./SClipboardCopy.22c83ce2"],function(a,H){"use strict";function M(e){function t(i){i.preventDefault()}e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("touchmove",t,{passive:!0}),e.addEventListener("touchend",t,{passive:!0}),e.addEventListener("touchcancel",t,{passive:!0})}class F extends a.SInterface{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["pointerdown","pointerup","pointermove","validate","eyedropper","reset","clear","close"],default:["pointerup","validate","eyedropper","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",values:["hex","hexa","rgb","rgba","hsl","hsla"],default:"hex"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate"}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},eyeDropper:{description:"Specify if you want the eye dropper capability to pick a color anywhere on the screen or not",type:"Boolean",default:!0},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{position:"auto",shift:10,offset:0,arrow:!1,arrowSize:15,arrowPadding:10}},eyeDropperIconClass:{description:'Specify the class you want to apply on the "i" that display the "eyeDropper" icon',type:"String",default:"s-icon s-icon--eye-dropper"},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1}}}}var A=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,o){function n(c){try{p(s.next(c))}catch(h){o(h)}}function l(c){try{p(s.throw(c))}catch(h){o(h)}}function p(c){var h;c.done?r(c.value):((h=c.value)instanceof i?h:new i(function(_){_(h)})).then(n,l)}p((s=s.apply(e,t||[])).next())})};class q extends a.SLitComponent{constructor(){var t;super(a.__deepMerge({name:"s-color-picker",interface:F})),this.state={},this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isShadeInInteraction=!1,this._isAlphaInInteraction=!1,this._isHueInInteraction=!1,this.state={h:0,s:0,l:0,a:1,metasFormat:"hex",value:void 0},this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(t=this._$button)!=null&&t.addEventListener("pointerup",i=>i.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return a.SLitComponent.createProperties({},F)}static get styles(){return a.r`
            ${a.o(`
                .s-color-picker{display:inline-block;position:relative}.s-color-picker[disabled]{pointer-events:none}.s-color-picker *[disabled]{opacity:1!important}.s-color-picker .s-backdrop{pointer-events:none;opacity:0}.s-color-picker .s-color-picker__root{display:flex;width:100%}.s-color-picker .s-color-picker__root.is-alpha-interacting *,.s-color-picker .s-color-picker__root.is-shade-interacting *,.s-color-picker .s-color-picker__root.is-hue-interacting *{cursor:none!important}.s-color-picker .s-color-picker__injected{display:flex;width:100%}.s-color-picker .s-color-picker__injected input{flex-grow:1}.s-color-picker .s-color-picker__injected button{flex-grow:0}.s-color-picker .s-color-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}.s-color-picker[inline] .s-color-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-color-picker:focus-within .s-color-picker__picker{opacity:1;pointer-events:all}.s-color-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-color-picker .s-color-picker__chest{position:absolute;top:0;left:0;width:100%;height:100%;opacity:.02;pointer-events:none}.s-color-picker .s-color-picker__chest:before{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:repeating-linear-gradient(0deg,#000 0,#000 10px,#fff 10px,#fff 20px);background-position:50% 50%;z-index:-1}.s-color-picker .s-color-picker__chest:after{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:repeating-linear-gradient(90deg,#000 0,#000 10px,#fff 10px,#fff 20px);background-position:50% 50%;mix-blend-mode:difference;z-index:-1}.s-color-picker .s-color-picker__selectors{display:flex;height:215px}.s-color-picker .s-color-picker__shade-wrapper{position:relative;aspect-ratio:16/9;cursor:all-scroll;flex-grow:1}.s-color-picker .s-color-picker__shade-wrapper canvas{width:100%;height:100%;position:relative}.s-color-picker .s-color-picker__hue-wrapper,.s-color-picker .s-color-picker__alpha-wrapper{position:relative;width:30px;cursor:row-resize;flex-grow:0;flex-shrink:0}.s-color-picker .s-color-picker__hue-wrapper canvas,.s-color-picker .s-color-picker__alpha-wrapper canvas{width:100%;height:100%;position:relative}.s-color-picker .s-color-picker__hue-wrapper:after,.s-color-picker .s-color-picker__alpha-wrapper:after{content:"";display:block;width:100%;height:5px;background:red;position:absolute;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none}.s-color-picker .s-color-picker__hue-wrapper:after{top:calc((100 / 360 * var(--s-color-picker-h, 0)) * 1%)}.s-color-picker .s-color-picker__alpha-wrapper{display:none;background:white}.s-color-picker .s-color-picker__alpha-wrapper.active{display:block}.s-color-picker .s-color-picker__alpha-wrapper:after{top:calc(100% - var(--s-color-picker-a, 0) * 100 * 1%)}.s-color-picker .s-color-picker__shade-wrapper:after{content:"";display:block;width:10px;height:10px;background:red;position:absolute;left:50%;transform:translate(-50%,-50%);z-index:10;top:calc(100% - var(--s-color-picker-shade-y, 0) * 1%);left:calc(var(--s-color-picker-shade-x, 0) * 1%);pointer-events:none}.s-color-picker .s-color-picker__metas{display:flex;flex-wrap:nowrap}.s-color-picker .s-color-picker__metas .s-color-picker__btn{flex-grow:0}.s-color-picker .s-color-picker__formats{display:flex}.s-color-picker .s-color-picker__color{display:flex;position:relative}.s-color-picker .s-color-picker__actions{display:flex}.s-color-picker .s-color-picker__actions button{flex-grow:1;text-align:center}.s-color-picker .s-color-picker__color-input{flex-shrink:1;flex-grow:1}.s-color-picker .s-color-picker__preview{position:relative;width:50px;flex-shrink:0;flex-grow:0;cursor:pointer;background-color:hsla(var(--s-color-picker-h),calc(var(--s-color-picker-s) * 1%),calc(var(--s-color-picker-l) * 1%),var(--s-color-picker-a))}.s-color-picker .s-color-picker__preview i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.s-color-picker .s-color-picker__eye-dropper{position:absolute;top:0;right:50px;width:50px;height:100%;background:rgba(0,0,0,0);cursor:pointer}.s-color-picker .s-color-picker__eye-dropper i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}[dir=rtl] .s-color-picker .s-color-picker__picker,.s-color-picker[dir=rtl] .s-color-picker__picker{right:auto;left:0}

            `)}
        `}mount(){return A(this,void 0,void 0,function*(){this._hueColor=new a.SColor("#000"),this._color=new a.SColor("#000")})}firstUpdated(){return A(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$colorInput=this.querySelector("."+this.componentUtils.uniqueClassName("__color-input")),this._$shade=this.querySelector("."+this.componentUtils.uniqueClassName("__shade")),this._shadeCtx=this._$shade.getContext("2d"),this._$hue=this.querySelector("."+this.componentUtils.uniqueClassName("__hue")),this._hueCtx=this._$hue.getContext("2d"),this._$alpha=this.querySelector("."+this.componentUtils.uniqueClassName("__alpha")),this._alphaCtx=this._$alpha.getContext("2d"),this._$input||(this._$input=this.querySelector("input")),this.componentUtils.fastdom.mutate(()=>{var t;(t=this._$input)!=null&&t.hasAttribute("name")||(t=this._$input)!=null&&t.setAttribute("name",this.props.name),(t=this._$input)!=null&&t.hasAttribute("placeholder")||(t=this._$input)!=null&&t.setAttribute("placeholder",this.props.placeholder),(t=this._$input)!=null&&t.hasAttribute("autocomplete")||(t=this._$input)!=null&&t.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0)}),this.addEventListener("focusin",t=>{var i;(i=this._floatApi)!=null&&i.update()}),M(this.querySelector(".s-color-picker__selectors")),M(this.querySelector(".s-color-picker__metas")),this._isAlphaWanted()||(this.state.a=1),this._initColor(),this._initHueSelector(),this._updateAlphaSelector(),this._updateShadeCanvas(),this._initSelectionInteractions(),this._restoreState(),this._updateInput("init"),this.props.inline||function(t=navigator.userAgent){return new a.MobileDetect(t).mobile()!==null}()||(this._floatApi=a.__makeFloat(this._$picker,this._$root,this.props.floatSettings))})}_initColor(){var t=(t=this.props.value)!=null?t:(t=this._$input)==null?void 0:t.value;t&&(this._inputColor=new a.SColor(t)),!this.state.value&&t?(this._color=new a.SColor(t),this._isAlphaWanted()||(this._color.a=1)):(this._color.h=this.state.h,this._color.s=this.state.s,this._color.l=this.state.l,this._color.a=this.state.a)}_updateInput(t){if(t==="init"||this.props.updateInput.includes(t)){switch(this.props.format){case"hex":this.state.value=this._color.toHexString();break;case"hexa":this.state.value=this._color.toHexaString();break;case"rgb":this.state.value=this._color.toRgbString();break;case"rgba":this.state.value=this._color.toRgbaString();break;case"hsl":this.state.value=this._color.toHslString();break;case"hsla":this.state.value=this._color.toHslaString()}this._$input&&this._$input.value!==this.state.value&&(this._$input.value=this.state.value),t!=="init"&&this.componentUtils.dispatchEvent("change",{detail:this._color.toObject()}),this.requestUpdate()}}_restoreState(){this._setAlpha(this._color.a),this._setHue(this._color.h),this._setShade(this._color.s,this._color.l)}_setMetasFormat(t){return this.state.metasFormat=t,this.requestUpdate(),!1}_validate(){var t,i;this._updateInput("validate"),(i=(t=document.activeElement)==null?void 0:t.blur)!=null&&i.call(t)}_clear(){this._inputColor?(this._setAlpha(this._inputColor.a),this._setHue(this._inputColor.h),this._setShade(this._inputColor.s,this._inputColor.l)):(this._setAlpha(1),this._setHue(0),this._setShade(0,0)),this._updateInput("clear")}_reset(){this._setAlpha(this._originalState.a),this._setHue(this._originalState.h),this._setShade(this._originalState.s,this._originalState.l),this._updateInput("reset")}_isAlphaWanted(){return this.props.format.includes("a")}_initSelectionInteractions(){let t=!1,i=(this._$shade.addEventListener("pointerdown",s=>{t=!0,this._isShadeInInteraction=!0,this._$shade.setPointerCapture(s.pointerId),this._setShadeFromEvent(s,!1),this._updateInput("pointerdown"),this.requestUpdate()}),this._$shade.addEventListener("pointermove",s=>{s.preventDefault(),t&&(this._setShadeFromEvent(s,!1),this._updateInput("pointermove"))}),this._$shade.addEventListener("pointerup",s=>{t=!1,this._isShadeInInteraction=!1,this._$shade.releasePointerCapture(s.pointerId),this._setShadeFromEvent(s,!0),this._updateInput("pointerup"),this.requestUpdate()}),!1);this._$alpha.addEventListener("pointerdown",s=>{i=!0,this._isAlphaInInteraction=!0,this._$alpha.setPointerCapture(s.pointerId),this._setAlphaFromEvent(s,!1),this._updateInput("pointerdown"),this.requestUpdate()}),this._$alpha.addEventListener("pointermove",s=>{s.preventDefault(),i&&(this._setAlphaFromEvent(s,!1),this._updateInput("pointermove"))}),this._$alpha.addEventListener("pointerup",s=>{i=!1,this._isAlphaInInteraction=!1,this._$alpha.releasePointerCapture(s.pointerId),this._setAlphaFromEvent(s,!0),this._updateInput("pointerup"),this.requestUpdate()})}_setHueFromEvent(s,i=!0){var r=s.target.getBoundingClientRect(),s=s.clientY-r.top,r=100-Math.round(100/r.height*s);let o=360-Math.round(3.6*r);360<(o=o<0?0:o)&&(o=360),this._setHue(o,i)}_setHue(t,i=!0){i&&(this.state.h=t),this._color.h=t,this.style.setProperty("--s-color-picker-h",t),this._updateShadeCanvas(),this._updateAlphaSelector(),this.requestUpdate()}_setShadeFromEvent(o,i=!0){var s=o.target.getBoundingClientRect(),r=o.clientY-s.top,o=o.clientX-s.left;let n=100-Math.round(100/s.height*r),l=Math.round(100/s.width*o);100<(n=n<0?0:n)&&(n=100),100<(l=l<0?0:l)&&(l=100),this._setShade(l,.5*n,i)}_setShade(t,i,s=!0){var r=i+(100-t)/2,o=(r*=2*i/100,t);s&&(this.state.s=o,this.state.l=r),this._color.s=o,this._color.l=r,this.style.setProperty("--s-color-picker-shade-x",t),this.style.setProperty("--s-color-picker-shade-y",100<2*i?100:2*i),this.style.setProperty("--s-color-picker-s",o),this.style.setProperty("--s-color-picker-l",r),this._updateShadeCanvas(),this.requestUpdate()}_setAlphaFromEvent(r,i=!0){var s=r.target.getBoundingClientRect(),r=r.clientY-s.top;let o=100-Math.round(100/s.height*r);100<(o=o<0?0:o)&&(o=100),this._setAlpha(o/100,i)}_setAlpha(t,i=!0){i&&(this.state.a=t),this._color.a=t,this.style.setProperty("--s-color-picker-a",t),this._updateAlphaSelector(),this.requestUpdate()}_copy(){const t=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,H.copy(this._$colorInput.value),setTimeout(()=>{this.props.copyIconClass=t},1e3)}_eyeDropper(){return A(this,void 0,void 0,function*(){var i=yield new EyeDropper().open();i.sRGBHex&&(i=new a.SColor(i.sRGBHex),this._setAlpha(1),this._setHue(i.h),this._setShade(i.s,i.l),this._updateInput("eyedropper"))})}_initHueSelector(){var t=this._$hue.getBoundingClientRect();this._hueCtx.canvas.width=t.width,this._hueCtx.canvas.height=t.height;const i=this._hueCtx.createLinearGradient(0,0,0,t.height);i.addColorStop(0,"rgb(255, 0, 0)"),i.addColorStop(1/6,"rgb(255, 255, 0)"),i.addColorStop(2/6,"rgb(0, 255, 0)"),i.addColorStop(.5,"rgb(0, 255, 255)"),i.addColorStop(4/6,"rgb(0, 0, 255)"),i.addColorStop(5/6,"rgb(255, 0, 255)"),i.addColorStop(1,"rgb(255, 0, 0)"),this._hueCtx.fillStyle=i,this._hueCtx.fillRect(0,0,3*t.width,t.height);let s=!1;this._$hue.addEventListener("pointerdown",r=>{s=!0,this._isHueInInteraction=!0,this.requestUpdate(),this._$hue.setPointerCapture(r.pointerId),this._setHueFromEvent(r,!1),this._updateInput("pointerdown")}),this._$hue.addEventListener("pointermove",r=>{r.preventDefault(),s&&(this._setHueFromEvent(r),this._updateInput("pointermove",!1))}),this._$hue.addEventListener("pointerup",r=>{s=!1,this._isHueInInteraction=!1,this.requestUpdate(),this._$hue.releasePointerCapture(r.pointerId),this._setHueFromEvent(r,!0),this._updateInput("pointerup",!0)})}_updateAlphaSelector(){var t=this._$alpha.getBoundingClientRect();this._alphaCtx.canvas.width=t.width,this._alphaCtx.canvas.height=t.height;const i=this._alphaCtx.createLinearGradient(0,0,0,t.height);i.addColorStop(0,`rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 1)`),i.addColorStop(1,`rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 0)`),this._alphaCtx.fillStyle=i,this._alphaCtx.fillRect(0,0,3*t.width,t.height)}_updateShadeCanvas(){let t=this._shadeCtx.createLinearGradient(0,0,this._shadeCtx.canvas.width,0);const i=this._color.clone(),s=(i.s=100,i.l=50,t.addColorStop(0,"#fff"),t.addColorStop(1,i.toHex()),this._shadeCtx.fillStyle=t,this._shadeCtx.fillRect(0,0,this._shadeCtx.canvas.width,this._shadeCtx.canvas.height),this._shadeCtx.createLinearGradient(0,0,0,this._shadeCtx.canvas.height));s.addColorStop(0,"rgba(0,0,0,0)"),s.addColorStop(1,"#000"),this._shadeCtx.fillStyle=s,this._shadeCtx.fillRect(0,0,this._shadeCtx.canvas.width,this._shadeCtx.canvas.height)}render(){var t;return a.$`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isShadeInInteraction?"is-shade-interacting":""} ${this._isAlphaInInteraction?"is-alpha-interacting":""} ${this._isHueInInteraction?"is-hue-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":a.$`
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
                    ${!this._hasInput&&this.props.input?a.$`
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
                    ${!this._hasButton&&this.props.button?a.$`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?a.$`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?a.$`
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
                                ${this.props.copyIconClass?a.$`
                                          <i
                                              class="${this.props.copyIconClass}"
                                          ></i>
                                      `:""}
                            </div>
                            ${this.props.eyeDropper&&window.EyeDropper?a.$`
                                      <div
                                          class="${this.componentUtils.className("__eye-dropper")} "
                                          @pointerup=${()=>this._eyeDropper()}
                                      >
                                          ${this.props.eyeDropperIconClass?a.$`
                                                    <i
                                                        class="${this.props.eyeDropperIconClass}"
                                                    ></i>
                                                `:""}
                                      </div>
                                  `:""}
                        </div>
                    </div>
                    ${this.props.actions.length?a.$`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?a.$`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${i=>i.preventDefault()}
                                                @pointerup=${i=>{i.preventDefault(),this._clear()}}
                                            >
                                                ${(t=this.props.i18n.clear)!=null?t:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?a.$`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${i=>i.preventDefault()}
                                                @pointerup=${i=>{i.preventDefault(),this._reset()}}
                                            >
                                                ${(t=this.props.i18n.reset)!=null?t:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?a.$`
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
        `}}function B(e){return e instanceof Date||Object.prototype.toString.call(e)==="[object Date]"}function x(e){return B(e)?new Date(e.getTime()):e==null?new Date(NaN):new Date(e)}function b(e,t){if(t=1<arguments.length&&t!==void 0?t:0,!(0<=t&&t<=6))throw new RangeError("weekStartsOn must be between 0 and 6");return e=x(e),t=(e.getDay()+7-t)%7,e.setDate(e.getDate()-t),e.setHours(0,0,0,0),e}function T(e,i){var i=1<arguments.length&&i!==void 0?i:{},r=i.firstDayOfWeek,s=r===void 0?0:r,r=i.firstWeekContainsDate,o=r===void 0?1:r;if(!(1<=o&&o<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7");for(var n=x(e),l=n.getFullYear(),p=new Date(0),c=l+1;l-1<=c&&(p.setFullYear(c,0,o),p.setHours(0,0,0,0),p=b(p,s),!(n.getTime()>=p.getTime()));c--);return p}var G={months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],firstDayOfWeek:0,firstWeekContainsDate:1},It=/\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;function g(e,t){for(var i=1<arguments.length&&t!==void 0?t:2,s="".concat(Math.abs(e)),t=e<0?"-":"";s.length<i;)s="0".concat(s);return t+s}function K(e){return 15*Math.round(e.getTimezoneOffset()/15)}function Q(r,i){var i=1<arguments.length&&i!==void 0?i:"",s=0<r?"-":"+",r=Math.abs(r),o=r%60;return s+g(Math.floor(r/60),2)+i+g(o,2)}function tt(e,t,i){return e=e<12?"AM":"PM",i?e.toLocaleLowerCase():e}var L={Y:function(e){return e=e.getFullYear(),(e<=9999?"":"+").concat(e)},YY:function(e){return g(e.getFullYear(),4).substr(2)},YYYY:function(e){return g(e.getFullYear(),4)},M:function(e){return e.getMonth()+1},MM:function(e){return g(e.getMonth()+1,2)},MMM:function(e,t){return t.monthsShort[e.getMonth()]},MMMM:function(e,t){return t.months[e.getMonth()]},D:function(e){return e.getDate()},DD:function(e){return g(e.getDate(),2)},H:function(e){return e.getHours()},HH:function(e){return g(e.getHours(),2)},h:function(e){return e=e.getHours(),e===0?12:12<e?e%12:e},hh:function(){return g(L.h.apply(L,arguments),2)},m:function(e){return e.getMinutes()},mm:function(e){return g(e.getMinutes(),2)},s:function(e){return e.getSeconds()},ss:function(e){return g(e.getSeconds(),2)},S:function(e){return Math.floor(e.getMilliseconds()/100)},SS:function(e){return g(Math.floor(e.getMilliseconds()/10),2)},SSS:function(e){return g(e.getMilliseconds(),3)},d:function(e){return e.getDay()},dd:function(e,t){return t.weekdaysMin[e.getDay()]},ddd:function(e,t){return t.weekdaysShort[e.getDay()]},dddd:function(e,t){return t.weekdays[e.getDay()]},A:function(e,t){return(t.meridiem||tt)(e.getHours(),e.getMinutes(),!1)},a:function(e,t){return(t.meridiem||tt)(e.getHours(),e.getMinutes(),!0)},Z:function(e){return Q(K(e),":")},ZZ:function(e){return Q(K(e))},X:function(e){return Math.floor(e.getTime()/1e3)},x:function(e){return e.getTime()},w:function(e,t){return function(n,r){var r=1<arguments.length&&r!==void 0?r:{},l=(l=r.firstDayOfWeek)===void 0?0:l,r=r.firstWeekContainsDate,r=r===void 0?1:r,n=x(n),o=b(n,l),n=T(n,{firstDayOfWeek:l,firstWeekContainsDate:r}),l=o.getTime()-n.getTime();return Math.round(l/6048e5)+1}(e,{firstDayOfWeek:t.firstDayOfWeek,firstWeekContainsDate:t.firstWeekContainsDate})},ww:function(e,t){return g(L.w(e,t),2)}};function Nt(e,r,s){var s=2<arguments.length&&s!==void 0?s:{},r=r?String(r):"YYYY-MM-DDTHH:mm:ss.SSSZ",o=x(e);if(!B(e=o)||isNaN(e.getTime()))return"Invalid Date";var n=s.locale||G;return r.replace(It,function(l,p){return p||(typeof L[l]=="function"?"".concat(L[l](o,n)):l)})}function et(e){return function(t){if(Array.isArray(t)){for(var i=0,s=new Array(t.length);i<t.length;i++)s[i]=t[i];return s}}(e)||function(t){if(Symbol.iterator in Object(t)||Object.prototype.toString.call(t)==="[object Arguments]")return Array.from(t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function it(e,t){var i,s=Object.keys(e);return Object.getOwnPropertySymbols&&(i=Object.getOwnPropertySymbols(e),t&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),s.push.apply(s,i)),s}function Ut(e,t){return function(i){if(Array.isArray(i))return i}(e)||function(i,s){if(Symbol.iterator in Object(i)||Object.prototype.toString.call(i)==="[object Arguments]"){var r=[],o=!0,n=!1,l=void 0;try{for(var p,c=i[Symbol.iterator]();!(o=(p=c.next()).done)&&(r.push(p.value),!s||r.length!==s);o=!0);}catch(h){n=!0,l=h}finally{try{o||c.return==null||c.return()}finally{if(n)throw l}}return r}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function C(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function u(s,t,i){var s=Array.isArray(s)?s:[s],r=typeof i=="string"?function(o){return o=parseInt(o,10),C({},i,o)}:i;s.forEach(function(o){lt[o]=[t,r]})}function At(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")}function j(e){return function(t){if(t=t[e],Array.isArray(t))return new RegExp(t.map(At).join("|"));throw new Error("Locale[".concat(e,"] need an array"))}}function Y(e,t){return function(i,s){if(s=s[e],!Array.isArray(s))throw new Error("Locale[".concat(e,"] need an array"));if(s=s.indexOf(i),s<0)throw new Error("Invalid Word");return C({},t,s)}}var Tt=/(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g,st=/\d/,D=/\d\d/,E=/\d\d?/,rt=/[+-]?\d+/,R="year",P="month",at="hour",ot="minute",nt="second",W="millisecond",lt={};function Et(e,t,i){var s=t.match(Tt);if(!s)throw new Error;for(var r=s.length,o={},n=0;n<r;n+=1){var l=s[n],p=lt[l];if(p){var c=typeof p[0]=="function"?p[0](i):p[0],p=p[1],c=(c.exec(e)||[])[0],o=function($){for(var I=1;I<arguments.length;I++){var N=arguments[I]!=null?arguments[I]:{};I%2?it(N,!0).forEach(function(U){C($,U,N[U])}):Object.getOwnPropertyDescriptors?Object.defineProperties($,Object.getOwnPropertyDescriptors(N)):it(N).forEach(function(U){Object.defineProperty($,U,Object.getOwnPropertyDescriptor(N,U))})}return $}({},o,{},p(c,i));e=e.replace(c,"")}else{if(p=l.replace(/^\[|\]$/g,""),e.indexOf(p)!==0)throw new Error("not match");e=e.substr(p.length)}}return o}function Lt(e,t,i){i=2<arguments.length&&i!==void 0?i:{};try{var s=i.locale,r=s===void 0?G:s,o=i.backupDate,n=o===void 0?new Date:o,l=Et(e,t,r),p=l.year,c=l.month,h=l.day,_=l.hour,$=l.minute,I=l.second,N=l.millisecond,U=l.isPM,wt=l.date,kt=l.offset,St=l.weekday,xt=l.week;if(wt)return wt;var Ct,X=[p,c,h,_,$,I,N];if(X[3]=function(m,f){if(m!==void 0&&f!==void 0){if(f){if(m<12)return m+12}else if(m===12)return 0}return m}(X[3],U),xt!==void 0&&c===void 0&&h===void 0)return Ct=T(p===void 0?n:new Date(p,3),{firstDayOfWeek:r.firstDayOfWeek,firstWeekContainsDate:r.firstWeekContainsDate}),new Date(Ct.getTime()+7*(xt-1)*24*3600*1e3);var J=function(m,f){for(var f=1<arguments.length&&f!==void 0?f:new Date,v=[0,0,1,0,0,0,0],k=[f.getFullYear(),f.getMonth(),f.getDate(),f.getHours(),f.getMinutes(),f.getSeconds(),f.getMilliseconds()],S=!0,w=0;w<7;w++)m[w]===void 0?v[w]=(S?k:v)[w]:(v[w]=m[w],S=!1);return v}(X,n),Dt=kt!==void 0?(J[6]+=60*kt*1e3,function(){for(var m,f=arguments.length,v=new Array(f),k=0;k<f;k++)v[k]=arguments[k];var S=v[0];return S<100&&0<=S?(v[0]+=400,m=new Date(Date.UTC.apply(Date,v)),isFinite(m.getUTCFullYear())&&m.setUTCFullYear(S)):m=new Date(Date.UTC.apply(Date,v)),m}.apply(void 0,et(J))):function(m,f,v,k,S,w,Mt){var V;return m<100&&0<=m?(V=new Date(m+400,f,v,k,S,w,Mt),isFinite(V.getFullYear())&&V.setFullYear(m)):V=new Date(m,f,v,k,S,w,Mt),V}.apply(void 0,et(J));return St!==void 0&&Dt.getDay()!==St?new Date(NaN):Dt}catch(m){return new Date(NaN)}}u("Y",rt,R),u("YY",D,function(i){var t=new Date().getFullYear(),t=Math.floor(t/100),i=parseInt(i,10);return C({},R,100*(68<i?t-1:t)+i)}),u("YYYY",/\d{4}/,R),u("M",E,function(e){return C({},P,parseInt(e,10)-1)}),u("MM",D,function(e){return C({},P,parseInt(e,10)-1)}),u("MMM",j("monthsShort"),Y("monthsShort",P)),u("MMMM",j("months"),Y("months",P)),u("D",E,"day"),u("DD",D,"day"),u(["H","h"],E,at),u(["HH","hh"],D,at),u("m",E,ot),u("mm",D,ot),u("s",E,nt),u("ss",D,nt),u("S",st,function(e){return C({},W,100*parseInt(e,10))}),u("SS",D,function(e){return C({},W,10*parseInt(e,10))}),u("SSS",/\d{3}/,W),u(["A","a"],function(e){return e.meridiemParse||/[ap]\.?m?\.?/i},function(e,t){return{isPM:typeof t.isPM=="function"?t.isPM(e):"".concat(e).toLowerCase().charAt(0)==="p"}}),u(["Z","ZZ"],/[+-]\d\d:?\d\d/,function(e){return{offset:(t=(e=Ut((e=e).match(/([+-]|\d\d)/g)||["-","0","0"],3))[0],i=e[1],e=e[2],(i=60*parseInt(i,10)+parseInt(e,10))===0?0:t==="+"?-i:+i)};var t,i}),u("x",rt,function(e){return{date:new Date(parseInt(e,10))}}),u("X",/[+-]?\d+(\.\d{1,3})?/,function(e){return{date:new Date(1e3*parseFloat(e))}}),u("d",st,"weekday"),u("dd",j("weekdaysMin"),Y("weekdaysMin","weekday")),u("ddd",j("weekdaysShort"),Y("weekdaysShort","weekday")),u("dddd",j("weekdays"),Y("weekdays","weekday")),u("w",E,"week"),u("ww",D,"week");class ct extends a.SInterface{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["select","validate","reset","clear","close"],default:["select","validate","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",default:"YYYY-MM-DD"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},calendar:{description:"Specify if you want to display a calendar or not",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{}},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disable:{description:'Specify what you want to disable. It can be "weekend", "week" or "2022-12-19" (dates)',type:{type:"Array<String>",splitChars:[","," "]},default:[]},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},hours:{description:"Specify the hours you want in the time selector",type:"Array<Number>",default:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},minutes:{description:"Specify the minutes you want in the time selector",type:"Array<Number>",default:[0,5,10,15,20,25,30,25,40,45,50,55]},fromYear:{description:"Specify the first year to allow selection from",type:"Number",default:new Date().getFullYear()-100},toYear:{description:"Specify the last year to allow selection from",type:"Number",default:new Date().getFullYear()+100}}}}var pt=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,o){function n(c){try{p(s.next(c))}catch(h){o(h)}}function l(c){try{p(s.throw(c))}catch(h){o(h)}}function p(c){var h;c.done?r(c.value):((h=c.value)instanceof i?h:new i(function(_){_(h)})).then(n,l)}p((s=s.apply(e,t||[])).next())})};class jt extends a.SLitComponent{constructor(){var t;super(a.__deepMerge({name:"s-datetime-picker",interface:ct})),this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isInInteraction=!1,this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(t=this._$button)!=null&&t.addEventListener("click",i=>i.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return a.SLitComponent.createProperties({},ct)}static get styles(){return a.r`
            ${a.o(`
                .s-datetime-picker{display:inline-block;position:relative}.s-datetime-picker[disabled]{pointer-events:none}.s-datetime-picker .s-backdrop{pointer-events:none;opacity:0}.s-datetime-picker .s-datetime-picker__root{width:100%}.s-datetime-picker .s-datetime-picker__root.is-interacting *{cursor:none!important}.s-datetime-picker .s-datetime-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}@media screen and (max-width: 639px){.s-datetime-picker .s-datetime-picker__picker{position:fixed;bottom:0;top:auto!important;left:0!important;right:auto;width:100vw;transform:translateY(100%)}}.s-datetime-picker[inline] .s-datetime-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-datetime-picker .s-datetime-picker__actions{display:flex}.s-datetime-picker .s-datetime-picker__actions button{flex-grow:1;text-align:center}.s-datetime-picker:focus-within .s-datetime-picker__picker{opacity:1;pointer-events:all}.s-datetime-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-datetime-picker .s-datetime-picker__calendar:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__calendar table{width:100%}.s-datetime-picker .s-datetime-picker__calendar-item{cursor:pointer;touch-action:manipulation}.s-datetime-picker .s-datetime-picker__calendar-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__selector{height:8em;overflow-y:auto;scroll-snap-type:y mandatory;flex-grow:1}.s-datetime-picker .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__selector-item:first-child{-webkit-margin-before:2.5em;margin-block-start:2.5em}.s-datetime-picker .s-datetime-picker__selector-item:last-child{-webkit-margin-after:2.5em;margin-block-end:2.5em}.s-datetime-picker .s-datetime-picker__selector-item.disabled{pointer-events:none}.s-datetime-picker .s-datetime-picker__date-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors:not(.active){display:none!important}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item{scroll-snap-align:center}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:first-child{-webkit-margin-before:1em;margin-block-start:1em}.s-datetime-picker .s-datetime-picker__time-selectors .s-datetime-picker__selector-item:last-child{-webkit-margin-after:1em;margin-block-end:1em}.s-datetime-picker .s-datetime-picker__date-selectors,.s-datetime-picker .s-datetime-picker__time-selectors{position:relative;display:flex}

            `)}
        `}static get state(){return{year:0,month:0,day:0,hour:12,minutes:0,displayedYear:0,displayedMonth:0,format:void 0}}mount(){return pt(this,void 0,void 0,function*(){this._restoreState()})}firstUpdated(){return pt(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$input||(this._$input=this.querySelector("input")),this.componentUtils.fastdom.mutate(()=>{var t;(t=this._$input)!=null&&t.hasAttribute("name")||(t=this._$input)!=null&&t.setAttribute("name",this.props.name),(t=this._$input)!=null&&t.hasAttribute("placeholder")||(t=this._$input)!=null&&t.setAttribute("placeholder",this.props.placeholder),(t=this._$input)!=null&&t.hasAttribute("autocomplete")||(t=this._$input)!=null&&t.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0)}),this._$days=this.querySelector(".s-datetime-picker__days"),this._$months=this.querySelector(".s-datetime-picker__months"),this._$years=this.querySelector(".s-datetime-picker__years"),this._$hours=this.querySelector(".s-datetime-picker__hours"),this._$minutes=this.querySelector(".s-datetime-picker__minutes"),this.addEventListener("focusin",t=>{var i;(i=this._floatApi)!=null&&i.update()}),this._updateInput("init"),this.props.inline||(this._floatApi=a.__makeFloat(this._$picker,this._$root,Object.assign({},this.props.floatSettings))),this._scrollSelectorsToStateValues("initial"),this._initInteractions()})}_isDateNeeded(){return this.props.format.match(/(d{1,4}|D{1,2}|M{1,4}|Y{2,4})/)}_isTimeNeeded(){return this.props.format.match(/(h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3})/)}_isSelectedDatetimeValid(){return!this._isDateDisabled(this.state.day,this.state.month,this.state.year)}_isDateDisabled(t,i=this.state.displayedMonth,s=this.state.displayedYear){if(s!==-1&&this.props.disable.includes(String(s)))return!0;if(i!==-1){var r=["january","february","march","april","may","june","july","august","september","october","november","december"];for(let c=0;c<r.length;c++){var o=r[c];if(this.props.disable.includes(o)&&i===c)return!0}}if(t===-1)return!1;var n=new Date(s,i,t).getDay(),l=["sunday","monday","thuesday","wednesday","thursday","friday","saturday"];for(let c=0;c<l.length;c++){var p=l[c];if(this.props.disable.includes(p)&&n===c)return!0}return!!this.props.disable.includes(this._getDisableDateFromDate(t))||!!(this.props.disable.includes("week")&&1<n&&n<=5)||!(!this.props.disable.includes("weekend")||n!==0&&n!==6)||void 0}_setDay(t,i=!1){this.state.day=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$days,!0,i)}),this._updateInput("select")}_setMonth(t,i=!1){this.state.month=t,this.state.displayedMonth=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$months,!0,i)}),this._updateInput("select")}_setYear(t,i=!1){this.state.year=t,this.state.displayedYear=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$years,!0,i)}),this._updateInput("select")}_setHour(t,i=!1){this.state.hour=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$hours,!0,i)}),this._updateInput("select")}_setMinutes(t,i=!1){this.state.minutes=t,setTimeout(()=>{this._scrollSelectorToActiveItem(this._$minutes,!0,i)}),this._updateInput("select")}_initInteractions(){let t,i,s,r,o;this._$years.addEventListener("scroll",n=>{a.__isUserScrolling(this._$years)&&(clearTimeout(s),this._$years.classList.add("scrolling"),s=setTimeout(()=>{var l=this._getSelectedIdxFromSelector(this._$years);this._setYear(parseInt(this._$years.children[l-1].innerText)),this._$years.classList.remove("scrolling")},400))}),this._$months.addEventListener("scroll",n=>{a.__isUserScrolling(this._$months)&&(clearTimeout(i),this._$months.classList.add("scrolling"),i=setTimeout(()=>{var l=this._getSelectedIdxFromSelector(this._$months);this._setMonth(l-1),this._$months.classList.remove("scrolling")},400))}),this._$days.addEventListener("scroll",n=>{a.__isUserScrolling(this._$days)&&(clearTimeout(t),this._$days.classList.add("scrolling"),t=setTimeout(()=>{var l=this._getSelectedIdxFromSelector(this._$days);this._setDay(l),this._$days.classList.remove("scrolling")},400))}),this._$hours.addEventListener("scroll",n=>{a.__isUserScrolling(this._$hours)&&(clearTimeout(r),this._$hours.classList.add("scrolling"),r=setTimeout(()=>{var l=this._getSelectedIdxFromSelector(this._$hours);this._setHour(parseInt(this._$hours.children[l-1].innerText)),this._$hours.classList.remove("scrolling")},400))}),this._$minutes.addEventListener("scroll",n=>{a.__isUserScrolling(this._$minutes)&&(clearTimeout(o),this._$minutes.classList.add("scrolling"),o=setTimeout(()=>{var l=this._getSelectedIdxFromSelector(this._$minutes);this._setMinutes(parseInt(this._$minutes.children[l-1].innerText)),this._$minutes.classList.remove("scrolling")},400))})}_getSelectedIdxFromSelector(r){var i=r.getBoundingClientRect(),i=r.scrollTop+i.height/2,s=r.children.length,r=Array.from(r.children).reduce((o,n)=>o+n.getBoundingClientRect().height,0);return Math.round(s/r*i)}_scrollSelectorsToStateValues(t){t=t!=="initial",this._scrollSelectorToActiveItem(this._$years,t),this._scrollSelectorToActiveItem(this._$months,t),this._scrollSelectorToActiveItem(this._$days,t),this._scrollSelectorToActiveItem(this._$hours,t),this._scrollSelectorToActiveItem(this._$minutes,t)}_scrollSelectorToActiveItem(t,i=!0,s){const r=t.querySelector(".active");var o;r&&(o=r.getBoundingClientRect(),t.scrollTo({top:o.height*Array.from(t.children).indexOf(r),left:0,behavior:i?"smooth":"instant"}))}_updateInput(t){t!=="init"&&!this.props.updateInput.includes(t)||(this._$input.value=Nt(new Date(this.state.year,this.state.month,this.state.day,this.state.hour,this.state.minutes,0),this.props.format),t!=="init"&&this.componentUtils.dispatchEvent("change",{detail:{}}),this.requestUpdate())}_restoreState(){var t;{this.state.value=void 0;let i=new Date;(t=this._$input)!=null&&t.value&&(i=Lt(this._$input.value,this.props.format,{backupDate:new Date})),this.state.year=i.getFullYear(),this.state.month=i.getMonth(),this.state.day=i.getDate(),this.state.displayedYear=this.state.year,this.state.displayedMonth=this.state.month}}_validate(){var t,i;this._updateInput("validate"),(i=(t=document.activeElement)==null?void 0:t.blur)!=null&&i.call(t)}_clear(){this._updateInput("clear")}_reset(){this._updateInput("reset")}_copy(){const t=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,setTimeout(()=>{this.props.copyIconClass=t},1e3)}_getDisableDateFromDate(t){return`${this.state.displayedYear}-${String(this.state.displayedMonth+1).padStart(2,"0")}-`+String(t).padStart(2,"0")}_getMinutes(){return this.props.minutes}_getHours(){return this.props.hours}_getDaysInMonth(t,i){return new Date(t,i+1,0).getDate()}_getDays(){var t=this._getDaysInMonth(this.state.displayedYear,this.state.displayedMonth);return Array.from(Array(t).keys())}_getMonths(){return this.props.i18n.months.filter((t,i)=>!0)}_getYears(){const t=[];for(let i=this.props.fromYear;i<=this.props.toYear;i++)t.push(i);return t}render(){var t;let i=new Date(this.state.displayedYear,this.state.displayedMonth).getDay(),s=32-new Date(this.state.displayedYear,this.state.displayedMonth,32).getDate();const r=new Date;let o=1;return a.$`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isInInteraction?"is-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":a.$`
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
                    ${!this._hasInput&&this.props.input?a.$`
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
                    ${!this._hasButton&&this.props.button?a.$`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?a.$`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?a.$`
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
                            ${Array.from(Array(6).keys()).map(n=>a.$`
                                    <tr>
                                        ${Array.from(Array(7).keys()).map(l=>{const p=o;var c=a.$`
                                                    ${n===0&&l<i-1?a.$` <td></td>`:o>s?a.$`<td></td>`:a.$`
                                                              <td>
                                                                  <div
                                                                      @click=${h=>this._setDay(p)}
                                                                      class="${this.componentUtils.className("__calendar-item")} ${o===r.getDate()&&r.getMonth()===this.state.displayedMonth&&r.getFullYear()===this.state.displayedYear?"today":""} ${this.componentUtils.className("__calendar-item")} ${o===this.state.day&&this.state.month===this.state.displayedMonth&&this.state.year===this.state.displayedYear?"active":""} ${this._isDateDisabled(o)?"disabled":""}"
                                                                  >
                                                                      <span
                                                                          >${o}</span
                                                                      >
                                                                  </div>
                                                              </td>
                                                          `}
                                                `;return n===0&&l<i-1||o++,c})}
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
                            ${this._getDays().map(n=>a.$`
                                    <div
                                        @click=${()=>this._setDay(n+1)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__day")} ${this.state.day===n+1?"active":""} ${this._isDateDisabled(n+1)?"disabled":""}"
                                    >
                                        <span>
                                            ${String(n+1).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__months")}"
                        >
                            ${this._getMonths().map((n,l)=>a.$`
                                    <div
                                        @click=${()=>this._setMonth(l)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__month")} ${this.state.displayedMonth===l?"active":""} ${this._isDateDisabled(-1,l)?"disabled":""}"
                                    >
                                        <span> ${n} </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__years")}"
                        >
                            ${this._getYears().map((n,l)=>a.$`
                                    <div
                                        @click=${()=>this._setYear(n)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__year")} ${this.state.displayedYear===n?"active":""} ${this._isDateDisabled(-1,-1,n)?"disabled":""}"
                                    >
                                        <span> ${n} </span>
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
                            ${this._getHours().map(n=>a.$`
                                    <div
                                        @click=${()=>this._setHour(n)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__hour")} ${this.state.hour===n?"active":""}"
                                    >
                                        <span>
                                            ${String(n).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                        <div
                            class="${this.componentUtils.className("__selector")} ${this.componentUtils.className("__minutes")}"
                        >
                            ${this._getMinutes().map((n,l)=>a.$`
                                    <div
                                        @click=${()=>this._setMinutes(n)}
                                        class="${this.componentUtils.className("__selector-item")} ${this.componentUtils.className("__minutes")} ${this.state.minutes===n?"active":""}"
                                    >
                                        <span>
                                            ${String(n).padStart(2,"0")}
                                        </span>
                                    </div>
                                `)}
                        </div>
                    </div>
                    ${this.props.actions.length?a.$`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?a.$`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${n=>{n.preventDefault(),this._clear()}}
                                            >
                                                ${(t=this.props.i18n.clear)!=null?t:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?a.$`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${n=>{n.preventDefault(),this._reset()}}
                                            >
                                                ${(t=this.props.i18n.reset)!=null?t:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?a.$`
                                            <button
                                                ?disabled=${!this._isSelectedDatetimeValid()}
                                                class="${this.componentUtils.className("__validate","s-btn s-color--accent")}"
                                                @click=${n=>{n.preventDefault(),this._validate()}}
                                            >
                                                ${(t=this.props.i18n.validate)!=null?t:"Validate"}
                                            </button>
                                        `:""}
                              </div>
                          `:""}
                </div>
            </div>
        `}}class ht extends a.SInterface{static get _definition(){return{name:{description:"Specify a name that will be attributed to the hidden input created automatically",type:"String",default:"rate"},value:{description:"Specify a base value for the rating",type:"Number",default:3},min:{description:"Specify the minimum rate you accept",type:"Number",default:1},max:{description:"Specify the maximum rate you accept",type:"Number",default:5},icon:{description:'This works only if you use the "s-icon:..." class notation. Define the icon you want to use',type:"String",default:"star"},iconClass:{description:'Specify a custom icon class you want to use. If this is set, override the "icon" parameter',type:"String"},readonly:{description:"Specify if you want your rating component to just display the value and that the user cannot interact with it or not",type:"Boolean",default:!1,physical:!0}}}}class dt extends a.SLitComponent{constructor(){super({name:"s-rating",interface:ht}),this.state={value:0}}static get properties(){return a.SLitComponent.createProperties({},ht)}static get styles(){return a.r`
            ${a.o(`.s-rating{display:inline-block;position:relative;cursor:pointer}.s-rating .s-rating__icons-wrapper{display:flex}.s-rating .s-rating__base{opacity:.3}.s-rating .s-rating__rate{position:absolute;top:0;left:0}.s-rating:hover .s-rating__rate{-webkit-clip-path:polygon(0 0,100% 0,100% 100%,0 100%);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}.s-rating .s-rating__rate{-webkit-clip-path:polygon(0 0,calc(var(--s-rating-percent) * 1%) 0,calc(var(--s-rating-percent) * 1%) 100%,0 100%);clip-path:polygon(0 0,calc(var(--s-rating-percent) * 1%) 0,calc(var(--s-rating-percent) * 1%) 100%,0 100%)}.s-rating .s-rating__rate i:hover~i{opacity:0}.s-rating[readonly]{pointer-events:none}
`)}
        `}mount(){this._setRating(this.props.value)}_setRating(t){this.state.value=t,this.componentUtils.dispatchEvent("change",{detail:this.state})}render(){return a.$`
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
                    ${[...Array(this.props.max).keys()].map(t=>a.$`
                            <i
                                class="${this.props.iconClass||"s-icon:"+this.props.icon}"
                            ></i>
                        `)}
                </div>
                <div
                    class="${this.componentUtils.className("__rate")} ${this.componentUtils.className("__icons-wrapper")}"
                >
                    ${[...Array(this.props.max).keys()].map(t=>a.$`
                            <i
                                @click=${()=>this._setRating(t+1)}
                                class="${this.props.iconClass||"s-icon:"+this.props.icon}"
                            ></i>
                        `)}
                </div>
            </div>
        `}}class ut extends a.SInterface{static get _definition(){return{to:{description:"The target when to scroll. Must be a valid css selector",type:"String",required:!0},duration:{description:"Specify the duration of the scroll in ms",type:"number",default:a.STheme.get("scroll.duration")},offset:{description:"Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...",type:"number",default:a.STheme.get("scroll.offset")},offsetX:{description:"Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...",type:"number",default:a.STheme.get("scroll.offsetX")},offsetY:{description:"Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...",type:"number",default:a.STheme.get("scroll.offsetY")}}}}var Yt=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,o){function n(c){try{p(s.next(c))}catch(h){o(h)}}function l(c){try{p(s.throw(c))}catch(h){o(h)}}function p(c){var h;c.done?r(c.value):((h=c.value)instanceof i?h:new i(function(_){_(h)})).then(n,l)}p((s=s.apply(e,t||[])).next())})};class mt extends a.SLitComponent{static get properties(){return a.SLitComponent.createProperties({},ut)}static get styles(){return a.r`
            ${a.o(`
                s-scroll{display:inline-block;cursor:pointer}

            `)}
        `}constructor(){super(a.__deepMerge({name:"s-scroll",interface:ut}))}firstUpdated(){return Yt(this,void 0,void 0,function*(){this.addEventListener("click",t=>{t.preventDefault(),this._scrollTo(this.props.to)})})}_scrollTo(t){var i=a.STheme.get("scroll"),s=this.props.duration||(i==null?void 0:i.duration)||300,r=this.props.offset||i.offset||0,o=this.props.offsetX||i.offsetX||r,n=this.props.offsetY||i.offsetY||r;switch(t){case"top":a.__scrollTo("top",{duration:s,offset:r,offsetX:o,offsetY:n});break;case"bottom":a.__scrollTo("bottom",{duration:s,offset:r,offsetX:o,offsetY:n});break;default:var l=document.querySelector(t);if(console.log("SCRO",t,l),!l)return;a.__scrollTo(l,{duration:s,offset:r,offsetX:o,offsetY:n})}}render(){return a.$``}}class _t extends a.SInterface{static get _definition(){return{darkModeicon:{description:"Specify if you want to dark mode icon or not",type:"Boolean",default:!1},darkModeIconClass:{description:"Specify the class to apply on the i tag for the dark mode icon",type:"String",default:"s-icon:dark-mode"}}}}class ft extends a.SLitComponent{constructor(){super({name:"s-theme-switcher",interface:_t}),this._themes=a.STheme.themes}static get properties(){return a.SLitComponent.createProperties({},_t)}static get styles(){return a.r`
            ${a.o(`.s-theme-switcher{display:inline-block;position:relative;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item{display:flex;align-items:center;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode{opacity:0;pointer-events:none;display:flex;align-items:center}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode.visible{opacity:1;pointer-events:all}
`)}
        `}_toggleDarkMode(){a.STheme.isDark()?a.STheme.setThemeVariant("light"):a.STheme.setThemeVariant("dark"),this.componentUtils.dispatchEvent("change",{detail:a.STheme}),this.requestUpdate()}_setTheme(t){a.STheme.setTheme(t),this.requestUpdate()}render(){const t=Object.keys(this._themes),i=a.STheme.getThemeMetas(),s=a.STheme.theme;return a.$`
            <div class="${this.componentUtils.className("__root")}">
                ${t.length===1?a.$`
                          <input
                              type="checkbox"
                              @change=${()=>this._toggleDarkMode()}
                              class="${this.componentUtils.className("__switch","s-switch")}"
                              ?checked=${a.STheme.isDark()}
                          />
                          ${this.props.darkModeIcon?a.$`
                                    <i
                                        class="${this.componentUtils.className("__icon")} ${this.props.darkModeIconClass}"
                                    ></i>
                                `:""}
                      `:a.$`
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
                                  ${t.map(r=>{var o=this._themes[r];return a.$`
                                          <div
                                              class="${this.componentUtils.className("__dropdown-item","s-dropdown-item")} ${s===r?"active":""}"
                                              @click=${n=>{n.preventDefault(),this._setTheme(r)}}
                                          >
                                              <div
                                                  class="${this.componentUtils.className("__theme-name")}"
                                              >
                                                  ${o.metas.title}
                                              </div>
                                              <div
                                                  class="${this.componentUtils.className("__dark-mode")} ${s===r?"visible":""}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${n=>{n.stopPropagation(),this._toggleDarkMode()}}
                                                      class="${this.componentUtils.className("__switch","s-switch")}"
                                                      ?checked=${a.STheme.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon?a.$`
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
        `}}class Vt extends a.SInterface{static get _definition(){return{ref:{description:"Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM",type:"String"},position:{description:"Specify the placement of your floating element. By default it will try to be placed as good as possible.",type:"String",values:["top","right","bottom","left","top-start","top-end","right-start","right-end","bottom-start","bottom-end","left-start","left-end","auto"],default:"auto"},shift:{description:"Specify a space between the floating element and the viewport side to respect",type:"Number",default:10},offset:{description:"Specify a space between the floating element and the reference one to respect",type:"Number"},arrow:{description:"Specify if you want an arrow or not",type:"Boolean",default:!0},arrowSize:{description:"Specify the size of the arrow in px",type:"Number",default:15},arrowPadding:{description:"Specify the padding of the arrow in px",type:"Number",default:10}}}}class yt extends a.SFeature{constructor(t,i,s){super(t,i,a.__deepMerge({name:"s-floating",interface:Vt,style:`.s-floating{transform:none;transition:none}.s-floating:before{content:none}.s-floating:after{content:none}.s-floating .s-floating__arrow{position:absolute;background:hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));width:var(--arrow-size, 8px);height:var(--arrow-size, 8px);transform:rotate(45deg)}
`},s!=null?s:{})),this.props.ref?this._$ref=document.querySelector(this.props.ref):this._$ref=this.node.parentElement}mount(){this.props.offset===void 0&&this.props.arrow&&(this.props.offset=this.props.arrowSize),a.__makeFloat(this.node,this._$ref,this.props)}}var y={min:{string:"Must have at least %n characters",object:"Must have at least %n properties",number:"Must be greater than %n",array:"Must have at least %n items"},max:{string:"Must have at max %n characters",object:"Must have at max %n properties",number:"Must be lower than %n",array:"Must have at max %n items"},email:{string:"Must be a valid email address"},required:{default:"This is required"},isoDate:{string:"Must be a valid ISO date"},isoTime:{string:"Must be a valid ISO time"},isoDateTime:{string:"Must be a valid ISO date time"},integer:{string:"Must be an integer"},number:{string:"Must be an number"},negative:{string:"Must be a negative number"},positive:{string:"Must be a positive number"},pattern:{string:"Must match the pattern %pattern"},alphanum:{string:"Must contain only alphanumeric characters"},creditCard:{string:"Must be a valid credit card number"},color:{string:"Must be a valid color (hex, rgb, rgba, hsl, hsla)"},hex:{string:"Must be a valid hex color"},password:{weak:"",medium:"Must be >=6 characters, at least 1 lowercase/uppercase/special character",strong:"Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character"}};class d extends a.SClass{constructor(t){super(a.__deepMerge({i18n:y},t!=null?t:{}))}static registerValidator(t,i,s){d._validators[t]={validator:i,settings:s}}static registerPreset(t,i,s){d._presets[t]={rules:i,settings:s}}static getValidatorsDefinition(){const t={};for(var[i,s]of Object.entries(d._validators))s.settings.definition&&(t[i]=s.settings.definition);return t}validate(t,i,s){var r,o;let n={valid:!0,rules:{},messages:[]},l=i;if(typeof i=="string"){if(!d._presets[i])throw new Error(`Sorry but the preset "${i}" is not registered`);l=d._presets[i].rules}for([r,o]of Object.entries(l)){let c=(p=o.settings)!=null?p:{},h=(p=o.value)!=null?p:o,_;const $=d._validators[r];if(!$)throw new Error(`Sorry but the validator "${r}" is not registered`);var p=Object.assign(Object.assign({},c),{i18n:(p=this.settings.i18n[r])!=null?p:{}});(_=typeof i=="boolean"?$.validator(t,p):$.validator(t,h,p)).valid?n.rules[r]=_:(_.message=_.message.replace("%value",t).replace("%validator",r),n.valid=!1,n.rules[r]=_,n.messages.push(_.message))}return n}}d._validators={},d._presets={},d.registerValidator("min",function(e,t,i){var s;let r,o;var n=a.__deepMerge({i18n:y.min,trim:!0},i!=null?i:{});switch(!0){case typeof e=="string":n.trim&&(e=e.trim()),o=e.length>=t,r=(s=n.i18n)==null?void 0:s.string.replace("%n",t);break;case typeof e=="number":o=t<=e,r=(s=n.i18n)==null?void 0:s.number.replace("%n",t);break;case Array.isArray(e):o=e.length>=t,r=(s=n.i18n)==null?void 0:s.array.replace("%n",t);break;case typeof e=="object":o=Object.keys(e).length>=t,r=(s=n.i18n)==null?void 0:s.object.replace("%n",t);break;default:throw new Error('Sorry but the "min" validation only works with string, number, array or object values.')}return{valid:o,message:r}},{definition:{description:'Validate string, array, object and number using the "min" rule',type:"String|Array|Object|Number"}}),d.registerValidator("max",function(e,t,i){var s;let r,o;var n=a.__deepMerge({i18n:y.max,trim:!0},i!=null?i:{});switch(!0){case typeof e=="string":n.trim&&(e=e.trim()),o=e.length<=t,r=(s=n.i18n)==null?void 0:s.string.replace("%n",t);break;case typeof e=="number":o=e<=t,r=(s=n.i18n)==null?void 0:s.number.replace("%n",t);break;case Array.isArray(e):o=e.length<=t,r=(s=n.i18n)==null?void 0:s.array.replace("%n",t);break;case typeof e=="object":o=Object.keys(e).length<=t,r=(s=n.i18n)==null?void 0:s.object.replace("%n",t);break;default:throw new Error('Sorry but the "max" validation only works with string, number, array or object values.')}return{valid:o,message:r}},{definition:{description:'Validate string, array, object and number using the "max" rule',type:"String|Array|Object|Number"}}),d.registerValidator("email",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.email,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "email" validation only works with string');return e=e=t.trim?e.trim():e,{valid:s=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.toLowerCase()),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate an email string",type:"String"}}),d.registerValidator("required",function(e,t){let i,s;return t=a.__deepMerge({i18n:y.required,trim:!0},t!=null?t:{}),{valid:s=(e=typeof e=="string"&&t.trim?e.trim():e)!=null&&e!=="",message:i=s?i:(e=t.i18n)==null?void 0:e.default}},{definition:{description:"Make sure a value has been provided",type:"Boolean"}}),d.registerValidator("isoDate",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.isoDate,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "isoDate" validation only works with string');return t.trim&&(e=e.trim()),{valid:s=(e=e).match(/^([0-9]{4})-(1[0-2]|0[1-9])$/)||e.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/)||e.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/)||e.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate an iso date string",type:"String"}}),d.registerValidator("isoTime",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.isoTime,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "isoTime" validation only works with string');return t.trim&&(e=e.trim()),{valid:s=(e=e).match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/)||e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)||e.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/)||e.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate an iso time string",type:"String"}}),d.registerValidator("isoDateTime",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.isoDateTime,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "isoDateTime" validation only works with string');return t.trim&&(e=e.trim()),{valid:s=(e=e).match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)||e.match(/^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate an iso date string",type:"String"}}),d.registerValidator("integer",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.integer,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "integer" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e)&&Number.isInteger(e))||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}},{definition:{description:"Validate an integer",type:"number"}}),d.registerValidator("number",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.number,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "number" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e))||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}},{definition:{description:"Validate an number",type:"number"}}),d.registerValidator("negative",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.negative,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "negative" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e)&&e<0)||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}},{definition:{description:"Validate an negative number",type:"number"}}),d.registerValidator("positive",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.positive,cast:!0,trim:!0},t!=null?t:{}),typeof e!="string"&&typeof e!="number")throw new Error('Sorry but the "positive" validation only works with string and number');return typeof(e=typeof e=="string"&&t.trim?e.trim():e)=="string"&&t.cast&&(e=Number(e)),(s=!isNaN(e)&&0<=e)||(i=(e=t.i18n)==null?void 0:e.string),{valid:s,message:i}},{definition:{description:"Validate an positive number",type:"number"}}),d.registerValidator("pattern",function(e,t,i){let s,r;if(i=a.__deepMerge({i18n:y.pattern,trim:!0},i!=null?i:{}),typeof e!="string")throw new Error('Sorry but the "pattern" validation only works with string');return i.trim&&(e=e.trim()),{valid:r=new RegExp(t).test(e),message:s=r?s:(e=i.i18n)==null?void 0:e.string.replace("%pattern",t)}},{definition:{description:"Validate a string using a regex pattern",type:"String"}}),d.registerValidator("alphanum",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.alphanum,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "alphanum" validation only works with string');return{valid:s=(e=t.trim?e.trim():e).match(/^[a-z0-9]+$/i),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate an alphanum string",type:"String"}}),d.registerValidator("creditCard",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.creditCard,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "creditCard" validation only works with string');return e=e=t.trim?e.trim():e,{valid:s=/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate a credit card string",type:"String"}}),d.registerValidator("color",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.color,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "color" validation only works with string');return t.trim&&(e=e.trim()),{valid:s=a.__isColor(e),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate a color string",type:"String"}}),d.registerValidator("hex",function(e,t){let i,s;if(t=a.__deepMerge({i18n:y.hex,trim:!0},t!=null?t:{}),typeof e!="string")throw new Error('Sorry but the "hex" validation only works with string');return{valid:s=(e=t.trim?e.trim():e).match(/^#[a-zA-Z0-9]{3,6}$/),message:i=s?i:(e=t.i18n)==null?void 0:e.string}},{definition:{description:"Validate a hexadecimal string",type:"String"}}),d.registerValidator("password",function(e,t,i){let s,r=!1;const o=a.__deepMerge({i18n:y.password,trim:!0,weakReg:/.*/,mediumReg:/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,strongReg:/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/},i!=null?i:{});if(typeof e!="string")throw new Error('Sorry but the "password" validation only works with string');o.trim&&(e=e.trim());let n=[];return o.weakReg.test(e)&&(e&&n.push("weak"),t==="weak"&&(r=!0)),o.mediumReg.test(e)&&(e&&n.push("medium"),t==="medium"&&(r=!0)),o.strongReg.test(e)&&(e&&n.push("strong"),t==="strong"&&(r=!0)),r||(s=(i=o.i18n)==null?void 0:i[t]),{valid:r,message:s,metas:{levels:["weak","medium","strong"],validLevels:n}}},{definition:{description:"Validate a password string",type:"String"}});var z,Ot;const gt=d.getValidatorsDefinition(),vt={};for([z,Ot]of Object.entries(gt))vt[z+"Message"]={description:`The message to display when the validator "${z}" fails`,type:"String"};class Z extends a.SInterface{static get _definition(){return Object.assign(Object.assign(Object.assign({},gt),vt),{type:{description:"Specify the validation type. Usually automatically detected depending on the field type",type:"String",default:"text"},on:{description:'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',type:"Array<String>",values:["keyup","change","submit","enter","reset"],default:["keyup","change","submit","enter","reset"]},errorClass:{description:"Specify the class to apply when theres an error",type:"String",default:"s-form-validate--error s-color--error"},validClass:{description:"Specify the class to apply on your s-form-validate element when validation is passed successfully",type:"String",default:"s-form-validate--valid s-color--success"},handlers:{description:'Specify some custom handlers by validator that will be executed in addition to the default validate behavior. The handler will take as argument an object containing the "result" SValidator result, the "$feature" that represent the s-validate node, the "$form" node if exists, the "$node" attached node if using the "nodes" property, the "$field" that represent the input field handled and the "props" that represent the feature properties',type:"Object",default:{}},nodes:{description:'Specify a css selector that target some HTMLElements used for the validation. Every HTMLElement has to specify 1 validator by using element attributes (same as on the feature itself). Classes are applied on each "node" to specify if the validator is valid or not',type:"String"},language:{description:"Specify the language you want to use for messages",type:"String",default:"en"},displayError:{description:"Specify if you want to display the error messages or not",type:"Boolean",default:!0},errorContainerAttr:{description:"Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element",type:"String",default:"s-form-validate-error"}})}}var Ht=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,o){function n(c){try{p(s.next(c))}catch(h){o(h)}}function l(c){try{p(s.throw(c))}catch(h){o(h)}}function p(c){var h;c.done?r(c.value):((h=c.value)instanceof i?h:new i(function(_){_(h)})).then(n,l)}p((s=s.apply(e,t||[])).next())})};class bt extends a.SFeature{constructor(t,i,s){var r;Object.keys((r=(r=a.SComponentUtils.getDefaultProps(t))==null?void 0:r.customValidations)!=null?r:{}).forEach(o=>{Z.definition[o]||(Z.definition[o]={type:"String|Boolean"})}),super(t,i,a.__deepMerge({name:"s-form-validate",interface:Z,style:`@-webkit-keyframes error-message-appear{0%{line-height:1;max-height:0}to{max-height:2em;line-height:2}}@keyframes error-message-appear{0%{line-height:1;max-height:0}to{max-height:2em;line-height:2}}.s-form-validate+.s-form-validate-error-message{text-align:end;color:hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0)) * 1%),calc((var(--s-theme-color-error-l, 0)) * 1%),var(--s-theme-color-error-a, 1));overflow:hidden;max-height:0;line-height:1;margin:0;-webkit-animation:.2s error-message-appear var(--s-theme-easing-default, 0) forwards;animation:.2s error-message-appear var(--s-theme-easing-default, 0) forwards}
`},s!=null?s:{})),this._nodeByValidator={},this._isDirty=!1,this._isValidating=!1,(r=this.props.handlers)!=null&&r.password||(t=this.props.handlers)!=null&&(t.password=this._passwordDefaultHandler),this._validator=new d,this._$form=a.__querySelectorUp(this.node,"form"),this._$form&&this._$form.addEventListener("submit",o=>{var n;if(!this._$form._submitHandler){this._$form._submitHandler=!0;const l=[],p=c=>{l.push(c.detail)};this._$form.addEventListener("s-form-validate.error",p),o.preventDefault(),o instanceof CustomEvent&&((n=o.detail)==null||!n.internal)||o.stopPropagation(),setTimeout(()=>{delete this._$form._submitHandler,this._$form.removeEventListener("s-form-validate.error",p),l.length||(this._$form.submit(),o instanceof CustomEvent||this._$form.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0})))})}}),this.componentUtils.exposeApi({validate:this.validate},this),this.props.nodes&&(this._$nodes=this.node.querySelectorAll(this.props.nodes),this._$nodes.forEach(o=>{for(let l=0;l<o.attributes.length;l++){var n=o.attributes[l];n.name in this.props&&(this.props[a.__camelCase(n.name)]=a.autoCast(n.value),this._nodeByValidator[a.__camelCase(n.name)]=o)}}))}mount(){a.__querySelectorLive("input,textarea,select",t=>{this._initField(t)},{rootNode:this.node,scopes:!1}),this.props.type&&(this.props.type==="text"?this._validationType="string":this._validationType=this.props.type)}_passwordDefaultHandler({result:t,$feature:i}){var s;t.valid?(i.classList.remove("password-weak"),i.classList.remove("password-medium"),i.classList.remove("password-strong")):(s=t.metas)!=null&&s.levels&&t.metas.levels.forEach(r=>{r!==t.metas.validLevels.slice(-1)[0]?i.classList.remove("password-"+r):i.classList.add("password-"+r)})}_initField(t){this._$field=t,this._$field=this.node,t=this.node.querySelector("input,textarea,select"),t&&(this._$field=t),this.componentUtils.fastdom.mutate(()=>{this._$field.setAttribute("novalidate","true"),["required","maxlength","minlength","max","min","pattern"].forEach(i=>{!this._$field.hasAttribute(i)||this.props[i]||(this.props[i]=this._$field.getAttribute(i),i!=="maxlength"&&i!=="minlength"&&this._$field.removeAttribute(i))})}),this.props.on.forEach(i=>{var s;i==="enter"?this._$field.addEventListener("keyup",r=>{r.keyCode===13&&(this._$form?this._$form.dispatchEvent(new CustomEvent("submit",{bubbles:!1,detail:{internal:!0}})):this.validate(r))}):i==="reset"?(s=this._$field.form)!=null&&s.addEventListener(i,r=>{setTimeout(()=>{this.validate(r)})}):i==="submit"?(s=this._$field.form)!=null&&s.addEventListener(i,r=>{var o;r.preventDefault(),r instanceof CustomEvent&&((o=r.detail)==null||!o.internal)||(r.stopPropagation(),this.validate(r))}):i==="keyup"?this.node.addEventListener(i,r=>{this._isDirty&&this.validate(r)}):this.node.addEventListener(i,r=>{this.validate(r)})})}validate(t){if(!this._$field)throw new Error("No $field has been found to be validated...");if(((r=t==null?void 0:t.currentTarget)==null?void 0:r.tagName.toLowerCase())==="form"&&t.type!=="reset"&&t.preventDefault(),!this._isValidating){this._isValidating=!0,setTimeout(()=>{this._isValidating=!1});let o;const n={};for(var[i,s]of Object.entries(d.getValidatorsDefinition()))this.props[i]!==void 0&&(n[i]=this.props[i]);var r=this._getFieldValue();o=this._validator.validate(r,n),t.type==="reset"&&(o={valid:!0}),this._applyResult(o,t)}}_getFieldValue(){switch(!0){case this._$field.type==="checkbox":return this._getCheckboxValues();case this._$field.type==="range":return this._getRangeValue();case this._$field.tagName.toLowerCase()==="select":return this._getSelectValues();case this._$field.type==="radio":return this._getRadioValue();default:return this._$field.value}}_getCheckboxValues(){return Array.from(this.node.querySelectorAll('input[type="checkbox"]:checked')).map(t=>t.value)}_getRadioValue(){return this.node.querySelector('input[type="radio"]:checked').value}_getRangeValue(){return parseFloat(this._$field.value)}_getSelectValues(){return Array.from(this._$field.querySelectorAll("option")).filter(t=>t.selected).map(t=>t.value)}_applyResult(t,i){var s,r;return Ht(this,void 0,void 0,function*(){for(var[o,n]of Object.entries(d.getValidatorsDefinition()))this.props[o]&&this.props.handlers[o]&&(yield this.props.handlers[o]({result:Object.assign({},(s=(s=t.rules)==null?void 0:s[o])!=null?s:t),props:this.props,$feature:this.node,$form:this._$form,$field:this._$field,$node:(s=this._nodeByValidator)==null?void 0:s[o]}));if(t.valid){if(this._isDirty=!1,i.type!=="reset"?this.node.classList.add(...this.props.validClass.split(" ")):this.node.classList.remove(...this.props.validClass.split(" ")),this.node.classList.remove(...this.props.errorClass.split(" ")),(r=this._$error)!=null&&r.hasAttribute("s-form-validate-error")&&(r=this._$error)!=null&&r.remove(),Object.keys(this._nodeByValidator).length)for(var[l,p]of Object.entries(t.rules))this._nodeByValidator[l]&&(this._nodeByValidator[l].classList.remove(...this.props.errorClass.split(" ")),this._nodeByValidator[l].classList.add(...this.props.validClass.split(" ")));this.componentUtils.dispatchEvent("valid",{detail:t})}else{this._isDirty=!0,this.node.classList.add(...this.props.errorClass.split(" ")),this.node.classList.remove(...this.props.validClass.split(" "));var c=Object.keys(t.rules)[0];if(Object.keys(this._nodeByValidator).length)for(var[h,_]of Object.entries(t.rules))this._nodeByValidator[h]&&(_.valid?(this._nodeByValidator[h].classList.remove(...this.props.errorClass.split(" ")),this._nodeByValidator[h].classList.add(...this.props.validClass.split(" "))):(this._nodeByValidator[h].classList.remove(...this.props.validClass.split(" ")),this._nodeByValidator[h].classList.add(...this.props.errorClass.split(" "))));else c=this.props[c+"Message"]||t.messages[0],this.props.displayError&&(this._$error=(r=this.node.querySelector(`[${this.props.errorContainerAttr}]`))!=null?r:this.node.nextElementSibling,this._$error&&this._$error.hasAttribute("s-form-validate-error")||(this._$error=document.createElement("p"),this._$error.setAttribute("s-form-validate-error","true"),this._$error.classList.add("s-form-validate-error-message"),this.node.parentNode.insertBefore(this._$error,this.node.nextSibling)),this._$error.innerHTML=c);this.componentUtils.dispatchEvent("error",{detail:t})}})}}class $t extends a.SInterface{static get _definition(){return{name:{type:"String",description:'Specify the name to assign to the internal input[type="range"]'},value:{type:"Number",description:"Specify the initial range value"},min:{type:"Number",description:"Specify the minimal value or the range",default:0},max:{type:"Number",description:"Specify the maximal value of the range",default:100},step:{type:"Number",description:"Specify the steps between each values"},target:{type:"String",description:"Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"},tooltip:{type:"Boolean",description:"Specify if you want to display the value inside a tooltip on top of the thumb",default:!1},disabled:{type:"Boolean",description:"Specify if this range is disabled",default:!1}}}}var Ft=globalThis&&globalThis.__awaiter||function(e,t,i,s){return new(i=i||Promise)(function(r,o){function n(c){try{p(s.next(c))}catch(h){o(h)}}function l(c){try{p(s.throw(c))}catch(h){o(h)}}function p(c){var h;c.done?r(c.value):((h=c.value)instanceof i?h:new i(function(_){_(h)})).then(n,l)}p((s=s.apply(e,t||[])).next())})};class qt extends a.SLitComponent{static get properties(){return a.SLitComponent.createProperties({},$t)}static get styles(){return a.r`
            ${a.o(`
                .s-range{display:block;width:100%}.s-range:not([mounted])>*{display:none}.s-range[disabled]{pointer-events:none}.s-range__root{display:flex;width:100%}.s-range__input{flex-grow:1;opacity:1!important}.s-range__input:hover+.s-range__tooltip,.s-range__input:focus+.s-range__tooltip{opacity:1!important}.s-range__tooltip{transition:none}

            `)}
        `}constructor(){super(a.__deepMerge({name:"s-range",interface:$t}))}firstUpdated(){var t;return Ft(this,void 0,void 0,function*(){this._$input=this.querySelector("input"),this._$tooltip=this.querySelector(".s-range__tooltip"),this._$input.addEventListener("input",i=>{this._handleTooltip(),this._handleTarget()}),this.props.target&&(this._$targets=Array.from(document.querySelectorAll(this.props.target))),this._$input.value=this.props.value,(t=this._$input)!=null&&t.form&&this._$input.form.addEventListener("reset",()=>{setTimeout(()=>{this._handleTooltip(),this._handleTarget()})}),this._handleTooltip(),this._handleTarget()})}_handleTarget(){this._$targets&&this._$targets.forEach(t=>{t.innerHTML=this._$input.value,t.value=this._$input.value})}_handleTooltip(){var t,i,s;this._$tooltip&&(t=this._$input.value,i=this._$input.min||0,s=this._$input.max||100,s=Number(100*(t-i)/(s-i)),this._$tooltip.style.left=`calc(${s}% + (${8-.15*s}px))`,this._$tooltip.innerHTML=t)}render(){return a.$`
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
                ${this.props.tooltip?a.$`
                          <div
                              class="${this.componentUtils.className("__tooltip","s-tooltip")}"
                          ></div>
                      `:""}
            </div>
        `}}class Bt extends a.SInterface{static get _definition(){return{platform:{type:"String"}}}}class Pt extends a.SLitComponent{constructor(){super({shadowDom:!1})}static get properties(){return a.SLitComponent.createProperties({},Bt)}firstUpdated(){return O(this,null,function*(){this._docmap=yield a.loadDocmap(),this.grabItem()})}grabItem(){return O(this,null,function*(){var t=a.__filter(this._docmap.map,(r,o)=>{var n,l;return!!o.platform&&!!((l=(n=o.example)==null?void 0:n[0])!=null&&l.code)&&o.platform[0].name===this.props.platform}),s=Object.keys(t).length,i=Object.keys(t),s=Math.floor(Math.random()*s);this.item=t[i[s]],this.requestUpdate(),this.timeout=setTimeout(()=>{this.timeout=void 0,this.requestUpdate()},200)})}render(){var t,i,s,r,o,n;return a.$`
      <div class="ck-discover">
        ${this.item?a.$`
              <a
                @click="${this.grabItem}"
                class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
              >
                <i class="s-icon:ui-refresh"></i>
              </a>
              ${this.item.async?a.$`
                    <span class="s-badge:outline s-color:accent">Async</span
                    >&nbsp;
                  `:""}
              ${((i=(t=this.item.type)==null?void 0:t.types)==null?void 0:i[0].type)||this.item.type?a.$`
                    <span class="s-badge s-color:complementary"
                      >${(n=(o=(r=(s=this.item.type)==null?void 0:s.types)==null?void 0:r[0])==null?void 0:o.type)!=null?n:this.item.type}</span
                    >
                  `:""}
              <br />
              <br />
              <h1 class="s-typo:h3 s-mbe:30">${this.item.name}</h1>
              <p class="s-typo:p s-mbe:30 s-truncate:3">
                ${this.item.description}
              </p>
              ${this.timeout?"":a.$`
                    <s-code-example lines="8" s-deps css="codeExample">
                      <code
                        hidden
                        lang="${this.props.platform==="ts"||this.props.platform==="node"?"js":this.props.platform==="postcss"?"css":this.props.platform}"
                      >
                        ${this.item.example[0].code}
                      </code>
                    </s-code-example>
                  `}
            `:a.$`
              <div class="s-code-example-loader">
                <i class="s-loader:spinner s-color:accent"></i>
                &nbsp;
                <p class="s-typo:p s-display:inline-block">
                  Loading code example. Please wait...
                </p>
              </div>
            `}
      </div>
    `}}class Rt extends a.SInterface{static get _definition(){return{platform:{type:"String"}}}}class Wt extends a.SLitComponent{constructor(){super({shadowDom:!1}),this._tabs=[{id:"js",title:"JS"},{id:"css",title:"CSS"},{id:"node",title:"NodeJS"},{id:"php",title:"PHP"}],this.state={activeTabId:"js"}}static get properties(){return a.SLitComponent.createProperties({},Rt)}firstUpdated(){return O(this,null,function*(){this._$discover=this.querySelector("ck-discover")})}render(){return a.$`
      <div class="ck-discover-tabed">
        <ul class="s-tabs s-color:accent s-mbe:50 @mobile s-tabs:grow">
          ${this._tabs.map(t=>a.$`
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
    `}}O(this,null,function*(){var e,t;H.define(),t={},e="s-rating",dt.define(e,dt,t),e={},t="s-color-picker",q.define(t,q,e),t={},e="s-datetime-picker",a.SLitComponent.define(e,jt,t),e={},t="s-scroll",mt.define(t,mt,e),t={},e="s-range",a.SLitComponent.define(e,qt,t),e={},t="s-theme-switcher",ft.define(t,ft,e),t={},e="s-floating",yt.define(e,yt,Object.assign({},t)),e={customValidations:{coffeekraken:(i,s)=>i==="coffeekraken"?s.message("Are you sure? Krakens are dangerous..."):i}},t="s-form-validate",bt.define(t,bt,Object.assign({mountWhen:"interact"},e)),t={},e="ck-discover",a.SLitComponent.define(e,Pt,t),e={},t="ck-discover-tabed",a.SLitComponent.define(t,Wt,e)})});
