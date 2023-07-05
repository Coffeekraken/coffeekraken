var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import { __injectStyle } from '@coffeekraken/sugar/dom';
import { __escapeQueue, __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __css from '../../../../src/css/index.css';
import __SDashboardSettingsInterface from './interface/SDashboardSettingsInterface';
export default class SDashboard extends __SClass {
    /**
     * @name            iframe
     * @type            HTMLIframeElement
     * @get
     *
     * Access the dashboard iframe
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get iframe() {
        return (document.querySelector('iframe.s-dashboard-iframe'));
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
    get document() {
        var _a, _b;
        return (_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document;
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
    constructor(settings) {
        super(__deepMerge(
        // @ts-ignore
        __SDashboardSettingsInterface.defaults(), {
            layout: [
                [
                    's-dashboard-browserstack',
                    's-dashboard-web-vitals',
                    's-dashboard-assets',
                    's-dashboard-google',
                ],
                ['s-dashboard-frontend-checker'],
            ],
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._inited = false;
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
        this._webVitalsInjected = false;
        // expose the dashboard on document to be able to access it from the iframe
        // @ts-ignore
        document.dashboard = this;
        // create the iframe
        this._$iframe = document.createElement('iframe');
        this._$iframe.classList.add(`s-dashboard-iframe`);
        document.body.appendChild(this._$iframe);
        // listen for shortcuts
        document.addEventListener('keyup', this._onKeyup.bind(this));
    }
    /**
     * Init the dashboard
     */
    _onKeyup(e) {
        if ((e.key === 's' || e.key === 'x') && e.ctrlKey) {
            if (e.key === 'x') {
                this.settings.env = 'development';
            }
            document.removeEventListener('keyup', this._onKeyup);
            this.open();
        }
    }
    /**
     * Init the dashboard
     */
    _initDashboard() {
        // protect
        if (this._inited) {
            return;
        }
        // inject css
        __injectStyle(__css);
        this._$focusItem = document.createElement('div');
        this._$focusItem.setAttribute('tabindex', '-1');
        this._$focusItem.style.position = 'fixed';
        this._$focusItem.style.top = '0';
        this._$focusItem.style.left = '0';
        document.body.appendChild(this._$focusItem);
        // shortcuts
        __hotkey('ctrl+s').on('press', () => {
            this.open();
        });
        __hotkey('ctrl+x').on('press', () => {
            this.open();
        });
        // injecting web vitals
        this._injectWebVitals();
        // inject iframe content
        this._$iframe.contentWindow.document.open();
        this._$iframe.contentWindow.document.write(`
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
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
                        } else {
                            $dashboardHtml.setAttribute('theme', 'default-light');
                        }
                        $document.addEventListener('s-theme.change', function(e) {
                            $dashboardHtml.setAttribute('theme', 'default-' + e.detail.variant);
                        });
                    </script>
                    ${this.settings.env === 'development'
            ? '<script src="http://0.0.0.0:5173/sugar/dashboard/init.js" type="module" defer></script>'
            : '<script src="https://cdnv2.coffeekraken.io/s-dashboard/init/init.js" type="module" defer></script>'}
                </head>
                <body s-sugar>
                    <s-dashboard></s-dashboard>
                </body>
                </html>
            `);
        this._$iframe.contentWindow.document.close();
        // set as inited
        this._inited = true;
    }
    _injectWebVitals() {
        if (this._webVitalsInjected)
            return;
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
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._inited) {
                this._initDashboard();
            }
            // handle class
            this._$iframe.classList.add('active');
            // overflow
            this.document.querySelector('html').style.overflow = 'hidden';
            // handle escape to close
            __escapeQueue(() => {
                this.close();
            }, {
                rootNode: [document, this.document],
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFPLEtBQUssTUFBTSwrQkFBK0IsQ0FBQztBQUNsRCxPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBaUNwRixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzVDOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBMEIsQ0FDdEIsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUN0RCxDQUFDO0lBQ04sQ0FBQztJQVVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLFFBQVE7O1FBQ1IsT0FBTyxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtQ0FBSSxRQUFRLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYiw2QkFBNkIsQ0FBQyxRQUFRLEVBQUUsRUFDeEM7WUFDSSxNQUFNLEVBQUU7Z0JBQ0o7b0JBQ0ksMEJBQTBCO29CQUMxQix3QkFBd0I7b0JBQ3hCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO2lCQUN2QjtnQkFDRCxDQUFDLDhCQUE4QixDQUFDO2FBQ25DO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWxETixZQUFPLEdBQUcsS0FBSyxDQUFDO1FB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