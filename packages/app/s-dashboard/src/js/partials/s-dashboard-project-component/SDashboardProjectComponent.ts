// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';

import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';

import '../../../../../../src/js/partials/s-dashboard-project-component/s-dashboard-project-component.css';

export default class SDashboardProjectComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            _SDashboardComponentWidgetInterface,
        );
    }

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

    _project;
    _activeEnvironmentId;
    _activeEnvironment;

    constructor() {
        super({
            shadowDom: false,
        });

        this._project = this.document.env.SUGAR.config.project;

        for (let [env, envObj] of Object.entries(this._project.environments)) {
            for (let [urlName, urlObj] of Object.entries(envObj.urls ?? {})) {
                if (document.location.href.includes(urlObj.url)) {
                    this._activeEnvironmentId = env;
                    this._activeEnvironment = this._project.environments[env];
                    break;
                }
            }
        }
    }

    firstUpdated() {}

    render() {
        if (!this._project) return;
        return html`
            <div class="s-dashboard-project s-width:100">
                <div class="s-flex s-mbe:20">
                    <h2 class="s-typo:h6">Project</h2>
                </div>

                <div class="ck-panel">
                    <div class="ck-tabs">
                        ${Object.entries(this._project.environments ?? {}).map(
                            ([name, obj]) => html`
                                <div
                                    class="ck-tabs_item s-tooltip-container ${name ===
                                    this._activeEnvironmentId
                                        ? 'active'
                                        : ''}"
                                    @click=${() => {
                                        this._activeEnvironmentId = name;
                                        this._activeEnvironment =
                                            this._project.environments[name];
                                        this.requestUpdate();
                                    }}
                                >
                                    <i class="s-icon:${name}"></i>
                                    <div class="s-tooltip">${name}</div>
                                </div>
                            `,
                        )}
                    </div>
                    <div class="_details">
                        <span class="ck-branch"
                            >${this._activeEnvironment.branch}</span
                        >
                        <span class="_commit-time">
                            ${this._activeEnvironment.commit?.time
                                ? html`
                                      <span class="_commit-time-time"
                                          >${new Date(
                                              this._activeEnvironment.commit.time,
                                          ).toLocaleTimeString()}</span
                                      >
                                      <span class="_commit-time-date"
                                          >${new Date(
                                              this._activeEnvironment.commit.time,
                                          ).toLocaleDateString()}</span
                                      >
                                  `
                                : ''}
                        </span>
                        <div class="s-flex s-gap:10">
                            ${Object.entries(
                                this._project.environments[
                                    this._activeEnvironmentId
                                ].urls ?? {},
                            ).map(
                                ([name, urlObj]) => html`
                                    <a
                                        href="${urlObj.url}"
                                        target="_blank"
                                        rel="noopener"
                                        class="ck-action s-tooltip-container"
                                    >
                                        <i class="s-icon:${name}"></i>
                                        <div class="s-tooltip">
                                            ${urlObj.label}
                                        </div>
                                    </a>
                                `,
                            )}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export function __define(props: any = {}, tagName = 's-dashboard-project') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardProjectComponent);
}
