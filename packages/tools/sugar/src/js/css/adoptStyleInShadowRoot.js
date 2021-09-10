var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __uniqid from '../../shared/string/uniqid';
/**
 * @name            adoptStyleInShadowRoot
 * @namespace       js.css
 * @type            Function
 * @platform        js
 * @platform        ts
 * @status          beta
 *
 * This function allows you to make a shadowRoot element adopt his host context styles
 *
 * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
 * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
 * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
 *
 * @todo        tests
 *
 * @example         js
 * import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/css/adoptStyleInShadowRoot';
 * const myShadowRoot = $myElement.shadowRoot;
 * await __adoptStyleInShadowRoot(myShadowRoot);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const _links = {}, _stylesheets = {};
export default function adoptStyleInShadowRoot($shadowRoot, $context = document) {
    return __awaiter(this, void 0, void 0, function* () {
        const _styleNodes = [];
        const $links = $context.querySelectorAll('link[rel="stylesheet"]');
        if ($links && $shadowRoot) {
            Array.from($links).forEach(($link) => __awaiter(this, void 0, void 0, function* () {
                if (!$link.id)
                    $link.id = `link-${__uniqid()}`;
                const stylesheetId = $link.id;
                // prevent to much repetitive work
                if (_links[stylesheetId]) {
                    // @ts-ignore
                    $shadowRoot.adoptedStyleSheets = [
                        // @ts-ignore
                        ...$shadowRoot.adoptedStyleSheets,
                        // @ts-ignore
                        _links[stylesheetId].stylesheet,
                    ];
                    return;
                }
                $shadowRoot === null || $shadowRoot === void 0 ? void 0 : $shadowRoot.appendChild($link.cloneNode());
                // avoid processing multiple time same stylesheet
                // @ts-ignore
                if (_styleNodes.indexOf($link) !== -1)
                    return;
                // @ts-ignore
                _styleNodes.push($link);
                // request stylesheet to store it in a unique CSSStylesheet instance
                // @ts-ignore
                const res = yield fetch($link.href, {
                    headers: {
                        Accept: 'text/css,*/*;q=0.1',
                    },
                });
                let cssStr = yield res.text();
                const stylesheet = new CSSStyleSheet();
                // @ts-ignore
                stylesheet.replace(cssStr);
                // @ts-ignore
                _links[stylesheetId] = {
                    stylesheet,
                };
            }));
        }
        const $styles = $context.querySelectorAll('style');
        if ($styles && $shadowRoot) {
            Array.from($styles).forEach(($style) => {
                if (!$style.id)
                    $style.id = `stylesheet-${__uniqid()}`;
                const stylesheetId = $style.id;
                if (_stylesheets[stylesheetId]) {
                    // @ts-ignore
                    $shadowRoot.adoptedStyleSheets = [
                        // @ts-ignore
                        ...$shadowRoot.adoptedStyleSheets,
                        _stylesheets[stylesheetId].stylesheet,
                    ];
                    return;
                }
                // avoid processing multiple time same stylesheet
                // @ts-ignore
                if (_styleNodes.indexOf($style) !== -1)
                    return;
                // @ts-ignore
                _styleNodes.push($style);
                const stylesheet = new CSSStyleSheet();
                // @ts-ignore
                stylesheet.replace($style.innerHTML);
                // @ts-ignore
                _stylesheets[stylesheetId] = {
                    stylesheet,
                };
                // @TODO            avoid these ts-ignore
                // @ts-ignore
                $shadowRoot.adoptedStyleSheets = [
                    // @ts-ignore
                    ...$shadowRoot.adoptedStyleSheets,
                    // @ts-ignore
                    _stylesheets[stylesheetId].stylesheet,
                ];
            });
        }
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvcHRTdHlsZUluU2hhZG93Um9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkb3B0U3R5bGVJblNoYWRvd1Jvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNiLFlBQVksR0FBRyxFQUFFLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isc0JBQXNCLENBQ2hELFdBQXdCLEVBQ3hCLFdBQTBDLFFBQVE7O1FBRWxELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV2QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVuRSxJQUFJLE1BQU0sSUFBSSxXQUFXLEVBQUU7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsUUFBUSxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUU5QixrQ0FBa0M7Z0JBQ2xDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUN0QixhQUFhO29CQUNiLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRzt3QkFDN0IsYUFBYTt3QkFDYixHQUFHLFdBQVcsQ0FBQyxrQkFBa0I7d0JBQ2pDLGFBQWE7d0JBQ2IsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVU7cUJBQ2xDLENBQUM7b0JBQ0YsT0FBTztpQkFDVjtnQkFFRCxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxT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