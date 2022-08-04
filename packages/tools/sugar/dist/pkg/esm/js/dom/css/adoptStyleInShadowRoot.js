var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name            adoptStyleInShadowRoot
 * @namespace       js.css
 * @type            Function
 * @platform        js
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
 * import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/dom/css/adoptStyleInShadowRoot';
 * const myShadowRoot = $myElement.shadowRoot;
 * await __adoptStyleInShadowRoot(myShadowRoot);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const _links = {}, _stylesheets = {};
export default function adoptStyleInShadowRoot($shadowRoot, $context = document) {
    return __awaiter(this, void 0, void 0, function* () {
        // const _styleNodes = [];
        const $links = $context.querySelectorAll('link[rel="stylesheet"]');
        if ($links && $shadowRoot) {
            Array.from($links).forEach(($link) => __awaiter(this, void 0, void 0, function* () {
                // if (!$link.id) $link.id = `link-${__uniqid()}`;
                // const stylesheetId = $link.id;
                $shadowRoot === null || $shadowRoot === void 0 ? void 0 : $shadowRoot.appendChild($link.cloneNode());
                // // prevent to much repetitive work
                // if (_links[stylesheetId]) {
                //     // @ts-ignore
                //     $shadowRoot.adoptedStyleSheets = [
                //         // @ts-ignore
                //         ...$shadowRoot.adoptedStyleSheets,
                //         // @ts-ignore
                //         _links[stylesheetId].stylesheet,
                //     ];
                //     return;
                // }
                // $shadowRoot?.appendChild($link.cloneNode());
                // // avoid processing multiple time same stylesheet
                // // @ts-ignore
                // if (_styleNodes.indexOf($link) !== -1) return;
                // // @ts-ignore
                // _styleNodes.push($link);
                // // request stylesheet to store it in a unique CSSStylesheet instance
                // // @ts-ignore
                // const res = await fetch(`${$link.href}?direct`, {
                //     headers: {
                //         Accept: 'text/css,*/*;q=0.1',
                //     },
                // });
                // let cssStr = await res.text();
                // console.log(cssStr);
                // const stylesheet = new CSSStyleSheet();
                // // @ts-ignore
                // stylesheet.replace(cssStr);
                // // @ts-ignore
                // _links[stylesheetId] = {
                //     stylesheet,
                // };
            }));
        }
        // const $styles = $context.querySelectorAll('style');
        // if ($styles && $shadowRoot) {
        //     Array.from($styles).forEach(($style) => {
        //         if (!$style.id) $style.id = `stylesheet-${__uniqid()}`;
        //         const stylesheetId = $style.id;
        //         if (_stylesheets[stylesheetId]) {
        //             // @ts-ignore
        //             $shadowRoot.adoptedStyleSheets = [
        //                 // @ts-ignore
        //                 ...$shadowRoot.adoptedStyleSheets,
        //                 _stylesheets[stylesheetId].stylesheet,
        //             ];
        //             return;
        //         }
        //         // avoid processing multiple time same stylesheet
        //         // @ts-ignore
        //         if (_styleNodes.indexOf($style) !== -1) return;
        //         // @ts-ignore
        //         _styleNodes.push($style);
        //         const stylesheet = new CSSStyleSheet();
        //         // @ts-ignore
        //         stylesheet.replace($style.innerHTML);
        //         // @ts-ignore
        //         _stylesheets[stylesheetId] = {
        //             stylesheet,
        //         };
        //         // @TODO            avoid these ts-ignore
        //         // @ts-ignore
        //         $shadowRoot.adoptedStyleSheets = [
        //             // @ts-ignore
        //             ...$shadowRoot.adoptedStyleSheets,
        //             // @ts-ignore
        //             _stylesheets[stylesheetId].stylesheet,
        //         ];
        //     });
        // }
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsRUFBRSxFQUNiLFlBQVksR0FBRyxFQUFFLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isc0JBQXNCLENBQ2hELFdBQXdCLEVBQ3hCLFdBQTBDLFFBQVE7O1FBRWxELDBCQUEwQjtRQUUxQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVuRSxJQUFJLE1BQU0sSUFBSSxXQUFXLEVBQUU7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDdkMsa0RBQWtEO2dCQUNsRCxpQ0FBaUM7Z0JBRWpDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBRTVDLHFDQUFxQztnQkFDckMsOEJBQThCO2dCQUM5QixvQkFBb0I7Z0JBQ3BCLHlDQUF5QztnQkFDekMsd0JBQXdCO2dCQUN4Qiw2Q0FBNkM7Z0JBQzdDLHdCQUF3QjtnQkFDeEIsMkNBQTJDO2dCQUMzQyxTQUFTO2dCQUNULGNBQWM7Z0JBQ2QsSUFBSTtnQkFFSiwrQ0FBK0M7Z0JBRS9DLG9EQUFvRDtnQkFDcEQsZ0JBQWdCO2dCQUNoQixpREFBaUQ7Z0JBQ2pELGdCQUFnQjtnQkFDaEIsMkJBQTJCO2dCQUUzQix1RUFBdUU7Z0JBQ3ZFLGdCQUFnQjtnQkFDaEIsb0RBQW9EO2dCQUNwRCxpQkFBaUI7Z0JBQ2pCLHdDQUF3QztnQkFDeEMsU0FBUztnQkFDVCxNQUFNO2dCQUVOLGlDQUFpQztnQkFDakMsdUJBQXVCO2dCQUN2QiwwQ0FBMEM7Z0JBQzFDLGdCQUFnQjtnQkFDaEIsOEJBQThCO2dCQUM5QixnQkFBZ0I7Z0JBQ2hCLDJCQUEyQjtnQkFDM0Isa0JBQWtCO2dCQUNsQixLQUFLO1lBQ1QsQ0FBQyxDQUFBLENBQUMsQ0FBQztTQUNOO1FBRUQsc0RBQXNEO1FBQ3RELGdDQUFnQztRQUNoQyxnREFBZ0Q7UUFDaEQsa0VBQWtFO1FBQ2xFLDBDQUEwQztRQUUxQyw0Q0FBNEM7UUFDNUMsNEJBQTRCO1FBQzVCLGlEQUFpRDtRQUNqRCxnQ0FBZ0M7UUFDaEMscURBQXFEO1FBQ3JELHlEQUF5RDtRQUN6RCxpQkFBaUI7UUFDakIsc0JBQXNCO1FBQ3RCLFlBQVk7UUFFWiw0REFBNEQ7UUFDNUQsd0JBQXdCO1FBQ3hCLDBEQUEwRDtRQUMxRCx3QkFBd0I7UUFDeEIsb0NBQW9DO1FBRXBDLGtEQUFrRDtRQUNsRCx3QkFBd0I7UUFDeEIsZ0RBQWdEO1FBQ2hELHdCQUF3QjtRQUN4Qix5Q0FBeUM7UUFDekMsMEJBQTBCO1FBQzFCLGFBQWE7UUFFYixvREFBb0Q7UUFDcEQsd0JBQXdCO1FBQ3hCLDZDQUE2QztRQUM3Qyw0QkFBNEI7UUFDNUIsaURBQWlEO1FBQ2pELDRCQUE0QjtRQUM1QixxREFBcUQ7UUFDckQsYUFBYTtRQUNiLFVBQVU7UUFDVixJQUFJO1FBRUosT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBIn0=