// @ts-nocheck

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
  static get properties() {
    return __SLitComponent.propertiesFromInterface(
      {},
      SCKVersionSelectorPropsInterface
    );
  }

  static state = {
    lastViewedVersion: null,
  };

  _versions;
  _currentVersion;
  _currentVersionObj;
  _lastViewedVersion;

  constructor() {
    super({
      shadowDom: false,
    });
  }

  async firstUpdated() {}

  async mount() {
    // set the current version
    this._versions = Object.keys(this.props.versions ?? {});
    this._currentVersion = this._versions[0];
    this._currentVersionObj = this.props.versions[this._currentVersion];
  }

  isNewVersion() {
    // return true;
    return (
      this.state.lastViewedVersion &&
      this.state.lastViewedVersion !== this._currentVersion
    );
  }

  render() {
    if (!this._versions) {
      return;
    }

    // check if the last viewed version is not the same as the current one
    if (this.isNewVersion()) {
      this._lastViewedVersion = this.state.lastViewedVersion;
    } else {
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

    return html`
      <span class="s-dropdown-container" tabindex="0">
        <span class="s-badge s-color--${color}">
          ${this._currentVersionObj.codename
            ? html` <span class="s-typo:bold s-text:uppercase"
                >${this._currentVersionObj.codename}</span
              >`
            : `${this._versions[0]}`}
        </span>
        <div class="s-dropdown:bottom s-bare">
          <div class="__inner">
            ${this.isNewVersion()
              ? html`
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
                return html`
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
                        ? html` <span
                            class="s-badge s-typo:bold s-text:uppercase s-color--${version.includes(
                              'alpha'
                            )
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

export function define(props: any = {}, tagName = 'ck-version-selector') {
  __SLitComponent.define(tagName, CKVersionSelector, {
    ...props,
    id: 'version-selector',
    saveState: true,
  });
}
