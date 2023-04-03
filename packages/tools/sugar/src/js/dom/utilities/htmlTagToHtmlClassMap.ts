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
        h1: window.HTMLTitleElement,
        h2: window.HTMLTitleElement,
        h3: window.HTMLTitleElement,
        h4: window.HTMLTitleElement,
        h5: window.HTMLTitleElement,
        h6: window.HTMLTitleElement,
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
} catch (e) {}
export default map;
