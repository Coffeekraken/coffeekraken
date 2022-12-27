"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
class SCKVersionSelectorPropsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            versions: {
                type: 'Object',
                required: true,
            },
        };
    }
}
class CKVersionSelector extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCKVersionSelectorPropsInterface);
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    mount() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // set the current version
            this._versions = Object.keys((_a = this.props.versions) !== null && _a !== void 0 ? _a : {});
            this._currentVersion = this._versions[0];
            this._currentVersionObj = this.props.versions[this._currentVersion];
        });
    }
    isNewVersion() {
        // return true;
        return (this.state.lastViewedVersion &&
            this.state.lastViewedVersion !== this._currentVersion);
    }
    render() {
        if (!this._versions) {
            return;
        }
        // check if the last viewed version is not the same as the current one
        if (this.isNewVersion()) {
            this._lastViewedVersion = this.state.lastViewedVersion;
        }
        else {
            this.state.lastViewedVersion = this._currentVersion;
        }
        let $dropdownContainer, $dropdown;
        setTimeout(() => {
            if (this.isNewVersion()) {
                $dropdownContainer = this.querySelector('.s-dropdown-container');
                $dropdownContainer.focus();
                $dropdown = $dropdownContainer.querySelector('.s-dropdown');
            }
        });
        const color = this._versions[0].includes('alpha')
            ? 'error'
            : 'complementary';
        return (0, lit_1.html) `
      <span class="s-dropdown-container" tabindex="0">
        <span class="s-badge s-color--${color}">
          ${this._currentVersionObj.codename
            ? (0, lit_1.html) ` <span class="s-typo:bold s-text:uppercase"
                >${this._currentVersionObj.codename}</span
              >`
            : `${this._versions[0]}`}
        </span>
        <div class="s-dropdown:bottom s-bare">
          <div class="__inner">
            ${this.isNewVersion()
            ? (0, lit_1.html) `
                  <div class="__new s-p:30">
                    <h3 class="s-typo:h3 s-gradient:text:accent s-mbe:20">
                      Hell Yeaaah!
                    </h3>
                    <p class="s-typo--p s-mbe:20">
                      A new version has been released<br />since your latest
                      visite on the<br />
                      <span class="s-tc:accent"
                        >${this._lastViewedVersion}</span
                      >
                      one.
                    </p>
                    <blockquote class="__codename s-mbs:30">
                      <span class="s-tc:accent">${this._versions[0]}</span>
                      codename
                      <div class="s-typo:h5 s-text:uppercase s-mbs:20">
                        ${this._currentVersionObj.codename}
                      </div>
                    </blockquote>
                    <button
                      class="s-btn:block s-color:accent s-mbs:30"
                      @click=${() => {
                $dropdown.style.display = 'none';
                document.activeElement.blur();
                setTimeout(() => {
                    $dropdown.style.display = 'unset';
                });
                this.state.lastViewedVersion = this._currentVersion;
            }}
                    >
                      Ok thanks!
                    </button>
                  </div>
                `
            : ''}

            <div class="__versions">
              ${this._versions.map((version, i) => {
            // if (i === 0) return;
            return (0, lit_1.html) `
                  <div class="__version">
                    <a
                      href="https://${version
                .split('.')
                .join('')}.coffeekraken.io"
                      target="_blank"
                      title="Coffeekraken version ${version}"
                      class="__number"
                    >
                      ${version}
                    </a>
                    <span class="__actions">
                      ${this.props.versions[version].codename
                ? (0, lit_1.html) ` <span
                            class="s-badge s-typo:bold s-text:uppercase s-color--${version.includes('alpha')
                    ? 'error'
                    : 'complementary'} s-mis--20"
                          >
                            ${this.props.versions[version].codename}
                          </span>`
                : ''}
                      <div class="s-tooltip-container">
                        <a
                          href="/changelog/${version}"
                          class="s-badge s-mis:10"
                          title="Coffeekraken ${version} changelog"
                        >
                          <i class="s-icon:write"></i>
                        </a>
                        <div class="s-tooltip s-color:complementary">
                          View the changelog
                        </div>
                      </div>
                    </span>
                  </div>
                `;
        })}
            </div>
          </div>
        </div>
      </span>
    `;
    }
}
exports.default = CKVersionSelector;
CKVersionSelector.state = {
    lastViewedVersion: null,
};
function define(props = {}, tagName = 'ck-version-selector') {
    s_lit_component_1.default.define(tagName, CKVersionSelector, Object.assign(Object.assign({}, props), { id: 'version-selector', saveState: true }));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUUzQixNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ3BCLE9BQU87WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFxQixpQkFBa0IsU0FBUSx5QkFBZTtJQWlCNUQ7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBcEJELE1BQU0sS0FBSyxVQUFVO1FBQ25CLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDNUMsRUFBRSxFQUNGLGdDQUFnQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQWlCSyxZQUFZOzhEQUFJLENBQUM7S0FBQTtJQUVqQixLQUFLOzs7WUFDVCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztLQUNyRTtJQUVELFlBQVk7UUFDVixlQUFlO1FBQ2YsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FDdEQsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsc0VBQXNFO1FBQ3RFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1NBQ3hEO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDckQ7UUFFRCxJQUFJLGtCQUFrQixFQUFFLFNBQVMsQ0FBQztRQUVsQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ3ZCLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDakUsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNCLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUMvQyxDQUFDLENBQUMsT0FBTztZQUNULENBQUMsQ0FBQyxlQUFlLENBQUM7UUFFcEIsT0FBTyxJQUFBLFVBQUksRUFBQTs7d0NBRXlCLEtBQUs7WUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVE7WUFDaEMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO21CQUNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRO2dCQUNuQztZQUNKLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7Y0FJdEIsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7Ozs7OzsyQkFTTyxJQUFJLENBQUMsa0JBQWtCOzs7OztrREFLQSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7OzBCQUd6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUTs7Ozs7K0JBSzNCLEdBQUcsRUFBRTtnQkFDWixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDdEQsQ0FBQzs7Ozs7aUJBS047WUFDSCxDQUFDLENBQUMsRUFBRTs7O2dCQUdGLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLHVCQUF1QjtZQUN2QixPQUFPLElBQUEsVUFBSSxFQUFBOzs7c0NBR1csT0FBTztpQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsRUFBRSxDQUFDOztvREFFbUIsT0FBTzs7O3dCQUduQyxPQUFPOzs7d0JBR1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUTtnQkFDckMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO21GQUNxRCxPQUFPLENBQUMsUUFBUSxDQUNyRSxPQUFPLENBQ1I7b0JBQ0MsQ0FBQyxDQUFDLE9BQU87b0JBQ1QsQ0FBQyxDQUFDLGVBQWU7OzhCQUVqQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRO2tDQUNqQztnQkFDVixDQUFDLENBQUMsRUFBRTs7OzZDQUdpQixPQUFPOztnREFFSixPQUFPOzs7Ozs7Ozs7O2lCQVV0QyxDQUFDO1FBQ0osQ0FBQyxDQUFDOzs7OztLQUtYLENBQUM7SUFDSixDQUFDOztBQW5LSCxvQ0FvS0M7QUE1SlEsdUJBQUssR0FBRztJQUNiLGlCQUFpQixFQUFFLElBQUk7Q0FDeEIsQ0FBQztBQTRKSixTQUFnQixNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLHFCQUFxQjtJQUNyRSx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLGtDQUM1QyxLQUFLLEtBQ1IsRUFBRSxFQUFFLGtCQUFrQixFQUN0QixTQUFTLEVBQUUsSUFBSSxJQUNmLENBQUM7QUFDTCxDQUFDO0FBTkQsd0JBTUMifQ==