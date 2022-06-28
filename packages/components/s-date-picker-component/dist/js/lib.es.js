import __SLitComponent from"@coffeekraken/s-lit-component";import __deepMerge from"@coffeekraken/sugar/shared/object/deepMerge";import __Pickr from"@simonwep/pickr";import __baseCss from"@simonwep/pickr/dist/themes/nano.min.css?used";import{css,unsafeCSS,html}from"lit";import __SInterface from"@coffeekraken/s-interface";import __STheme from"@coffeekraken/s-theme";var __css='s-color-picker {\n    display: inline-block;\n    position: relative;\n}\n\n    s-color-picker:not([mounted]) > * {\n        display: none;\n    }\n\n    s-color-picker[disabled] {\n        pointer-events: none;\n    }\n\n    s-color-picker *[disabled] {\n        opacity: 1 !important;\n    }\n\n    s-color-picker .s-color-picker {\n        display: flex;\n        width: 100%;\n    }\n\n    s-color-picker .pcr-app {\n        position: absolute !important;\n        top: 100%;\n        right: 0;\n        left: auto;\n    }\n\n    [dir="rtl"] s-color-picker .pcr-app,\n    s-color-picker[dir="rtl"] .pcr-app {\n        right: auto;\n        left: 0;\n    }\n\n    s-color-picker .pickr {\n        display: none;\n    }\n\n    s-color-picker:not([input]):not([button]) .s-color-picker {\n        position: relative;\n        display: inline-block;\n    }\n\ns-color-picker:not([bare]) .s-color-picker__button {\n        padding-inline: var(--s-theme-ui-colorPicker-paddingInline, 0.75em);\n        padding-block: var(--s-theme-ui-colorPicker-paddingBlock, 0.375em);\n        cursor: pointer;\n    }\n\ns-color-picker:not([bare])[button][input] .s-color-picker__input {\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n        }\n\ns-color-picker:not([bare])[button][input] .s-color-picker__button {\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n        }\n\n[dir="rtl"] s-color-picker:not([bare])[button][input] .s-color-picker__button, s-color-picker:not([bare])[dir="rtl"][button][input] .s-color-picker__button {\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n            border-top-left-radius: var(--s-theme-ui-colorPicker-borderRadius, 5px);\n            border-bottom-left-radius: var(--s-theme-ui-colorPicker-borderRadius, 5px);\n        }\n\n[dir="rtl"] s-color-picker:not([bare])[button][input] .s-color-picker__input, s-color-picker:not([bare])[dir="rtl"][button][input] .s-color-picker__input {\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n            border-top-right-radius: var(--s-theme-ui-colorPicker-borderRadius, 5px);\n            border-bottom-right-radius: var(--s-theme-ui-colorPicker-borderRadius, 5px);\n        }\n\n';class SColorPickerComponentInterface extends __SInterface{static get _definition(){return{name:{description:"Specify the name that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"color"},value:{description:"Specify the initial value for your picker",type:"String"},placeholder:{description:"Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",type:"String",default:"Select a color"},theme:{description:"Specify the theme you want to use for this picker",type:"String",values:["nano","monolith"],default:"nano"},input:{description:"Specify if you dont want an automatically injected text input when you dont provide yours",type:"Boolean",default:!1},button:{description:"Specify if you want to display the button or not",type:"Boolean",default:!1,physical:!0},position:{description:'Specify the position of the picker. Can be "top" or "bottom"',type:"String",values:["top","bottom"],default:"bottom"},swatches:{description:"Specify some colors you want in your swatches",type:"Array<String>",default:[]},disabled:{description:"Specify if the color picker is disabled",type:"Boolean",default:!1}}}}var __awaiter=globalThis&&globalThis.__awaiter||function(t,s,p,a){return new(p=p||Promise)(function(o,e){function i(t){try{r(a.next(t))}catch(t){e(t)}}function n(t){try{r(a.throw(t))}catch(t){e(t)}}function r(t){var e;t.done?o(t.value):((e=t.value)instanceof p?e:new p(function(t){t(e)})).then(i,n)}r((a=a.apply(t,s||[])).next())})};class SColorPicker extends __SLitComponent{constructor(){super(__deepMerge({litComponent:{shadowDom:!1},componentUtils:{interface:SColorPickerComponentInterface}})),this._hasInput=!1,this._hasButton=!1,this._$input=this.querySelector("input"),this._hasInput=null!==this._$input,this._$button=this.querySelector("button"),this._hasButton=null!==this._$button}static get properties(){return __SLitComponent.properties({},SColorPickerComponentInterface)}static get styles(){return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
            `)}
        `}firstUpdated(){var n,r,p,a,c;return __awaiter(this,void 0,void 0,function*(){this._$root=this.querySelector("."+this.componentUtils.className("")),this._$input?this._$root.append(this._$input):this._$input=this.querySelector("input"),null!==(n=this._$input)&&void 0!==n&&n.hasAttribute("name")||null!==(r=this._$input)&&void 0!==r&&r.setAttribute("name",this.props.name),null!==(r=this._$input)&&void 0!==r&&r.hasAttribute("placeholder")||null!==(p=this._$input)&&void 0!==p&&p.setAttribute("placeholder",this.props.placeholder),null!==(p=this._$input)&&void 0!==p&&p.hasAttribute("autocomplete")||null!==(a=this._$input)&&void 0!==a&&a.setAttribute("autocomplete","off"),this._$button?this._$root.append(this._$button):this._$button=this.querySelector("button"),this._$button&&this._$button.classList.add(this.componentUtils.className("__button"));var t=null!==(c=null!==(a=this.props.value)&&void 0!==a?a:null===(c=this._$input)||void 0===c?void 0:c.value)&&void 0!==c?c:"#ff0000";const s=__Pickr.create({el:this.querySelector("."+this.componentUtils.className("__picker")),theme:"nano",container:this._$root,default:t,inline:!0,comparison:!1,swatches:[],components:{preview:!0,opacity:!0,hue:!0,interaction:{hex:!0,rgba:!0,hsla:!0,input:!0,clear:!0}}}),e=this.querySelector(".pcr-button");function o(){const t=s.getColor(),e=t.toHSLA(),o=t.toHSVA(),i=t.toRGBA(),n=t.toHEXA(),r=t.toCMYK();return{isOpened:s.isOpen(),hsla:{h:e[0],s:e[1],l:e[2],a:e[3],string:`hsla(${e[0]},${e[1]},${e[2]},${e[3]})`},hsva:{h:o[0],s:o[1],v:o[2],a:o[3],string:`hsva(${o[0]},${o[1]},${o[2]},${o[3]})`},rgba:{r:i[0],g:i[1],b:i[2],a:i[3],string:`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`},hex:n.toString(),cmyk:{c:r[0],m:r[1],y:r[2],k:r[3],string:`cmyk(${r[0]},${r[1]},${r[2]},${r[3]})`}}}null!==e&&void 0!==e&&(e.innerHTML=`
            ${this.colorIcon?`
                ${this.colorIcon}
            `:`
                <i class="s-icon s-icon--color"></i>
            `}
        `),__STheme.applyCurrentColor(t,this._$root),s.on("change",()=>{s.applyColor();var t=o(),e=new CustomEvent("change",{bubbles:!0,detail:t});__STheme.applyCurrentColor(t.hex,this._$root),this._$input&&(this._$input.value=t.hex),this.dispatchEvent(e)}),s.on("show",()=>{var t=o(),t=new CustomEvent("show",{detail:t});this.dispatchEvent(t)}),s.on("hide",()=>{var t=o(),t=new CustomEvent("hide",{detail:t});this.dispatchEvent(t)}),s.on("cancel",()=>{var t=o(),t=new CustomEvent("cancel",{detail:t});this.dispatchEvent(t)}),this._$input&&(this._$input.addEventListener("focus",()=>{s.show()}),this._$input.addEventListener("change",()=>{s.setColor(this._$input.value)})),this._$button&&this._$button.addEventListener("focus",()=>{s.show()});const i=this.querySelector(".pcr-app");null!==i&&void 0!==i&&i.classList.add(this.componentUtils.className("__picker"))})}render(){return html`
            <div
                class="${this.componentUtils.className("")} ${this.componentUtils.className("")}--${this.props.position}"
            >
                ${!this._hasInput&&this.props.input?html`
                    <input ?disabled=${this.props.disabled} type="text" autocomplete="off" name="${this.props.name}" value="${this.props.value}" placeholder="${this.props.placeholder}" class="${this.componentUtils.className("__input","s-input")}" />
                `:this._hasInput?"":html`
                    <input ?disabled=${this.props.disabled} type="hidden" name="${this.props.name}" value="${this.props.value}" />
                `}
                ${!this._hasButton&&this.props.button?html`
                          <button
                                ?disabled=${this.props.disabled} 
                              onclick="return false"
                              class="${this.componentUtils.className("__button","s-btn")}"
                          >
                              ${this.props.colorIcon?html`
                                ${staticHTML(this.props.colorIcon)}
                              `:html`
                                <i class="s-icon s-icon--calendar"></i>
                              `}
                          </button>
                      `:""}
                <div class="${this.componentUtils.className("__picker")}"></div>
            </div>
        `}}function define(t={},e="s-color-picker"){__SLitComponent.setDefaultProps(e,t),customElements.define(e,SColorPicker)}export{SColorPicker as default,define};