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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name            HtmlTagToHtmlClassMap
     * @namespace       sugar.js.html
     * @type            Object
     * @stable
     *
     * This export an object mapping the HTML tag name to his corresponding HTML class (object not css class)
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import HtmlTagToHtmlClassMap from '@coffeekraken/sugar/js/html/HtmlTagToHtmlClassMap';
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbFRhZ1RvSHRtbENsYXNzTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzL2h0bWwvaHRtbFRhZ1RvSHRtbENsYXNzTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILGtCQUFlO1FBQ2IsQ0FBQyxFQUFFLGlCQUFpQjtRQUNwQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixFQUFFLEVBQUUsZ0JBQWdCO1FBQ3BCLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQiw2QkFBNkI7UUFDN0IsR0FBRyxFQUFFLG9CQUFvQjtRQUN6QixHQUFHLEVBQUUsY0FBYztRQUNuQixJQUFJLEVBQUUsWUFBWTtRQUNsQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEdBQUcsRUFBRSxnQkFBZ0I7UUFDckIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsSUFBSSxFQUFFLGVBQWU7UUFDckIsR0FBRyxFQUFFLGNBQWM7UUFDbkIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsR0FBRyxFQUFFLGNBQWM7UUFDbkIsR0FBRyxFQUFFLGNBQWM7UUFDbkIsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLENBQUMsRUFBRSxvQkFBb0I7UUFDdkIsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLEdBQUcsRUFBRSxjQUFjO1FBQ25CLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsRUFBRSxFQUFFLG9CQUFvQjtRQUN4QixHQUFHLEVBQUUsbUJBQW1CO1FBQ3hCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsS0FBSyxFQUFFLHVCQUF1QjtRQUM5QixLQUFLLEVBQUUsdUJBQXVCO1FBQzlCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsRUFBRSxFQUFFLGdCQUFnQjtRQUNwQixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUMifQ==