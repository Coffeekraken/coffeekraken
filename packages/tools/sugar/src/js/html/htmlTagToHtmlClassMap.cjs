var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var htmlTagToHtmlClassMap_exports = {};
__export(htmlTagToHtmlClassMap_exports, {
  default: () => htmlTagToHtmlClassMap_default
});
module.exports = __toCommonJS(htmlTagToHtmlClassMap_exports);
var htmlTagToHtmlClassMap_default = {
  a: window.HTMLAnchorElement,
  audio: window.HTMLAudioElement,
  body: window.HTMLBodyElement,
  button: window.HTMLButtonElement,
  canvas: window.HTMLCanvasElement,
  dl: window.HTMLDListElement,
  data: window.HTMLDataElement,
  datalist: window.HTMLDataListElement,
  details: window.HTMLDetailsElement,
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
  area: window.HTMLAreaElement
};
