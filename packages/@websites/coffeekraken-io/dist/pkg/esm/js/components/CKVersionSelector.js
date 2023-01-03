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
        return html `
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
                      ${this.props.versions[version].codename
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
CKVersionSelector.state = {
    lastViewedVersion: null,
};
export function define(props = {}, tagName = 'ck-version-selector') {
    __SLitComponent.define(tagName, CKVersionSelector, Object.assign(Object.assign({}, props), { id: 'version-selector', saveState: true }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQkFBa0IsU0FBUSxlQUFlO0lBaUI1RDtRQUNFLEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwQkQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzVDLEVBQUUsRUFDRixnQ0FBZ0MsQ0FDakMsQ0FBQztJQUNKLENBQUM7SUFpQkssWUFBWTs4REFBSSxDQUFDO0tBQUE7SUFFakIsS0FBSzs7O1lBQ1QsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7S0FDckU7SUFFRCxZQUFZO1FBQ1YsZUFBZTtRQUNmLE9BQU8s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