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
export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILGVBQWU7SUFDWCxDQUFDLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtJQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM5QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7SUFDNUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7SUFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7SUFDaEMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDM0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO0lBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO0lBQ3BDLE9BQU8sRUFBRSxNQUFNLENBQUMsa0JBQWtCO0lBQ2xDLG9DQUFvQztJQUNwQyxHQUFHLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtJQUNoQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWM7SUFDMUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZO0lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO0lBQzlCLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CO0lBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtJQUM1QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7SUFDNUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO0lBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtJQUM1QixNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtJQUNoQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM1QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM5QixNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtJQUNoQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7SUFDNUIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjO0lBQzFCLE9BQU8sRUFBRSxNQUFNLENBQUMsa0JBQWtCO0lBQ2xDLEtBQUssRUFBRSxNQUFNLENBQUMsZ0JBQWdCO0lBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtJQUM1QixJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7SUFDNUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDOUIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxjQUFjO0lBQzFCLEdBQUcsRUFBRSxNQUFNLENBQUMsY0FBYztJQUMxQixHQUFHLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM1QixNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtJQUNoQyxRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtJQUNwQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtJQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtJQUNoQyxDQUFDLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtJQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM5QixPQUFPLEVBQUUsTUFBTSxDQUFDLGtCQUFrQjtJQUNsQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGNBQWM7SUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUI7SUFDcEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDOUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7SUFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7SUFDaEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO0lBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCO0lBQ2hDLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZTtJQUM1QixLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM5QixFQUFFLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtJQUMvQixFQUFFLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtJQUMvQixHQUFHLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtJQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtJQUNwQyxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtJQUM5QixFQUFFLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtJQUM5QixLQUFLLEVBQUUsTUFBTSxDQUFDLHVCQUF1QjtJQUNyQyxLQUFLLEVBQUUsTUFBTSxDQUFDLHVCQUF1QjtJQUNyQyxLQUFLLEVBQUUsTUFBTSxDQUFDLHVCQUF1QjtJQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtJQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQjtJQUNwQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGVBQWU7SUFDNUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDOUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDOUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlO0NBQy9CLENBQUMifQ==