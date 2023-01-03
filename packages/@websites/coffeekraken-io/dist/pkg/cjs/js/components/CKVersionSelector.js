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
                          @click=${() => {
                $dropdown.style.display = 'none';
                document.activeElement.blur();
                setTimeout(() => {
                    $dropdown.style.display = 'unset';
                });
            }}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUUzQixNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ3BCLE9BQU87WUFDTCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFxQixpQkFBa0IsU0FBUSx5QkFBZTtJQWlCNUQ7UUFDRSxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBcEJELE1BQU0sS0FBSyxVQUFVO1FBQ25CLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDNUMsRUFBRSxFQUNGLGdDQUFnQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQWlCSyxZQUFZOzhEQUFJLENBQUM7S0FBQTtJQUVqQixLQUFLOzs7WUFDVCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztLQUNyRTtJQUVELFlBQVk7UUFDVixlQUFlO1FBQ2YsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssSUFB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