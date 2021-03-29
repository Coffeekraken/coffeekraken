import __deepMerge from "@coffeekraken/sugar/js/object/deepMerge";
import __SRequest from "@coffeekraken/sugar/js/http/SRequest";
import __hotkey from "@coffeekraken/sugar/js/keyboard/hotkey";
import __SLitHtmlWebComponent from "@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent";
import __SFiltrableInputWebComponent from "@coffeekraken/s-filtrable-input";
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
//# sourceMappingURL=SSugarUiWebComponent.js.map
