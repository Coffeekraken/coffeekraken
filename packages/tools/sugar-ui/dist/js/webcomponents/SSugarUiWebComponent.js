/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
let process = {};import __deepMerge from "/node_modules/@coffeekraken/sugar/js/object/deepMerge.js";
import __SRequest from "/node_modules/@coffeekraken/sugar/js/http/SRequest.js";
import __hotkey from "/node_modules/@coffeekraken/sugar/js/keyboard/hotkey.js";
import __SLitHtmlWebComponent from "/node_modules/@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent.js";
import __SFiltrableInputWebComponent from "/node_modules/@coffeekraken/s-filtrable-input/src/js/index.js";
__SFiltrableInputWebComponent.define({
  name: "SSugarUiInputNavigation"
});
class SSugarUiWebComponent extends __SLitHtmlWebComponent() {
  static componentName = "SSugarUi";
  static props = {
    docMapApiUrl: {
      type: "String",
      description: "Specify the docMap api url to reach in order to get the docMap JSON",
      default: "docMap"
    }
  };
  static template = function(props, settings, lit) {
    return lit.html`
      <div class="${this.selector("main")}">
        <a class="${this.selector("logo")}" href="https://coffeekraken.io" target="_blank">
          <i class="${this.selector("coffeekraken-logo")}"></i>
        </a>
        <div class="${this.selector("nav")}">
          <input type="text" is="s-sugar-ui-input-navigation" class="${this.selector("nav-input")}" placeholder="Search and navigation" id="nav" no-item-text="MOBILE" />
        </div>
        <div class="${this.selector("utils")}">
          <a href="https://github.com/coffeekraken" target="_blank">
            <i class="icon-github"></i>
          </a>
        </div>
      </div>`;
  };
  constructor(settings = {}) {
    super(__deepMerge({}, settings));
    this._navigationStack = [this._main];
    this.on("ready", (e) => {
      this.$nav.setSettings({
        props: {
          closeOnSelect: false,
          closeOnEscape: false
        },
        template: {
          item: function(itemObj, settings2, lit) {
            switch (itemObj.type) {
              case "main":
                return lit.html`
                    <i class="icon-${itemObj.icon}"></i> ${this.highlightFilter(itemObj.title)}
                `;
                break;
              case "api":
                return lit.html`
                  <div class="seach-navigation__item-api">
                    ${itemObj.icon ? lit.html`
                      <i class="icon-${itemObj.icon}"></i> 
                    ` : ""}
                    <p class="${this.selector("list-item-title")}"><span class="${this.selector("list-item-extension")}" extension="${itemObj.extension}">${itemObj.extension}</span> ${this.highlightFilter(itemObj.title)}</p>
                    <p class="${this.selector("list-item-description")}">${this.highlightFilter(itemObj.description)}</p>
                  </div>
                `;
                break;
              default:
                return settings2.template.item;
                break;
            }
          }
        }
      });
      this._main();
      this._initShortcuts();
    });
  }
  _initShortcuts() {
    __hotkey("ctrl+p").on("press", (e) => {
      this.$nav.focus();
    });
    __hotkey("escape").on("press", (e) => {
      if (this._navigationStack.length <= 1) {
        this.$nav.escape();
        return;
      }
      this._navigationStack.pop();
      this._navigationStack[this._navigationStack.length - 1].call(this);
    });
  }
  _main() {
    const items = [
      {
        title: "Get Started",
        icon: "start",
        type: "main"
      },
      {
        title: "Sugar Toolkit",
        icon: "toolkit",
        type: "main",
        onSelect: this._sugarToolkit.bind(this)
      },
      {
        title: "Webcomponents",
        icon: "component",
        type: "main",
        onSelect: this._webcomponents.bind(this)
      },
      {
        title: "API References",
        icon: "api",
        type: "main",
        onSelect: this._apiReferences.bind(this)
      },
      {
        title: "Community",
        icon: "community",
        type: "main",
        onSelect: this._community.bind(this)
      }
    ];
    this.$nav.props.items = items;
  }
  async _sugarToolkit() {
    this._navigationStack.push(this._sugarToolkit);
    const items = [
      {
        title: "What is Sugar?",
        icon: "what",
        type: "main",
        href: "/sugar/what-is-sugar"
      },
      {
        title: "Get Started",
        icon: "start",
        type: "main",
        href: "/sugar/get-started"
      },
      {
        title: "API References",
        icon: "api",
        type: "main",
        href: "/sugar/api-references"
      }
    ];
    this.$nav.props.items = items;
  }
  async _webcomponents() {
    this._navigationStack.push(this._webcomponents);
    const items = [
      {
        title: "What are Webcomponents?",
        icon: "what",
        type: "main",
        href: "/webcomponents/what-are-webcomponents"
      },
      {
        title: "Build your own",
        icon: "build",
        type: "main",
        href: "/webcomponents/build-your-own"
      },
      {
        title: "API References",
        icon: "api",
        type: "main",
        href: "/webcomponents/api-references"
      }
    ];
    this.$nav.props.items = items;
  }
  async _apiReferences() {
    this._navigationStack.push(this._apiReferences);
    if (this._apiReferencesItems) {
      this.$nav.props.items = this._apiReferencesItems;
      return;
    }
    this.$nav.props.loading = true;
    const request = new __SRequest({
      url: this.props.docMapApiUrl,
      method: "GET"
    });
    const json = await request.send();
    let items = Object.keys(json.data).map((key) => {
      const itemObj = json.data[key];
      return {
        title: key,
        description: itemObj.description,
        type: "api",
        extension: itemObj.extension
      };
    });
    this._apiReferencesItems = items;
    this.$nav.props.loading = false;
    this.$nav.props.items = items;
  }
  async _community() {
    this._navigationStack.push(this._community);
    const items = [
      {
        title: "Github",
        type: "main",
        href: "https://github.com/coffeekraken"
      },
      {
        title: "Facebook",
        type: "main",
        href: "https://facebook.com/coffeekraken"
      }
    ];
    this.$nav.props.items = items;
  }
}
export {
  SSugarUiWebComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL3dlYmNvbXBvbmVudHMvU1N1Z2FyVWlXZWJDb21wb25lbnQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBfX2RlZXBNZXJnZSBmcm9tICdAY29mZmVla3Jha2VuL3N1Z2FyL2pzL29iamVjdC9kZWVwTWVyZ2UnO1xuaW1wb3J0IF9fU1JlcXVlc3QgZnJvbSAnQGNvZmZlZWtyYWtlbi9zdWdhci9qcy9odHRwL1NSZXF1ZXN0JztcbmltcG9ydCBfX2hvdGtleSBmcm9tICdAY29mZmVla3Jha2VuL3N1Z2FyL2pzL2tleWJvYXJkL2hvdGtleSc7XG5pbXBvcnQgX19TTGl0SHRtbFdlYkNvbXBvbmVudCBmcm9tICdAY29mZmVla3Jha2VuL3N1Z2FyL2pzL3dlYmNvbXBvbmVudC9TTGl0SHRtbFdlYkNvbXBvbmVudCc7XG5cbmltcG9ydCBfX1NGaWx0cmFibGVJbnB1dFdlYkNvbXBvbmVudCBmcm9tICdAY29mZmVla3Jha2VuL3MtZmlsdHJhYmxlLWlucHV0Jztcbl9fU0ZpbHRyYWJsZUlucHV0V2ViQ29tcG9uZW50LmRlZmluZSh7XG4gIG5hbWU6ICdTU3VnYXJVaUlucHV0TmF2aWdhdGlvbidcbn0pO1xuXG4vKipcbiAqIEBuYW1lICAgICAgICAgICAgICAgIFNTdWdhclVpV2ViQ29tcG9uZW50XG4gKiBAbmFtZXNwYWNlICAgICAgICAgICBzdWdhci11aS5qcy53ZWJjb21wb25lbnRzXG4gKiBAdHlwZSAgICAgICAgICAgICAgICBXZWJjb21wb25lbnRcbiAqXG4gKiBSZXByZXNlbnQgdGhlIHNlYXJjaCBiYXNlZCBuYXZpZ2F0aW9uIGluIHRoZSBzdWdhciB1aVxuICpcbiAqIEBwcm9wICAgICAgICB7U3RyaW5nfSAgICAgICAgICAgIFtkb2NNYXBBcGlVcmw9J2RvY01hcCddICAgICAgICAgICAgIFNwZWNpZnkgdGhlIGRvY01hcCBhcGkgdXJsIHRvIHJlYWNoXG4gKlxuICogQGV4YW1wbGUgICAgICAgICAgICAgaHRtbFxuICogPGlucHV0IGlzPVwicy1zdWdhci11aS1zZWFyY2gtbmF2aWdhdGlvblwiIC8+XG4gKlxuICogQHNpbmNlICAgICAgICAgICAgICAgMi4wLjBcbiAqIEBhdXRob3IgICAgICAgICAgICAgICAgIE9saXZpZXIgQm9zc2VsIDxvbGl2aWVyLmJvc3NlbEBnbWFpbC5jb20+IChodHRwczovL29saXZpZXJib3NzZWwuY29tKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTU3VnYXJVaVdlYkNvbXBvbmVudCBleHRlbmRzIF9fU0xpdEh0bWxXZWJDb21wb25lbnQoKSB7XG4gIHN0YXRpYyBjb21wb25lbnROYW1lID0gJ1NTdWdhclVpJztcblxuICAvKipcbiAgICogQG5hbWUgICAgICAgICAgICBwcm9wc1xuICAgKiBAdHlwZSAgICAgICAgICAgIE9iamVjdFxuICAgKiBAc3RhdGljXG4gICAqXG4gICAqIFN0b3JlIGFsbCB0aGUgcHJvcGVydGllcyBkZWZpbml0aW9uc1xuICAgKlxuICAgKiBAc2luY2UgICAgICAgICAgIDIuMC4wXG4gICAqIEBhdXRob3IgICAgICAgICAgICAgICAgIE9saXZpZXIgQm9zc2VsIDxvbGl2aWVyLmJvc3NlbEBnbWFpbC5jb20+IChodHRwczovL29saXZpZXJib3NzZWwuY29tKVxuICAgKi9cbiAgc3RhdGljIHByb3BzID0ge1xuICAgIGRvY01hcEFwaVVybDoge1xuICAgICAgdHlwZTogJ1N0cmluZycsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ1NwZWNpZnkgdGhlIGRvY01hcCBhcGkgdXJsIHRvIHJlYWNoIGluIG9yZGVyIHRvIGdldCB0aGUgZG9jTWFwIEpTT04nLFxuICAgICAgZGVmYXVsdDogJ2RvY01hcCdcbiAgICB9XG4gIH07XG5cbiAgc3RhdGljIHRlbXBsYXRlID0gZnVuY3Rpb24gKHByb3BzLCBzZXR0aW5ncywgbGl0KSB7XG4gICAgcmV0dXJuIGxpdC5odG1sYFxuICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcignbWFpbicpfVwiPlxuICAgICAgICA8YSBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcihcbiAgICAgICAgICAnbG9nbydcbiAgICAgICAgKX1cIiBocmVmPVwiaHR0cHM6Ly9jb2ZmZWVrcmFrZW4uaW9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcignY29mZmVla3Jha2VuLWxvZ28nKX1cIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcignbmF2Jyl9XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaXM9XCJzLXN1Z2FyLXVpLWlucHV0LW5hdmlnYXRpb25cIiBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcihcbiAgICAgICAgICAgICduYXYtaW5wdXQnXG4gICAgICAgICAgKX1cIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBhbmQgbmF2aWdhdGlvblwiIGlkPVwibmF2XCIgbm8taXRlbS10ZXh0PVwiTU9CSUxFXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3RoaXMuc2VsZWN0b3IoJ3V0aWxzJyl9XCI+XG4gICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9jb2ZmZWVrcmFrZW5cIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiaWNvbi1naXRodWJcIj48L2k+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuYW1lICAgICAgICAgICAgY29uc3RydWN0b3JcbiAgICogQHR5cGUgICAgICAgICAgICBGdW5jdGlvblxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHNpbmNlICAgICAgICAgICAyLjAuMFxuICAgKiBAYXV0aG9yICAgICAgICAgICAgICAgICBPbGl2aWVyIEJvc3NlbCA8b2xpdmllci5ib3NzZWxAZ21haWwuY29tPiAoaHR0cHM6Ly9vbGl2aWVyYm9zc2VsLmNvbSlcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzID0ge30pIHtcbiAgICBzdXBlcihfX2RlZXBNZXJnZSh7fSwgc2V0dGluZ3MpKTtcblxuICAgIHRoaXMuX25hdmlnYXRpb25TdGFjayA9IFt0aGlzLl9tYWluXTtcblxuICAgIHRoaXMub24oJ3JlYWR5JywgKGUpID0+IHtcbiAgICAgIHRoaXMuJG5hdi5zZXRTZXR0aW5ncyh7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXG4gICAgICAgICAgY2xvc2VPbkVzY2FwZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICBpdGVtOiBmdW5jdGlvbiAoaXRlbU9iaiwgc2V0dGluZ3MsIGxpdCkge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtT2JqLnR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnbWFpbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpdC5odG1sYFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24tJHtpdGVtT2JqLmljb259XCI+PC9pPiAke3RoaXMuaGlnaGxpZ2h0RmlsdGVyKFxuICAgICAgICAgICAgICAgICAgaXRlbU9iai50aXRsZVxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnYXBpJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbGl0Lmh0bWxgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhY2gtbmF2aWdhdGlvbl9faXRlbS1hcGlcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtT2JqLmljb25cbiAgICAgICAgICAgICAgICAgICAgICAgID8gbGl0Lmh0bWxgXG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uLSR7aXRlbU9iai5pY29ufVwiPjwvaT4gXG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgICAnbGlzdC1pdGVtLXRpdGxlJ1xuICAgICAgICAgICAgICAgICAgICApfVwiPjxzcGFuIGNsYXNzPVwiJHt0aGlzLnNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgJ2xpc3QtaXRlbS1leHRlbnNpb24nXG4gICAgICAgICAgICAgICAgKX1cIiBleHRlbnNpb249XCIke2l0ZW1PYmouZXh0ZW5zaW9ufVwiPiR7XG4gICAgICAgICAgICAgICAgICBpdGVtT2JqLmV4dGVuc2lvblxuICAgICAgICAgICAgICAgIH08L3NwYW4+ICR7dGhpcy5oaWdobGlnaHRGaWx0ZXIoaXRlbU9iai50aXRsZSl9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIiR7dGhpcy5zZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgICAnbGlzdC1pdGVtLWRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgICApfVwiPiR7dGhpcy5oaWdobGlnaHRGaWx0ZXIoaXRlbU9iai5kZXNjcmlwdGlvbil9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3MudGVtcGxhdGUuaXRlbTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tYWluKCk7XG4gICAgICB0aGlzLl9pbml0U2hvcnRjdXRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBfaW5pdFNob3J0Y3V0cygpIHtcbiAgICBfX2hvdGtleSgnY3RybCtwJykub24oJ3ByZXNzJywgKGUpID0+IHtcbiAgICAgIC8vIHB1dCBmb2N1cyBpbiB0aGUgZmllbGRcbiAgICAgIHRoaXMuJG5hdi5mb2N1cygpO1xuICAgIH0pO1xuICAgIF9faG90a2V5KCdlc2NhcGUnKS5vbigncHJlc3MnLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuX25hdmlnYXRpb25TdGFjay5sZW5ndGggPD0gMSkge1xuICAgICAgICB0aGlzLiRuYXYuZXNjYXBlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIHBvcCBpbiB0aGUgc3RhY2tcbiAgICAgIHRoaXMuX25hdmlnYXRpb25TdGFjay5wb3AoKTtcbiAgICAgIC8vIGxvYWQgdGhlIHJlc3VsdGluZyBuYXZpZ2F0aW9uXG4gICAgICB0aGlzLl9uYXZpZ2F0aW9uU3RhY2tbdGhpcy5fbmF2aWdhdGlvblN0YWNrLmxlbmd0aCAtIDFdLmNhbGwodGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICBfbWFpbigpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdHZXQgU3RhcnRlZCcsXG4gICAgICAgIGljb246ICdzdGFydCcsXG4gICAgICAgIHR5cGU6ICdtYWluJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdTdWdhciBUb29sa2l0JyxcbiAgICAgICAgaWNvbjogJ3Rvb2xraXQnLFxuICAgICAgICB0eXBlOiAnbWFpbicsXG4gICAgICAgIG9uU2VsZWN0OiB0aGlzLl9zdWdhclRvb2xraXQuYmluZCh0aGlzKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdXZWJjb21wb25lbnRzJyxcbiAgICAgICAgaWNvbjogJ2NvbXBvbmVudCcsXG4gICAgICAgIHR5cGU6ICdtYWluJyxcbiAgICAgICAgb25TZWxlY3Q6IHRoaXMuX3dlYmNvbXBvbmVudHMuYmluZCh0aGlzKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBUEkgUmVmZXJlbmNlcycsXG4gICAgICAgIGljb246ICdhcGknLFxuICAgICAgICB0eXBlOiAnbWFpbicsXG4gICAgICAgIG9uU2VsZWN0OiB0aGlzLl9hcGlSZWZlcmVuY2VzLmJpbmQodGhpcylcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQ29tbXVuaXR5JyxcbiAgICAgICAgaWNvbjogJ2NvbW11bml0eScsXG4gICAgICAgIHR5cGU6ICdtYWluJyxcbiAgICAgICAgb25TZWxlY3Q6IHRoaXMuX2NvbW11bml0eS5iaW5kKHRoaXMpXG4gICAgICB9XG4gICAgXTtcbiAgICB0aGlzLiRuYXYucHJvcHMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIGFzeW5jIF9zdWdhclRvb2xraXQoKSB7XG4gICAgdGhpcy5fbmF2aWdhdGlvblN0YWNrLnB1c2godGhpcy5fc3VnYXJUb29sa2l0KTtcbiAgICBjb25zdCBpdGVtcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdXaGF0IGlzIFN1Z2FyPycsXG4gICAgICAgIGljb246ICd3aGF0JyxcbiAgICAgICAgdHlwZTogJ21haW4nLFxuICAgICAgICBocmVmOiAnL3N1Z2FyL3doYXQtaXMtc3VnYXInXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0dldCBTdGFydGVkJyxcbiAgICAgICAgaWNvbjogJ3N0YXJ0JyxcbiAgICAgICAgdHlwZTogJ21haW4nLFxuICAgICAgICBocmVmOiAnL3N1Z2FyL2dldC1zdGFydGVkJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBUEkgUmVmZXJlbmNlcycsXG4gICAgICAgIGljb246ICdhcGknLFxuICAgICAgICB0eXBlOiAnbWFpbicsXG4gICAgICAgIGhyZWY6ICcvc3VnYXIvYXBpLXJlZmVyZW5jZXMnXG4gICAgICB9XG4gICAgXTtcbiAgICB0aGlzLiRuYXYucHJvcHMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIGFzeW5jIF93ZWJjb21wb25lbnRzKCkge1xuICAgIHRoaXMuX25hdmlnYXRpb25TdGFjay5wdXNoKHRoaXMuX3dlYmNvbXBvbmVudHMpO1xuICAgIGNvbnN0IGl0ZW1zID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1doYXQgYXJlIFdlYmNvbXBvbmVudHM/JyxcbiAgICAgICAgaWNvbjogJ3doYXQnLFxuICAgICAgICB0eXBlOiAnbWFpbicsXG4gICAgICAgIGhyZWY6ICcvd2ViY29tcG9uZW50cy93aGF0LWFyZS13ZWJjb21wb25lbnRzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdCdWlsZCB5b3VyIG93bicsXG4gICAgICAgIGljb246ICdidWlsZCcsXG4gICAgICAgIHR5cGU6ICdtYWluJyxcbiAgICAgICAgaHJlZjogJy93ZWJjb21wb25lbnRzL2J1aWxkLXlvdXItb3duJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBUEkgUmVmZXJlbmNlcycsXG4gICAgICAgIGljb246ICdhcGknLFxuICAgICAgICB0eXBlOiAnbWFpbicsXG4gICAgICAgIGhyZWY6ICcvd2ViY29tcG9uZW50cy9hcGktcmVmZXJlbmNlcydcbiAgICAgIH1cbiAgICBdO1xuICAgIHRoaXMuJG5hdi5wcm9wcy5pdGVtcyA9IGl0ZW1zO1xuICB9XG5cbiAgYXN5bmMgX2FwaVJlZmVyZW5jZXMoKSB7XG4gICAgdGhpcy5fbmF2aWdhdGlvblN0YWNrLnB1c2godGhpcy5fYXBpUmVmZXJlbmNlcyk7XG5cbiAgICAvLyBjYWNoZVxuICAgIGlmICh0aGlzLl9hcGlSZWZlcmVuY2VzSXRlbXMpIHtcbiAgICAgIHRoaXMuJG5hdi5wcm9wcy5pdGVtcyA9IHRoaXMuX2FwaVJlZmVyZW5jZXNJdGVtcztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBwdXQgdGhlIGlucHV0IGluIGxvYWRpbmcgbW9kZVxuICAgIHRoaXMuJG5hdi5wcm9wcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IF9fU1JlcXVlc3Qoe1xuICAgICAgdXJsOiB0aGlzLnByb3BzLmRvY01hcEFwaVVybCxcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVxdWVzdC5zZW5kKCk7XG5cbiAgICAvLyBhZGQgdGhlIGl0ZW1zIGluIHRoZSBuYXZpZ2F0aW9uXG4gICAgbGV0IGl0ZW1zID0gT2JqZWN0LmtleXMoanNvbi5kYXRhKS5tYXAoKGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbU9iaiA9IGpzb24uZGF0YVtrZXldO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IGtleSxcbiAgICAgICAgZGVzY3JpcHRpb246IGl0ZW1PYmouZGVzY3JpcHRpb24sXG4gICAgICAgIHR5cGU6ICdhcGknLFxuICAgICAgICBleHRlbnNpb246IGl0ZW1PYmouZXh0ZW5zaW9uXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMuX2FwaVJlZmVyZW5jZXNJdGVtcyA9IGl0ZW1zO1xuXG4gICAgdGhpcy4kbmF2LnByb3BzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLiRuYXYucHJvcHMuaXRlbXMgPSBpdGVtcztcbiAgfVxuXG4gIGFzeW5jIF9jb21tdW5pdHkoKSB7XG4gICAgdGhpcy5fbmF2aWdhdGlvblN0YWNrLnB1c2godGhpcy5fY29tbXVuaXR5KTtcblxuICAgIGNvbnN0IGl0ZW1zID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0dpdGh1YicsXG4gICAgICAgIHR5cGU6ICdtYWluJyxcbiAgICAgICAgaHJlZjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9jb2ZmZWVrcmFrZW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0ZhY2Vib29rJyxcbiAgICAgICAgdHlwZTogJ21haW4nLFxuICAgICAgICBocmVmOiAnaHR0cHM6Ly9mYWNlYm9vay5jb20vY29mZmVla3Jha2VuJ1xuICAgICAgfVxuICAgIF07XG4gICAgdGhpcy4kbmF2LnByb3BzLml0ZW1zID0gaXRlbXM7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSw4QkFBOEIsT0FBTztBQUFBLEVBQ25DLE1BQU07QUFBQTtBQVBSLG1DQXlCa0Q7QUFBQSxTQUN6QyxnQkFBZ0I7QUFBQSxTQVloQixRQUFRO0FBQUEsSUFDYixjQUFjO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixhQUNFO0FBQUEsTUFDRixTQUFTO0FBQUE7QUFBQTtBQUFBLFNBSU4sV0FBVyxTQUFVLE9BQU8sVUFBVTtBQUMzQyxXQUFPLElBQUk7QUFBQSxvQkFDSyxLQUFLLFNBQVM7QUFBQSxvQkFDZCxLQUFLLFNBQ2Y7QUFBQSxzQkFFWSxLQUFLLFNBQVM7QUFBQTtBQUFBLHNCQUVkLEtBQUssU0FBUztBQUFBLHVFQUNtQyxLQUFLLFNBQ2hFO0FBQUE7QUFBQSxzQkFHVSxLQUFLLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWtCbEMsWUFBWSxXQUFXO0FBQ3JCLFVBQU0sWUFBWSxJQUFJO0FBRXRCLFNBQUssbUJBQW1CLENBQUMsS0FBSztBQUU5QixTQUFLLEdBQUcsU0FBUyxDQUFDO0FBQ2hCLFdBQUssS0FBSyxZQUFZO0FBQUEsUUFDcEIsT0FBTztBQUFBLFVBQ0wsZUFBZTtBQUFBLFVBQ2YsZUFBZTtBQUFBO0FBQUEsUUFFakIsVUFBVTtBQUFBLFVBQ1IsTUFBTSxTQUFVLFNBQVMsV0FBVTtBQUNqQyxvQkFBUSxRQUFRO0FBQUEsbUJBQ1Q7QUFDSCx1QkFBTyxJQUFJO0FBQUEscUNBQ1UsUUFBUSxjQUFjLEtBQUssZ0JBQzlDLFFBQVE7QUFBQTtBQUdWO0FBQUEsbUJBQ0c7QUFDSCx1QkFBTyxJQUFJO0FBQUE7QUFBQSxzQkFHTCxRQUFRLE9BQ0os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
