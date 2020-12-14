// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return {
        a: HTMLAnchorElement,
        audio: HTMLAudioElement,
        body: HTMLBodyElement,
        button: HTMLButtonElement,
        canvas: HTMLCanvasElement,
        dl: HTMLDListElement,
        data: HTMLDataElement,
        datalist: HTMLDataListElement,
        details: HTMLDetailsElement,
        // dialog: HTMLDialogElement,
        dir: HTMLDirectoryElement,
        div: HTMLDivElement,
        html: HTMLDocument,
        embed: HTMLEmbedElement,
        fieldset: HTMLFieldSetElement,
        font: HTMLFontElement,
        form: HTMLFormElement,
        frame: HTMLFrameElement,
        head: HTMLHeadElement,
        html: HTMLHtmlElement,
        iframe: HTMLIFrameElement,
        img: HTMLImageElement,
        input: HTMLInputElement,
        label: HTMLLabelElement,
        legend: HTMLLegendElement,
        link: HTMLLinkElement,
        map: HTMLMapElement,
        marquee: HTMLMarqueeElement,
        media: HTMLMediaElement,
        menu: HTMLMenuElement,
        meta: HTMLMetaElement,
        meter: HTMLMeterElement,
        del: HTMLModElement,
        ins: HTMLModElement,
        dol: HTMLOListElement,
        object: HTMLObjectElement,
        optgroup: HTMLOptGroupElement,
        option: HTMLOptionElement,
        output: HTMLOutputElement,
        p: HTMLParagraphElement,
        param: HTMLParamElement,
        picture: HTMLPictureElement,
        pre: HTMLPreElement,
        progress: HTMLProgressElement,
        quote: HTMLQuoteElement,
        script: HTMLScriptElement,
        select: HTMLSelectElement,
        slot: HTMLSlotElement,
        source: HTMLSourceElement,
        span: HTMLSpanElement,
        style: HTMLStyleElement,
        td: HTMLTableCellElement,
        th: HTMLTableCellElement,
        col: HTMLTableColElement,
        colgroup: HTMLTableColElement,
        table: HTMLTableElement,
        tr: HTMLTableRowElement,
        tfoot: HTMLTableSectionElement,
        thead: HTMLTableSectionElement,
        tbody: HTMLTableSectionElement,
        template: HTMLTemplateElement,
        textarea: HTMLTextAreaElement,
        time: HTMLTimeElement,
        title: HTMLTitleElement,
        track: HTMLTrackElement,
        ul: HTMLUListElement,
        video: HTMLVideoElement,
        area: HTMLAreaElement
    };
});
//# sourceMappingURL=module.js.map