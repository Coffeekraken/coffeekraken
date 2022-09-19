define(["exports","./index.d9d97e89"],function(n,e){"use strict";class a extends e.SInterface{static get _definition(){return{darkModeicon:{description:"Specify if you want to dark mode icon or not",type:"Boolean",default:!1},darkModeIconClass:{description:"Specify the class to apply on the i tag for the dark mode icon",type:"String",default:"s-icon:dark-mode"}}}}class c extends e.SLitComponent{constructor(){super({name:"s-theme-switcher",interface:a}),this._themes=e.STheme.themes}static get properties(){return e.SLitComponent.createProperties({},a)}static get styles(){return e.r`
            ${e.o(`.s-theme-switcher{display:inline-block;position:relative;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item{display:flex;align-items:center;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode{opacity:0;pointer-events:none;display:flex;align-items:center}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode.visible{opacity:1;pointer-events:all}
`)}
        `}_toggleDarkMode(){e.STheme.isDark()?e.STheme.setThemeVariant("light"):e.STheme.setThemeVariant("dark"),this.componentUtils.dispatchEvent("change",{detail:e.STheme}),this.requestUpdate()}_setTheme(t){e.STheme.setTheme(t),this.requestUpdate()}render(){const t=Object.keys(this._themes),r=e.STheme.getThemeMetas(),d=e.STheme.theme;return e.$`
            <div class="${this.componentUtils.className("__root")}">
                ${t.length===1?e.$`
                          <input
                              type="checkbox"
                              @change=${()=>this._toggleDarkMode()}
                              class="${this.componentUtils.className("__switch","s-switch")}"
                              ?checked=${e.STheme.isDark()}
                          />
                          ${this.props.darkModeIcon?e.$`
                                    <i
                                        class="${this.componentUtils.className("__icon")} ${this.props.darkModeIconClass}"
                                    ></i>
                                `:""}
                      `:e.$`
                          <div
                              class="${this.componentUtils.className("__dropdown-container")} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${r.title} (${r.variant})
                              </span>
                              <div
                                  class="${this.componentUtils.className("__dropdown")} s-dropdown"
                              >
                                  ${t.map(s=>{var h=this._themes[s];return e.$`
                                          <div
                                              class="${this.componentUtils.className("__dropdown-item","s-dropdown-item")} ${d===s?"active":""}"
                                              @click=${o=>{o.preventDefault(),this._setTheme(s)}}
                                          >
                                              <div
                                                  class="${this.componentUtils.className("__theme-name")}"
                                              >
                                                  ${h.metas.title}
                                              </div>
                                              <div
                                                  class="${this.componentUtils.className("__dark-mode")} ${d===s?"visible":""}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${o=>{o.stopPropagation(),this._toggleDarkMode()}}
                                                      class="${this.componentUtils.className("__switch","s-switch")}"
                                                      ?checked=${e.STheme.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon?e.$`
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
        `}}n.default=function(i={},t="s-theme-switcher"){c.define(c,i,t)},Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
