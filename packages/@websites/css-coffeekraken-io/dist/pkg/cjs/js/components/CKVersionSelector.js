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
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCKVersionSelectorPropsInterface);
    }
    constructor() {
        super({
            shadowDom: false,
        });
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
            ? 's-color--error'
            : 's-color--complementary';
        return (0, lit_1.html) `
            <span class="s-dropdown-container" tabindex="0">
                <span class="s-badge ${color}">
                    ${this._currentVersionObj.codename
            ? (0, lit_1.html) ` <span class="s-typo:bold s-text:uppercase"
                              >${this._currentVersionObj.codename}</span
                          >`
            : `${this._versions[0]}`}
                </span>
                <div class="s-dropdown:bottom s-bare">
                    <div class="_inner">
                        ${this.isNewVersion()
            ? (0, lit_1.html) `
                  <div class="_new s-p:30">
                    <h3 class="s-typo:h3 s-gradient:text:accent s-mbe:20">
                      Hell Yeaaah!
                    </h3>
                    <code>
                      Hello world
                    </code>
                    </code>
                    <p class="s-typo--p s-mbe:20">
                      A new version has been released<br />since your latest
                      visite on the<br />
                      <span class="s-tc:accent"
                        >${this._lastViewedVersion}</span
                      >
                      one.
                    </p>
                    <blockquote class="_codename s-mbs:30">
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
                        <div class="_header">
                            <h3 class="s-typo:h4 s-mbe:20">
                                Coffeekraken
                                <span class="s-tc:accent">versions</span>
                            </h3>
                            <p class="s-typo:p">
                                Simply access all the past versions of the
                                Coffeekraken ecosystem.
                            </p>
                        </div>
                        <div class="_versions">
                            ${this._versions.map((version, i) => {
            // if (i === 0) return;
            return (0, lit_1.html) `
                                    <div class="_version">
                                        <a
                                            href="https://${this.props.versions[version].codename}.coffeekraken.io"
                                            target="_blank"
                                            title="Coffeekraken version ${version}"
                                            class="_number"
                                        >
                                            ${version}
                                        </a>
                                        <span class="_actions">
                                            ${this.props.versions[version]
                .codename
                ? (0, lit_1.html) ` <span
                                                      class="s-badge s-typo:bold s-text:uppercase ${version.includes('alpha')
                    ? 's-color--error'
                    : 's-color--complementary'} s-mis--20"
                                                  >
                                                      ${this.props.versions[version].codename}
                                                  </span>`
                : ''}
                                            <a
                                                href="/changelog/${version}"
                                                class="s-badge s-color:complementary s-mis:10"
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
                                                Changelog
                                            </a>
                                        </span>
                                    </div>
                                `;
        })}
                        </div>
                        <div class="_footer">
                            <div>
                                Latest version:
                                <span class="s-tc:accent"
                                    >${this._versions[0]}</span
                                >
                            </div>
                            <div>
                                License
                                <a
                                    class="s-tc:accent"
                                    href="https://opensource.org/licenses/MIT"
                                    target="_blank"
                                    >MIT</a
                                >
                            </div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUUzQixNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBcUIsaUJBQWtCLFNBQVEseUJBQWU7SUFDMUQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsZ0NBQWdDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBV0Q7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUssWUFBWTs4REFBSSxDQUFDO0tBQUE7SUFFakIsS0FBSzs7O1lBQ1AsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7S0FDdkU7SUFFRCxZQUFZO1FBQ1IsZUFBZTtRQUNmLE9BQU8sQ0FDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLElBQUks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