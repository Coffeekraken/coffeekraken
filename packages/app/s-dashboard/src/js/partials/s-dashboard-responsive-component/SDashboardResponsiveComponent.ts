// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import './s-dashboard-responsive-component.css';

export default class SDashboardResponsiveComponent extends __SLitComponent {
    /**
     * @name            document
     * @type            Document
     * @get
     *
     * Access the document that the dashboard is using.
     * If in an iframe, take the parent document, otherwise, the document itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get document(): Document {
        return window.parent?.document ?? document;
    }

    _displayType = 'sugar';
    _mediaConfig;
    _theme;
    _activeQuery;

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });

        this._mediaConfig = this.document.env?.SUGAR?.theme.get('media');
        this._theme = this.document.env?.SUGAR?.theme;

        const queries = Object.keys(this._mediaConfig.queries);
        this._activeQuery = queries[0];
    }

    firstUpdated() {}

    render() {
        return html`
            <div class="s-dashboard-responsive s-width:100">
                <div class="s-flex s-mbe:20">
                    <h2 class="s-typo:h6">Responsive</h2>
                    <span class="s-typo:p s-mis:20"
                        >${this._mediaConfig?.defaultAction.match(/>/)
                            ? 'Mobile first'
                            : 'Desktop first'}</span
                    >
                </div>

                <div class="ck-panel">
                    <div class="__list">
                        ${Object.entries(this._mediaConfig?.queries ?? {}).map(
                            ([name, obj]) => html`
                                <div
                                    class="__list-item s-tooltip-container ${name ===
                                    this._activeQuery
                                        ? 'active'
                                        : ''}"
                                    @click=${() => {
                                        this._activeQuery = name;
                                        this.requestUpdate();
                                    }}
                                >
                                    <i class="s-icon:${name}"></i>
                                    <div class="s-tooltip">
                                        ${name}
                                    </div>
                                </div>
                            `,
                        )}
                    </div>
                    <div class="__details">
                        ${this._displayType !== 'sugar'
                            ? html`
                                  <p class="s-typo:code">
                                      ${this._theme.constructor.buildMediaQuery(
                                          this._activeQuery,
                                      )}
                                      {...}
                                  </p>
                              `
                            : html`
                                  <p class="s-typo:code">
                                      @sugar.media ${this._activeQuery} {...}
                                  </p>
                              `}
                        <button
                            class="__switch"
                            @click=${() => {
                                if (this._displayType === 'sugar') {
                                    this._displayType = '';
                                } else {
                                    this._displayType = 'sugar';
                                }
                                this.requestUpdate();
                            }}
                        >
                            <i class="s-icon:switch"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 's-dashboard-responsive') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardResponsiveComponent);
}
