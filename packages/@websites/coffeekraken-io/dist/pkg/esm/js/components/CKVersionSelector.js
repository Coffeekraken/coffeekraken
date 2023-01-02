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
import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
class SCKVersionSelectorPropsInterface extends __SInterface {
    static get _definition() {
        return {
            versions: {
                type: 'Object',
                required: true,
            },
        };
    }
}
export default class CKVersionSelector extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKVersionSelectorPropsInterface);
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
        const h = html `
            <span class="s-dropdown-container" tabindex="0">
                <span class="s-badge s-color--${color}">
                    ${this._currentVersionObj.codename
            ? html ` <span class="s-typo:bold s-text:uppercase"
                              >${this._currentVersionObj.codename}</span
                          >`
            : `${this._versions[0]}`}
                </span>
                <div class="s-dropdown:bottom s-bare">
                    <div class="__inner">
                        ${this.isNewVersion()
            ? html `
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
            return html `
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
                ? html ` <span
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
CKVersionSelector.state = {
    lastViewedVersion: null,
};
export function define(props = {}, tagName = 'ck-version-selector') {
    __SLitComponent.define(tagName, CKVersionSelector, Object.assign(Object.assign({}, props), { id: 'version-selector', saveState: true }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsZUFBZTtJQWlCMUQ7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBcEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsZ0NBQWdDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBaUJLLFlBQVk7OERBQUksQ0FBQztLQUFBO0lBRWpCLEtBQUs7OztZQUNQLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O0tBQ3ZFO0lBRUQsWUFBWTtRQUNSLGVBQWU7UUFDZixPQUFP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