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
                // 2$shadowRoot?.appendChild($link.cloneNode());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvcHRTdHlsZUluU2hhZG93Um9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkb3B0U3R5bGVJblNoYWRvd1Jvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNiLFlBQVksR0FBRyxFQUFFLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isc0JBQXNCLENBQ2hELFdBQXdCLEVBQ3hCLFdBQTBDLFFBQVE7O1FBRWxELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV2QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVuRSxJQUFJLE1BQU0sSUFBSSxXQUFXLEVBQUU7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsUUFBUSxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUU5QixrQ0FBa0M7Z0JBQ2xDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUN0QixhQUFhO29CQUNiLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRzt3QkFDN0IsYUFBYTt3QkFDYixHQUFHLFdBQVcsQ0FBQyxrQkFBa0I7d0JBQ2pDLGFBQWE7d0JBQ2IsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVU7cUJBQ2xDLENBQUM7b0JBQ0YsT0FBTztpQkFDVjtnQkFFRCxnREFBZ0Q7Z0JBRWhELGlEQUFpRDtnQkFDakQsYUFBYTtnQkFDYixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBQzlDLGFBQWE7Z0JBQ2IsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEIsb0VBQW9FO2dCQUNwRSxhQUFhO2dCQUNiLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2hDLE9BQU8sRUFBRTt3QkFDTCxNQUFNLEVBQUUsb0JBQW9CO3FCQUMvQjtpQkFDSixDQUFDLENBQUM7Z0JBRUgsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsYUFBYTtnQkFDYixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUc7b0JBQ25CLFVBQVU7aUJBQ2IsQ0FBQztZQUNOLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDTjtRQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sSUFBSSxXQUFXLEVBQUU7WUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsY0FBYyxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUUvQixJQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDNUIsYUFBYTtvQkFDYixXQUFXLENBQUMsa0JBQWtCLEdBQUc7d0JBQzdCLGFBQWE7d0JBQ2IsR0FBRyxXQUFXLENBQUMsa0JBQWtCO3dCQUNqQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVTtxQkFDeEMsQ0FBQztvQkFDRixPQUFPO2lCQUNWO2dCQUVELGlEQUFpRDtnQkFDakQsYUFBYTtnQkFDYixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBQy9DLGFBQWE7Z0JBQ2IsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDdkMsYUFBYTtnQkFDYixVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckMsYUFBYTtnQkFDYixZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUc7b0JBQ3pCLFVBQVU7aUJBQ2IsQ0FBQztnQkFFRix5Q0FBeUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsV0FBVyxDQUFDLGtCQUFrQixHQUFHO29CQUM3QixhQUFhO29CQUNiLEdBQUcsV0FBVyxDQUFDLGtCQUFrQjtvQkFDakMsYUFBYTtvQkFDYixZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVTtpQkFDeEMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUEifQ==