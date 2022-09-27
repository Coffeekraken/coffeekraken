// @ts-nocheck
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
export default map;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLElBQUk7SUFDQSxHQUFHLEdBQUc7UUFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtRQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM5QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7UUFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7UUFDaEMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDM0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQ3BDLE9BQU8sRUFBRSxNQUFNLENBQUMsa0JBQWtCO1FBQ2xDLG9DQUFvQztRQUNwQyxHQUFHLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtRQUNoQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWM7UUFDMUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZO1FBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1FBQzlCLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO1FBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7UUFDNUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM1QixNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtRQUNoQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUM1QixLQUFLLEVBQUUsTUFBTSxD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