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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvcHRTdHlsZUluU2hhZG93Um9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkb3B0U3R5bGVJblNoYWRvd1Jvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQ2IsWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUV0QixNQUFNLENBQUMsT0FBTyxVQUFnQixzQkFBc0IsQ0FDaEQsV0FBd0IsRUFDeEIsV0FBMEMsUUFBUTs7UUFFbEQsMEJBQTBCO1FBRTFCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRW5FLElBQUksTUFBTSxJQUFJLFdBQVcsRUFBRTtZQUN2QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFO2dCQUN2QyxrREFBa0Q7Z0JBQ2xELGlDQUFpQztnQkFFakMsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFFNUMscUNBQXFDO2dCQUNyQyw4QkFBOEI7Z0JBQzlCLG9CQUFvQjtnQkFDcEIseUNBQXlDO2dCQUN6Qyx3QkFBd0I7Z0JBQ3hCLDZDQUE2QztnQkFDN0Msd0JBQXdCO2dCQUN4QiwyQ0FBMkM7Z0JBQzNDLFNBQVM7Z0JBQ1QsY0FBYztnQkFDZCxJQUFJO2dCQUVKLCtDQUErQztnQkFFL0Msb0RBQW9EO2dCQUNwRCxnQkFBZ0I7Z0JBQ2hCLGlEQUFpRDtnQkFDakQsZ0JBQWdCO2dCQUNoQiwyQkFBMkI7Z0JBRTNCLHVFQUF1RTtnQkFDdkUsZ0JBQWdCO2dCQUNoQixvREFBb0Q7Z0JBQ3BELGlCQUFpQjtnQkFDakIsd0NBQXdDO2dCQUN4QyxTQUFTO2dCQUNULE1BQU07Z0JBRU4saUNBQWlDO2dCQUNqQyx1QkFBdUI7Z0JBQ3ZCLDBDQUEwQztnQkFDMUMsZ0JBQWdCO2dCQUNoQiw4QkFBOEI7Z0JBQzlCLGdCQUFnQjtnQkFDaEIsMkJBQTJCO2dCQUMzQixrQkFBa0I7Z0JBQ2xCLEtBQUs7WUFDVCxDQUFDLENBQUEsQ0FBQyxDQUFDO1NBQ047UUFFRCxzREFBc0Q7UUFDdEQsZ0NBQWdDO1FBQ2hDLGdEQUFnRDtRQUNoRCxrRUFBa0U7UUFDbEUsMENBQTBDO1FBRTFDLDRDQUE0QztRQUM1Qyw0QkFBNEI7UUFDNUIsaURBQWlEO1FBQ2pELGdDQUFnQztRQUNoQyxxREFBcUQ7UUFDckQseURBQXlEO1FBQ3pELGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsWUFBWTtRQUVaLDREQUE0RDtRQUM1RCx3QkFBd0I7UUFDeEIsMERBQTBEO1FBQzFELHdCQUF3QjtRQUN4QixvQ0FBb0M7UUFFcEMsa0RBQWtEO1FBQ2xELHdCQUF3QjtRQUN4QixnREFBZ0Q7UUFDaEQsd0JBQXdCO1FBQ3hCLHlDQUF5QztRQUN6QywwQkFBMEI7UUFDMUIsYUFBYTtRQUViLG9EQUFvRDtRQUNwRCx3QkFBd0I7UUFDeEIsNkNBQTZDO1FBQzdDLDRCQUE0QjtRQUM1QixpREFBaUQ7UUFDakQsNEJBQTRCO1FBQzVCLHFEQUFxRDtRQUNyRCxhQUFhO1FBQ2IsVUFBVTtRQUNWLElBQUk7UUFFSixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUEifQ==