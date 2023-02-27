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
 * @snippet         __htmlTagToHtmlClassMap
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixJQUFJO0lBQ0EsR0FBRyxHQUFHO1FBQ0YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7UUFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO1FBQ2hDLEVBQUUsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzNCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtRQUNwQyxPQUFPLEVBQUUsTUFBTSxDQUFDLGtCQUFrQjtRQUNsQyxvQ0FBb0M7UUFDcEMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxvQkFBb0I7UUFDaEMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1FBQzFCLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWTtRQUN6QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtRQUNwQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7UUFDaEMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDNUIsS0FBSyxFQUFFLE1B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