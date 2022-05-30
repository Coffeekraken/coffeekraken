import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __SDashboardSettingsInterface from './interface/SDashboardSettingsInterface';
import '../../../../src/css/index.css';

/**
 * @name                SDashboard
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a monorepo with some features like executing a command on all packages, list all the packages, upgrade each package's package.json, etc...
 *
 * @param           {ISDashboardCtorSettings}          [settings={}]           Some settings to configure your monorepo instance
 *
 * @example         js
 * import SDashboard from '@coffeekraken/s-monorepo';
 * const dashboard = new SDashboard({
 *      dashboard: {
 *          // settings here...
 *      }
 * });
 * dashboard.open();
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDashboardSettings {
    layout: any[];
    components: Record<string, any>;
}

export interface ISDashboardCtorSettings {
    dashboard: Partial<ISDashboardSettings>;
}

export default class SDashboard extends __SClass {
    /**
     * Store the iframe of the dashboard
     */
    _$iframe: HTMLIFrameElement;
    _$focusItem: HTMLDivElement;

    /**
     * @name        dashboardSettings
     * @type        ISDashboardSettings
     * @get
     *
     * Access the dashboard settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get dashboardSettings(): ISDashboardSettings {
        return (<any>this).settings.dashboard;
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

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISDashboardCtorSettings>) {
        super(
            __deepMerge({
                // @ts-ignore
                dashboard: {
                    ...__SDashboardSettingsInterface.defaults(),
                },
                ...(settings ?? {}),
            }),
        );

        // expose the dashboard on document to be able to access it from the iframe
        // @ts-ignore
        document.dashboard = this;

        // create the iframe
        this._$iframe = document.createElement('iframe');
        this._$iframe.classList.add(`s-dashboard-iframe`);

        this._$focusItem = document.createElement('div');
        this._$focusItem.setAttribute('tabindex', '-1');
        this._$focusItem.style.position = 'fixed';
        this._$focusItem.style.top = '0';
        this._$focusItem.style.left = '0';
        document.body.appendChild(this._$focusItem);

        __hotkey('ctrl+s').on('press', () => {
            this.open();
        });
        __hotkey('escape').on('press', () => {
            this.close();
        });
        __hotkey('ctrl+p').on('press', () => {
            this.changePage();
        });

        this._injectWebVitals();
    }

    /**
     * @name           _injectWebVitals
     * @type            Function
     * @private
     *
     * Inject the webvitals in the document
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _webVitalsInjected = false;
    _injectWebVitals() {
        if (this._webVitalsInjected) return;
        this._webVitalsInjected = true;
        const $script = document.createElement('script');
        $script.setAttribute('type', 'module');
        $script.text = `
            import {getCLS, getFID, getLCP, getFCP, getTTFB} from 'https://unpkg.com/web-vitals?module';
            getCLS(function(res) {
                document.webVitals.cls = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getFID(function(res) {
                document.webVitals.fid = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getLCP(function(res) {
                document.webVitals.lcp = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getFCP(function(res) {
                document.webVitals.fcp = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getTTFB(function(res) {
                document.webVitals.ttfb = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
        `;
        // create a "webVitals" property on document to store results
        // @ts-ignore
        document.webVitals = {};
        this.document.body.appendChild($script);
    }

    /**
     * @name            changePage
     * @type            Function
     *
     * Open the dashboard with the pages component selected
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    changePage() {
        // open the dashboard
        this.open();
        // @ts-ignore
        this._$iframe.contentDocument?.dispatchEvent(
            new CustomEvent('dashboard.changePage', {}),
        );
        // @ts-ignore
        this._$iframe.contentDocument.isChangePageWanted = true;
    }

    /**
     * @name            open
     * @type            Function
     *
     * Open the dashboard
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    close() {
        // handle class
        this._$iframe.classList.remove('active');
        // overflow
        this.document.querySelector('html').style.removeProperty('overflow');
        // get focus back
        setTimeout(() => {
            this._$focusItem.focus();
        }, 100);
    }

    /**
     * @name            open
     * @type            Function
     *
     * Open the dashboard
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    open() {
        if (!this._$iframe.parentElement) {
            document.body.appendChild(this._$iframe);
            this._$iframe.contentWindow.document.open();
            this._$iframe.contentWindow.document.write(`
                <html>
                <head>
                <script>
                var $document = document;
                if (window.parent) {
                    $document = window.parent.document;
                }
                var $html = $document.querySelector('html');
                var $dashboardHtml = document.querySelector('html');
                var theme = $html.getAttribute('theme');
                var isDark = theme.match(/dark$/);
                if (isDark && window.parent) {
                    $dashboardHtml.setAttribute('theme', 'default-dark');
                }
                </script>
                <script src="${'http://localhost:3000/@fs/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-dashboard/src/js/index.ts'}" type="module" defer"></script>
                </head>
                <body>
                        <s-dashboard></s-dashboard>
                    </body>
                </html>
            `);
            this._$iframe.contentWindow.document.close();
        }

        // handle class
        this._$iframe.classList.add('active');

        // overflow
        this.document.querySelector('html').style.overflow = 'hidden';
    }
}
