"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            HtmlTagToHtmlClassMap
 * @namespace            js.dom.utils
 * @type            Object
 * @platform          js
 * @status        beta
 *
 * This export an object mapping the HTML tag name to his corresponding HTML class (object not css class)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __htmlTagToHtmlClassMap } from '@coffeekraken/sugar/dom';
 * console.log(__htmlTagToHtmlClassMap);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let map = {};
try {
    map = {
        a: window.HTMLAnchorElement,
        audio: window.HTMLAudioElement,
        body: window.HTMLBodyElement,
        button: window.HTMLButtonElement,
        canvas: window.HTMLCanvasElement,
        dl: window.HTMLDListElement,
        data: window.HTMLDataElement,
        datalist: window.HTMLDataListElement,
        details: window.HTMLDetailsElement,
        // dialog: window.HTMLDialogElement,
        dir: window.HTMLDirectoryElement,
        div: window.HTMLDivElement,
        html: window.HTMLDocument,
        embed: window.HTMLEmbedElement,
        fieldset: window.HTMLFieldSetElement,
        font: window.HTMLFontElement,
        form: window.HTMLFormElement,
        frame: window.HTMLFrameElement,
        head: window.HTMLHeadElement,
        html: window.HTMLHtmlElement,
        iframe: window.HTMLIFrameElement,
        img: window.HTMLImageElement,
        input: window.HTMLInputElement,
        label: window.HTMLLabelElement,
        legend: window.HTMLLegendElement,
        link: window.HTMLLinkElement,
        map: window.HTMLMapElement,
        marquee: window.HTMLMarqueeElement,
        media: window.HTMLMediaElement,
        menu: window.HTMLMenuElement,
        meta: window.HTMLMetaElement,
        meter: window.HTMLMeterElement,
        del: window.HTMLModElement,
        ins: window.HTMLModElement,
        dol: window.HTMLOListElement,
        object: window.HTMLObjectElement,
        optgroup: window.HTMLOptGroupElement,
        option: window.HTMLOptionElement,
        output: window.HTMLOutputElement,
        p: window.HTMLParagraphElement,
        param: window.HTMLParamElement,
        picture: window.HTMLPictureElement,
        pre: window.HTMLPreElement,
        progress: window.HTMLProgressElement,
        quote: window.HTMLQuoteElement,
        script: window.HTMLScriptElement,
        select: window.HTMLSelectElement,
        slot: window.HTMLSlotElement,
        source: window.HTMLSourceElement,
        span: window.HTMLSpanElement,
        style: window.HTMLStyleElement,
        td: window.HTMLTableCellElement,
        th: window.HTMLTableCellElement,
        col: window.HTMLTableColElement,
        colgroup: window.HTMLTableColElement,
        table: window.HTMLTableElement,
        tr: window.HTMLTableRowElement,
        tfoot: window.HTMLTableSectionElement,
        thead: window.HTMLTableSectionElement,
        tbody: window.HTMLTableSectionElement,
        template: window.HTMLTemplateElement,
        textarea: window.HTMLTextAreaElement,
        time: window.HTMLTimeElement,
        title: window.HTMLTitleElement,
        track: window.HTMLTrackElement,
        ul: window.HTMLUListElement,
        video: window.HTMLVideoElement,
        area: window.HTMLAreaElement,
    };
}
catch (e) { }
exports.default = map;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsSUFBSTtJQUNBLEdBQUcsR0FBRztRQUNGLENBQUMsRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQzNCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtRQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtRQUNoQyxFQUFFLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUMzQixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUI7UUFDcEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7UUFDbEMsb0NBQW9DO1FBQ3BDLEdBQUcsRUFBRSxNQUFNLENBQUMsb0JBQW9CO1FBQ2hDLEdBQUcsRUFBRSxNQUFNLENBQUMsY0FBYztRQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7UUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDOUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUI7UUFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLEdBQUcsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzVCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWM7UUFDMUIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7UUFDbEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWM7UUFDMUIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1FBQzFCLEdBQUcsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQ3BDLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLENBQUMsRUFBRSxNQUFNLENBQUMsb0JBQW9CO1FBQzlCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLE9BQU8sRUFBRSxNQUFNLENBQUMsa0JBQWtCO1FBQ2xDLEdBQUcsRUFBRSxNQUFNLENBQUMsY0FBYztRQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtRQUNwQyxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtRQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtRQUNoQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7UUFDaEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLEVBQUUsRUFBRSxNQUFNLENBQUMsb0JBQW9CO1FBQy9CLEVBQUUsRUFBRSxNQUFNLENBQUMsb0JBQW9CO1FBQy9CLEdBQUcsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQy9CLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQ3BDLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLEVBQUUsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQzlCLEtBQUssRUFBRSxNQUFNLENBQUMsdUJBQXVCO1FBQ3JDLEtBQUssRUFBRSxNQUFNLENBQUMsdUJBQXVCO1FBQ3JDLEtBQUssRUFBRSxNQUFNLENBQUMsdUJBQXVCO1FBQ3JDLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixFQUFFLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7S0FDL0IsQ0FBQztDQUNMO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtBQUNkLGtCQUFlLEdBQUcsQ0FBQyJ9