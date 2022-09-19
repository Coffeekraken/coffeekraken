define(["exports","./index.d9d97e89","./read.72e65354"],function(u,o,y){"use strict";function _(r){function t(e){e.preventDefault()}r.addEventListener("touchstart",t,{passive:!0}),r.addEventListener("touchmove",t,{passive:!0}),r.addEventListener("touchend",t,{passive:!0}),r.addEventListener("touchcancel",t,{passive:!0})}class v extends o.SInterface{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},updateInput:{description:'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',type:{type:"Array<String>",splitChars:[","]},values:["pointerdown","pointerup","pointermove","validate","eyedropper","reset","clear","close"],default:["pointerup","validate","eyedropper","reset","clear","close"]},format:{description:'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',type:"String",values:["hex","hexa","rgb","rgba","hsl","hsla"],default:"hex"},inline:{description:"Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input",type:"Boolean",default:!1,physical:!0},i18n:{description:'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',type:"Object",default:{reset:"Reset",clear:"Clear",validate:"Validate"}},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},backdrop:{description:'Specify if you want the ".s-backdrop" element or not',type:"Boolean",default:!1},eyeDropper:{description:"Specify if you want the eye dropper capability to pick a color anywhere on the screen or not",type:"Boolean",default:!0},actions:{description:'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',type:{type:"Array<String>",splitChars:[","," "]},values:["clear","reset","validate"],default:["reset","validate"]},floatSettings:{description:'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',type:"Object",default:{position:"auto",shift:10,offset:0,arrow:!1,arrowSize:15,arrowPadding:10}},eyeDropperIconClass:{description:'Specify the class you want to apply on the "i" that display the "eyeDropper" icon',type:"String",default:"s-icon s-icon--eye-dropper"},copyIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon',type:"String",default:"s-icon s-icon--copy"},copiedIconClass:{description:'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',type:"String",default:"s-icon s-icon--copied"},buttonIconClass:{description:"Specify the class you want to apply on the injected button icon",type:"String",default:"s-icon s-icon--color"},backdropClass:{description:'Specify the class to apply on the backdrop when the "backdrop" prop is true',type:"String",default:"s-backdrop"},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1}}}}var h=globalThis&&globalThis.__awaiter||function(r,t,e,i){return new(e=e||Promise)(function(s,a){function n(p){try{d(i.next(p))}catch(c){a(c)}}function l(p){try{d(i.throw(p))}catch(c){a(c)}}function d(p){var c;p.done?s(p.value):((c=p.value)instanceof e?c:new e(function(m){m(c)})).then(n,l)}d((i=i.apply(r,t||[])).next())})};class f extends o.SLitComponent{constructor(){var t;super(o.__deepMerge({name:"s-color-picker",interface:v})),this.state={},this._originalState={},this._hasInput=!1,this._hasButton=!1,this._isShadeInInteraction=!1,this._isAlphaInInteraction=!1,this._isHueInInteraction=!1,this.state={h:0,s:0,l:0,a:1,metasFormat:"hex",value:void 0},this._$input=this.querySelector("input"),this._hasInput=this._$input!==null,this._$button=this.querySelector("button"),(t=this._$button)!=null&&t.addEventListener("pointerup",e=>e.preventDefault()),this._hasButton=this._$button!==null}static get properties(){return o.SLitComponent.createProperties({},v)}static get styles(){return o.r`
            ${o.o(`
                .s-color-picker{display:inline-block;position:relative}.s-color-picker[disabled]{pointer-events:none}.s-color-picker *[disabled]{opacity:1!important}.s-color-picker .s-backdrop{pointer-events:none;opacity:0}.s-color-picker .s-color-picker__root{display:flex;width:100%}.s-color-picker .s-color-picker__root.is-alpha-interacting *,.s-color-picker .s-color-picker__root.is-shade-interacting *,.s-color-picker .s-color-picker__root.is-hue-interacting *{cursor:none!important}.s-color-picker .s-color-picker__injected{display:flex;width:100%}.s-color-picker .s-color-picker__injected input{flex-grow:1}.s-color-picker .s-color-picker__injected button{flex-grow:0}.s-color-picker .s-color-picker__picker{position:absolute;top:100%;left:0;z-index:200;max-width:100vw;display:flex;flex-direction:column;pointer-events:none;opacity:0}.s-color-picker[inline] .s-color-picker__picker{position:unset;top:unset;left:unset;background:unset;pointer-events:all;opacity:1}.s-color-picker:focus-within .s-color-picker__picker{opacity:1;pointer-events:all}.s-color-picker:focus-within .s-backdrop{opacity:1;pointer-events:all}.s-color-picker .s-color-picker__chest{position:absolute;top:0;left:0;width:100%;height:100%;opacity:.02;pointer-events:none}.s-color-picker .s-color-picker__chest:before{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:repeating-linear-gradient(0deg,#000 0,#000 10px,#fff 10px,#fff 20px);background-position:50% 50%;z-index:-1}.s-color-picker .s-color-picker__chest:after{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:repeating-linear-gradient(90deg,#000 0,#000 10px,#fff 10px,#fff 20px);background-position:50% 50%;mix-blend-mode:difference;z-index:-1}.s-color-picker .s-color-picker__selectors{display:flex;height:215px}.s-color-picker .s-color-picker__shade-wrapper{position:relative;aspect-ratio:16/9;cursor:all-scroll;flex-grow:1}.s-color-picker .s-color-picker__shade-wrapper canvas{width:100%;height:100%;position:relative}.s-color-picker .s-color-picker__hue-wrapper,.s-color-picker .s-color-picker__alpha-wrapper{position:relative;width:30px;cursor:row-resize;flex-grow:0;flex-shrink:0}.s-color-picker .s-color-picker__hue-wrapper canvas,.s-color-picker .s-color-picker__alpha-wrapper canvas{width:100%;height:100%;position:relative}.s-color-picker .s-color-picker__hue-wrapper:after,.s-color-picker .s-color-picker__alpha-wrapper:after{content:"";display:block;width:100%;height:5px;background:red;position:absolute;left:50%;transform:translate(-50%,-50%);z-index:10;pointer-events:none}.s-color-picker .s-color-picker__hue-wrapper:after{top:calc((100 / 360 * var(--s-color-picker-h, 0)) * 1%)}.s-color-picker .s-color-picker__alpha-wrapper{display:none;background:white}.s-color-picker .s-color-picker__alpha-wrapper.active{display:block}.s-color-picker .s-color-picker__alpha-wrapper:after{top:calc(100% - var(--s-color-picker-a, 0) * 100 * 1%)}.s-color-picker .s-color-picker__shade-wrapper:after{content:"";display:block;width:10px;height:10px;background:red;position:absolute;left:50%;transform:translate(-50%,-50%);z-index:10;top:calc(100% - var(--s-color-picker-shade-y, 0) * 1%);left:calc(var(--s-color-picker-shade-x, 0) * 1%);pointer-events:none}.s-color-picker .s-color-picker__metas{display:flex;flex-wrap:nowrap}.s-color-picker .s-color-picker__metas .s-color-picker__btn{flex-grow:0}.s-color-picker .s-color-picker__formats{display:flex}.s-color-picker .s-color-picker__color{display:flex;position:relative}.s-color-picker .s-color-picker__actions{display:flex}.s-color-picker .s-color-picker__actions button{flex-grow:1;text-align:center}.s-color-picker .s-color-picker__color-input{flex-shrink:1;flex-grow:1}.s-color-picker .s-color-picker__preview{position:relative;width:50px;flex-shrink:0;flex-grow:0;cursor:pointer;background-color:hsla(var(--s-color-picker-h),calc(var(--s-color-picker-s) * 1%),calc(var(--s-color-picker-l) * 1%),var(--s-color-picker-a))}.s-color-picker .s-color-picker__preview i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.s-color-picker .s-color-picker__eye-dropper{position:absolute;top:0;right:50px;width:50px;height:100%;background:rgba(0,0,0,0);cursor:pointer}.s-color-picker .s-color-picker__eye-dropper i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}[dir=rtl] .s-color-picker .s-color-picker__picker,.s-color-picker[dir=rtl] .s-color-picker__picker{right:auto;left:0}

            `)}
        `}mount(){return h(this,void 0,void 0,function*(){this._hueColor=new o.SColor("#000"),this._color=new o.SColor("#000")})}firstUpdated(){var t;return h(this,void 0,void 0,function*(){Object.assign(this._originalState,this.state),this._$root=this.querySelector("."+this.componentUtils.uniqueClassName("__root")),this._$picker=this.querySelector("."+this.componentUtils.uniqueClassName("__picker")),this._$colorInput=this.querySelector("."+this.componentUtils.uniqueClassName("__color-input")),this._$shade=this.querySelector("."+this.componentUtils.uniqueClassName("__shade")),this._shadeCtx=this._$shade.getContext("2d"),this._$hue=this.querySelector("."+this.componentUtils.uniqueClassName("__hue")),this._hueCtx=this._$hue.getContext("2d"),this._$alpha=this.querySelector("."+this.componentUtils.uniqueClassName("__alpha")),this._alphaCtx=this._$alpha.getContext("2d"),this._$input||(this._$input=this.querySelector("input")),(t=this._$input)!=null&&t.hasAttribute("name")||(t=this._$input)!=null&&t.setAttribute("name",this.props.name),(t=this._$input)!=null&&t.hasAttribute("placeholder")||(t=this._$input)!=null&&t.setAttribute("placeholder",this.props.placeholder),(t=this._$input)!=null&&t.hasAttribute("autocomplete")||(t=this._$input)!=null&&t.setAttribute("autocomplete","off"),this._$input.setAttribute("readonly",!0),this.addEventListener("focusin",e=>{var i;(i=this._floatApi)!=null&&i.update()}),_(this.querySelector(".s-color-picker__selectors")),_(this.querySelector(".s-color-picker__metas")),this._isAlphaWanted()||(this.state.a=1),this._initColor(),this._initHueSelector(),this._updateAlphaSelector(),this._updateShadeCanvas(),this._initSelectionInteractions(),this._restoreState(),this._updateInput("init"),this.props.inline||function(e=navigator.userAgent){return new o.MobileDetect(e).mobile()!==null}()||(this._floatApi=o.__makeFloat(this._$picker,this._$root,this.props.floatSettings))})}_initColor(){var t=(t=this.props.value)!=null?t:(t=this._$input)==null?void 0:t.value;t&&(this._inputColor=new o.SColor(t)),!this.state.value&&t?(this._color=new o.SColor(t),this._isAlphaWanted()||(this._color.a=1)):(this._color.h=this.state.h,this._color.s=this.state.s,this._color.l=this.state.l,this._color.a=this.state.a)}_updateInput(t){if(t==="init"||this.props.updateInput.includes(t)){switch(this.props.format){case"hex":this.state.value=this._color.toHexString();break;case"hexa":this.state.value=this._color.toHexaString();break;case"rgb":this.state.value=this._color.toRgbString();break;case"rgba":this.state.value=this._color.toRgbaString();break;case"hsl":this.state.value=this._color.toHslString();break;case"hsla":this.state.value=this._color.toHslaString()}this._$input&&this._$input.value!==this.state.value&&(this._$input.value=this.state.value),t!=="init"&&this.componentUtils.dispatchEvent("change",{detail:this._color.toObject()}),this.requestUpdate()}}_restoreState(){this._setAlpha(this._color.a),this._setHue(this._color.h),this._setShade(this._color.s,this._color.l)}_setMetasFormat(t){return this.state.metasFormat=t,this.requestUpdate(),!1}_validate(){var t,e;this._updateInput("validate"),(e=(t=document.activeElement)==null?void 0:t.blur)!=null&&e.call(t)}_clear(){this._inputColor?(this._setAlpha(this._inputColor.a),this._setHue(this._inputColor.h),this._setShade(this._inputColor.s,this._inputColor.l)):(this._setAlpha(1),this._setHue(0),this._setShade(0,0)),this._updateInput("clear")}_reset(){this._setAlpha(this._originalState.a),this._setHue(this._originalState.h),this._setShade(this._originalState.s,this._originalState.l),this._updateInput("reset")}_isAlphaWanted(){return this.props.format.includes("a")}_initSelectionInteractions(){let t=!1,e=(this._$shade.addEventListener("pointerdown",i=>{t=!0,this._isShadeInInteraction=!0,this._$shade.setPointerCapture(i.pointerId),this._setShadeFromEvent(i,!1),this._updateInput("pointerdown"),this.requestUpdate()}),this._$shade.addEventListener("pointermove",i=>{i.preventDefault(),t&&(this._setShadeFromEvent(i,!1),this._updateInput("pointermove"))}),this._$shade.addEventListener("pointerup",i=>{t=!1,this._isShadeInInteraction=!1,this._$shade.releasePointerCapture(i.pointerId),this._setShadeFromEvent(i,!0),this._updateInput("pointerup"),this.requestUpdate()}),!1);this._$alpha.addEventListener("pointerdown",i=>{e=!0,this._isAlphaInInteraction=!0,this._$alpha.setPointerCapture(i.pointerId),this._setAlphaFromEvent(i,!1),this._updateInput("pointerdown"),this.requestUpdate()}),this._$alpha.addEventListener("pointermove",i=>{i.preventDefault(),e&&(this._setAlphaFromEvent(i,!1),this._updateInput("pointermove"))}),this._$alpha.addEventListener("pointerup",i=>{e=!1,this._isAlphaInInteraction=!1,this._$alpha.releasePointerCapture(i.pointerId),this._setAlphaFromEvent(i,!0),this._updateInput("pointerup"),this.requestUpdate()})}_setHueFromEvent(i,e=!0){var s=i.target.getBoundingClientRect(),i=i.clientY-s.top,s=100-Math.round(100/s.height*i);let a=360-Math.round(3.6*s);360<(a=a<0?0:a)&&(a=360),this._setHue(a,e)}_setHue(t,e=!0){e&&(this.state.h=t),this._color.h=t,this.style.setProperty("--s-color-picker-h",t),this._updateShadeCanvas(),this._updateAlphaSelector(),this.requestUpdate()}_setShadeFromEvent(a,e=!0){var i=a.target.getBoundingClientRect(),s=a.clientY-i.top,a=a.clientX-i.left;let n=100-Math.round(100/i.height*s),l=Math.round(100/i.width*a);100<(n=n<0?0:n)&&(n=100),100<(l=l<0?0:l)&&(l=100),this._setShade(l,.5*n,e)}_setShade(t,e,i=!0){var s=e+(100-t)/2,a=(s*=2*e/100,t);i&&(this.state.s=a,this.state.l=s),this._color.s=a,this._color.l=s,this.style.setProperty("--s-color-picker-shade-x",t),this.style.setProperty("--s-color-picker-shade-y",100<2*e?100:2*e),this.style.setProperty("--s-color-picker-s",a),this.style.setProperty("--s-color-picker-l",s),this._updateShadeCanvas(),this.requestUpdate()}_setAlphaFromEvent(s,e=!0){var i=s.target.getBoundingClientRect(),s=s.clientY-i.top;let a=100-Math.round(100/i.height*s);100<(a=a<0?0:a)&&(a=100),this._setAlpha(a/100,e)}_setAlpha(t,e=!0){e&&(this.state.a=t),this._color.a=t,this.style.setProperty("--s-color-picker-a",t),this._updateAlphaSelector(),this.requestUpdate()}_copy(){const t=this.props.copyIconClass;this.props.copyIconClass=this.props.copiedIconClass,y.copy(this._$colorInput.value),setTimeout(()=>{this.props.copyIconClass=t},1e3)}_eyeDropper(){return h(this,void 0,void 0,function*(){var e=yield new EyeDropper().open();e.sRGBHex&&(e=new o.SColor(e.sRGBHex),this._setAlpha(1),this._setHue(e.h),this._setShade(e.s,e.l),this._updateInput("eyedropper"))})}_initHueSelector(){var t=this._$hue.getBoundingClientRect();this._hueCtx.canvas.width=t.width,this._hueCtx.canvas.height=t.height;const e=this._hueCtx.createLinearGradient(0,0,0,t.height);e.addColorStop(0,"rgb(255, 0, 0)"),e.addColorStop(1/6,"rgb(255, 255, 0)"),e.addColorStop(2/6,"rgb(0, 255, 0)"),e.addColorStop(.5,"rgb(0, 255, 255)"),e.addColorStop(4/6,"rgb(0, 0, 255)"),e.addColorStop(5/6,"rgb(255, 0, 255)"),e.addColorStop(1,"rgb(255, 0, 0)"),this._hueCtx.fillStyle=e,this._hueCtx.fillRect(0,0,3*t.width,t.height);let i=!1;this._$hue.addEventListener("pointerdown",s=>{i=!0,this._isHueInInteraction=!0,this.requestUpdate(),this._$hue.setPointerCapture(s.pointerId),this._setHueFromEvent(s,!1),this._updateInput("pointerdown")}),this._$hue.addEventListener("pointermove",s=>{s.preventDefault(),i&&(this._setHueFromEvent(s),this._updateInput("pointermove",!1))}),this._$hue.addEventListener("pointerup",s=>{i=!1,this._isHueInInteraction=!1,this.requestUpdate(),this._$hue.releasePointerCapture(s.pointerId),this._setHueFromEvent(s,!0),this._updateInput("pointerup",!0)})}_updateAlphaSelector(){var t=this._$alpha.getBoundingClientRect();this._alphaCtx.canvas.width=t.width,this._alphaCtx.canvas.height=t.height;const e=this._alphaCtx.createLinearGradient(0,0,0,t.height);e.addColorStop(0,`rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 1)`),e.addColorStop(1,`rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 0)`),this._alphaCtx.fillStyle=e,this._alphaCtx.fillRect(0,0,3*t.width,t.height)}_updateShadeCanvas(){let t=this._shadeCtx.createLinearGradient(0,0,this._shadeCtx.canvas.width,0);const e=this._color.clone(),i=(e.s=100,e.l=50,t.addColorStop(0,"#fff"),t.addColorStop(1,e.toHex()),this._shadeCtx.fillStyle=t,this._shadeCtx.fillRect(0,0,this._shadeCtx.canvas.width,this._shadeCtx.canvas.height),this._shadeCtx.createLinearGradient(0,0,0,this._shadeCtx.canvas.height));i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(1,"#000"),this._shadeCtx.fillStyle=i,this._shadeCtx.fillRect(0,0,this._shadeCtx.canvas.width,this._shadeCtx.canvas.height)}render(){var t;return o.$`
            <div
                class="${this.componentUtils.className("__root")} ${this.componentUtils.className("")}--${this.props.floatSettings.position} ${this._isShadeInInteraction?"is-shade-interacting":""} ${this._isAlphaInInteraction?"is-alpha-interacting":""} ${this._isHueInInteraction?"is-hue-interacting":""}"
            >
                ${this._hasInput||this.props.input?"":o.$`
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
                    ${!this._hasInput&&this.props.input?o.$`
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
                    ${!this._hasButton&&this.props.button?o.$`
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className("__button","s-btn")}"
                              >
                                  ${this.props.buttonIconClass?o.$`
                                            <i
                                                class="${this.props.buttonIconClass}"
                                            ></i>
                                        `:""}
                              </button>
                          `:""}
                </div>
                ${this.props.backdrop?o.$`
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
                                @click=${e=>e.preventDefault()}
                                @pointerup=${e=>{e.preventDefault(),this._setMetasFormat("hex")}}
                            >
                                HEX${this._isAlphaWanted()?"A":""}
                            </button>
                            <button
                                class="${this.componentUtils.className("__btn")} ${this.componentUtils.className("__rgb-btn")} ${this.state.metasFormat==="rgb"?"active":""}"
                                @click=${e=>e.preventDefault()}
                                @pointerup=${e=>{e.preventDefault(),this._setMetasFormat("rgb")}}
                            >
                                RGB${this._isAlphaWanted()?"A":""}
                            </button>
                            <button
                                class="${this.componentUtils.className("__btn")} ${this.componentUtils.className("__hsl-btn")} ${this.state.metasFormat==="hsl"?"active":""}"
                                @click=${e=>e.preventDefault()}
                                @pointerup=${e=>{e.preventDefault(),this._setMetasFormat("hsl")}}
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
                                ${this.props.copyIconClass?o.$`
                                          <i
                                              class="${this.props.copyIconClass}"
                                          ></i>
                                      `:""}
                            </div>
                            ${this.props.eyeDropper&&window.EyeDropper?o.$`
                                      <div
                                          class="${this.componentUtils.className("__eye-dropper")} "
                                          @pointerup=${()=>this._eyeDropper()}
                                      >
                                          ${this.props.eyeDropperIconClass?o.$`
                                                    <i
                                                        class="${this.props.eyeDropperIconClass}"
                                                    ></i>
                                                `:""}
                                      </div>
                                  `:""}
                        </div>
                    </div>
                    ${this.props.actions.length?o.$`
                              <div
                                  class="${this.componentUtils.className("__actions")}"
                              >
                                  ${this.props.actions.includes("clear")?o.$`
                                            <button
                                                class="${this.componentUtils.className("__clear","s-btn s-color--error")}"
                                                @click=${e=>e.preventDefault()}
                                                @pointerup=${e=>{e.preventDefault(),this._clear()}}
                                            >
                                                ${(t=this.props.i18n.clear)!=null?t:"Clear"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("reset")?o.$`
                                            <button
                                                class="${this.componentUtils.className("__reset","s-btn s-color--complementary")}"
                                                @click=${e=>e.preventDefault()}
                                                @pointerup=${e=>{e.preventDefault(),this._reset()}}
                                            >
                                                ${(t=this.props.i18n.reset)!=null?t:"Reset"}
                                            </button>
                                        `:""}
                                  ${this.props.actions.includes("validate")?o.$`
                                            <button
                                                class="${this.componentUtils.className("__validate","s-btn s-color--accent")}"
                                                @click=${e=>e.preventDefault()}
                                                @pointerup=${e=>{e.preventDefault(),this._validate()}}
                                            >
                                                ${(t=this.props.i18n.validate)!=null?t:"Validate"}
                                            </button>
                                        `:""}
                              </div>
                          `:""}
                </div>
            </div>
        `}}u.default=function(r={},t="s-color-picker"){f.define(f,r,t)},Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})});
