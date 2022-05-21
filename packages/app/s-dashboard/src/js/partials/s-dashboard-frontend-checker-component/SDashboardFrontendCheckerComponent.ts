// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import '../../../../../../src/js/partials/s-dashboard-frontend-checker-component/s-dashboard-frontend-checker-component.css';

import __SFrontendChecker, {
    ISFrontendCheckerCheckResult,
} from '@coffeekraken/s-frontend-checker';

export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }

    _checkResults: ISFrontendCheckerCheckResult[] = [];

    firstUpdated() {
        const checker = new __SFrontendChecker();
        const pro = checker.check(window.parent?.document ?? document);
        pro.on('check', (checkResult: ISFrontendCheckerCheckResult) => {
            console.log('_C', checkResult);
            this._checkResults.push(checkResult);
            this.requestUpdate();
        });
    }
    render() {
        return html`
            <div class="s-dashboard-frontend-checker s-width:100">
                <h2 class="s-typo:h6 s-mbe:30">Frontend checker</h2>

                <ul class="__list">
                    ${this._checkResults.map(
                        (checkResult) => html`
                            <li
                                class="__list-item s-color:${checkResult.status}"
                                tabindex="-1"
                            >
                                <h2 class="s-typo:p:bold">
                                    <i
                                        class="s-icon:${checkResult.status} s-mie:10 s-tc:${checkResult.status}"
                                    ></i>
                                    ${checkResult.name}
                                </h2>
                                <div class="__details">
                                    <p class="__description s-typo:p s-mbs:10">
                                        ${checkResult.description}
                                    </p>
                                    ${checkResult.example
                                        ? html`
                                              <p class="s-typo:code s-mbs:10">
                                                  ${checkResult.example}
                                              </p>
                                          `
                                        : ''}
                                </div>
                            </li>
                        `,
                    )}
                </ul>
            </div>
        `;
    }
}

export function define(
    props: any = {},
    tagName = 's-dashboard-frontend-checker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardFrontendCheckerComponent);
}
