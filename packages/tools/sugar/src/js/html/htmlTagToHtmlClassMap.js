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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbFRhZ1RvSHRtbENsYXNzTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHRtbFRhZ1RvSHRtbENsYXNzTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7O0lBb0JkLE9BQVM7UUFDUCxDQUFDLEVBQUUsaUJBQWlCO1FBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEVBQUUsRUFBRSxnQkFBZ0I7UUFDcEIsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLDZCQUE2QjtRQUM3QixHQUFHLEVBQUUsb0JBQW9CO1FBQ3pCLEdBQUcsRUFBRSxjQUFjO1FBQ25CLElBQUksRUFBRSxZQUFZO1FBQ2xCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsZUFBZTtRQUNyQixHQUFHLEVBQUUsY0FBYztRQUNuQixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixHQUFHLEVBQUUsY0FBYztRQUNuQixHQUFHLEVBQUUsY0FBYztRQUNuQixHQUFHLEVBQUUsZ0JBQWdCO1FBQ3JCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsQ0FBQyxFQUFFLG9CQUFvQjtRQUN2QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsR0FBRyxFQUFFLGNBQWM7UUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixFQUFFLEVBQUUsb0JBQW9CO1FBQ3hCLEdBQUcsRUFBRSxtQkFBbUI7UUFDeEIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEVBQUUsRUFBRSxtQkFBbUI7UUFDdkIsS0FBSyxFQUFFLHVCQUF1QjtRQUM5QixLQUFLLEVBQUUsdUJBQXVCO1FBQzlCLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLGVBQWU7S0FDdEIsQ0FBQyJ9