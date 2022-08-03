import __SClass from '@coffeekraken/s-class';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import '../../../../src/css/index.css';
import __SDashboardSettingsInterface from './interface/SDashboardSettingsInterface';
export default class SDashboard extends __SClass {
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
        __SDashboardSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
     * @name            changePage
     * @type            Function
     *
     * Open the dashboard with the pages component selected
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    changePage() {
        var _a;
        // open the dashboard
        this.open();
        // @ts-ignore
        (_a = this._$iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('dashboard.changePage', {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sK0JBQStCLENBQUM7QUFDdkMsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQWdDcEYsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQXNCNUM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FDRCxXQUFXO1FBQ1AsYUFBYTtRQUNiLDZCQUE2QixDQUFDLFFBQVEsRUFBRSxFQUN4QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQThCTjs7Ozs7Ozs7O1dBU0c7UUFDSCx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUF0Q3ZCLDJFQUEyRTtRQUMzRSxhQUFhO1FBQ2IsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMs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