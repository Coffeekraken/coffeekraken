import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

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

export interface ISDashboardSettings {}

export interface ISDashboardCtorSettings {
    dashboard: Partial<ISDashboardSettings>;
}

export default class SDashboard extends __SClass {
    /**
     * Store the iframe of the dashboard
     */
    _$iframe: HTMLIFrameElement;

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
        return (<any>this)._settings.dashboard;
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
                dashboard: __SDashboardSettingsInterface.defaults(),
            }),
        );

        // create the iframe
        this._$iframe = document.createElement('iframe');
        this._$iframe.classList.add(`s-dashboard-iframe`);

        __hotkey('ctrl+s').on('press', () => {
            this.open();
        });
        __hotkey('escape').on('press', () => {
            this.close();
        });
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
            console.log('OPDOPOD');
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
                <script src="${'http://localhost:3000/@fs/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-dashboard/dist/pkg/esm/js/index.js'}" type="module" defer"></script>
                </head>
                <body>
                        <s-dashboard></s-dashboard>
                    </body>
                </html>
            `);
            this._$iframe.contentWindow.document.close();
            console.log('____DEDEDED');
        }

        // handle class
        this._$iframe.classList.add('active');

        // overflow
        this.document.querySelector('html').style.overflow = 'hidden';
    }
}
