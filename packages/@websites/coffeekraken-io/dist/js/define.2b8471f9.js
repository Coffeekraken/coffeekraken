import{c as m,e as r,t as e,r as l,o as _,$ as s}from"./index.esm.js";class d extends m{static get _definition(){return{darkModeicon:{description:"Specify if you want to dark mode icon or not",type:"Boolean",default:!1},darkModeIconClass:{description:"Specify the class to apply on the i tag for the dark mode icon",type:"String",default:"s-icon:dark-mode"}}}}var $=`.s-theme-switcher{display:inline-block;position:relative;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item{display:flex;align-items:center;cursor:pointer}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode{opacity:0;pointer-events:none;display:flex;align-items:center}.s-theme-switcher .s-theme-switcher__dropdown-item .s-theme-switcher__dark-mode.visible{opacity:1;pointer-events:all}
`;class h extends r{constructor(){super({name:"s-theme-switcher",interface:d}),this._themes=e.themes}static get properties(){return r.createProperties({},d)}static get styles(){return l`
            ${_($)}
        `}_toggleDarkMode(){e.isDark()?e.setThemeVariant("light"):e.setThemeVariant("dark"),this.componentUtils.dispatchEvent("change",{detail:e}),this.requestUpdate()}_setTheme(t){e.setTheme(t),this.requestUpdate()}render(){const t=Object.keys(this._themes),n=e.getThemeMetas(),c=e.theme;return s`
            <div class="${this.componentUtils.className("__root")}">
                ${t.length===1?s`
                          <input
                              type="checkbox"
                              @change=${()=>this._toggleDarkMode()}
                              class="${this.componentUtils.className("__switch","s-switch")}"
                              ?checked=${e.isDark()}
                          />
                          ${this.props.darkModeIcon?s`
                                    <i
                                        class="${this.componentUtils.className("__icon")} ${this.props.darkModeIconClass}"
                                    ></i>
                                `:""}
                      `:s`
                          <div
                              class="${this.componentUtils.className("__dropdown-container")} s-dropdown-container"
                              tabindex="0"
                          >
                              <span class="s-typo:p">
                                  ${n.title} (${n.variant})
                              </span>
                              <div
                                  class="${this.componentUtils.className("__dropdown")} s-dropdown"
                              >
                                  ${t.map(i=>{var p=this._themes[i];return s`
                                          <div
                                              class="${this.componentUtils.className("__dropdown-item","s-dropdown-item")} ${c===i?"active":""}"
                                              @click=${a=>{a.preventDefault(),this._setTheme(i)}}
                                          >
                                              <div
                                                  class="${this.componentUtils.className("__theme-name")}"
                                              >
                                                  ${p.metas.title}
                                              </div>
                                              <div
                                                  class="${this.componentUtils.className("__dark-mode")} ${c===i?"visible":""}"
                                              >
                                                  <input
                                                      type="checkbox"
                                                      @change=${a=>{a.stopPropagation(),this._toggleDarkMode()}}
                                                      class="${this.componentUtils.className("__switch","s-switch")}"
                                                      ?checked=${e.isDark()}
                                                  />
                                                  ${this.props.darkModeIcon?s`
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
        `}}function k(o={},t="s-theme-switcher"){h.define(h,o,t)}export{k as default};
