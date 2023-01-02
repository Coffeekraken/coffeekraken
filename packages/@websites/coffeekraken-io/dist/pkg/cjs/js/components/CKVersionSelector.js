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
            $dropdownContainer = this.querySelector('.s-dropdown-container');
            $dropdown = $dropdownContainer.querySelector('.s-dropdown');
            if (this.isNewVersion()) {
                $dropdownContainer.focus();
            }
        });
        const color = this._versions[0].includes('alpha')
            ? 'error'
            : 'complementary';
        const h = (0, lit_1.html) `
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
                                      <h3
                                          class="s-typo:h3 s-gradient:text:accent s-mbe:20"
                                      >
                                          Hell Yeaaah!
                                      </h3>
                                      <p class="s-typo--p s-mbe:20">
                                          A new version has been released<br />since
                                          your latest visite on the<br />
                                          <span class="s-tc:accent"
                                              >${this._lastViewedVersion}</span
                                          >
                                          one.
                                      </p>
                                      <blockquote class="__codename s-mbs:30">
                                          <span class="s-tc:accent"
                                              >${this._versions[0]}</span
                                          >
                                          codename
                                          <div
                                              class="s-typo:h5 s-text:uppercase s-mbs:20"
                                          >
                                              ${this._currentVersionObj
                .codename}
                                          </div>
                                      </blockquote>
                                      <button
                                          class="s-btn:block s-color:accent s-mbs:30"
                                          @click=${() => {
                $dropdown.style.display = 'none';
                document.activeElement.blur();
                setTimeout(() => {
                    $dropdown.style.display =
                        'unset';
                });
                this.state.lastViewedVersion =
                    this._currentVersion;
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
                                            ${this.props.versions[version]
                .codename
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
                                                    @click=${() => {
                $dropdown.style.display =
                    'none';
                document.activeElement.blur();
                setTimeout(() => {
                    $dropdown.style.display =
                        'unset';
                });
            }}
                                                >
                                                    <i class="s-icon:write"></i>
                                                </a>
                                                <div
                                                    class="s-tooltip s-color:complementary"
                                                >
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
        return h;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUUzQixNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBcUIsaUJBQWtCLFNBQVEseUJBQWU7SUFpQjFEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXBCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixnQ0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFpQkssWUFBWTs4REFBSSxDQUFDO0tBQUE7SUFFakIsS0FBSzs7O1lBQ1AsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7S0FDdkU7SUFFRCxZQUFZO1FBQ1IsZUFBZTtRQUNmLE9BQU8sQ0FDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLElB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