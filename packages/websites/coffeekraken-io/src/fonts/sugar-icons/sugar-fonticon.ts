export type SugarFonticonId =
  | "autocomplete"
  | "brand-coffeekraken"
  | "brand-lit"
  | "button"
  | "code"
  | "copy"
  | "datepicker"
  | "display-preview"
  | "file-css"
  | "file-html"
  | "file-js"
  | "file-md"
  | "file-php"
  | "file-ts"
  | "folder-opened"
  | "folder"
  | "helpers"
  | "lang-css"
  | "lang-html"
  | "lang-js"
  | "lang-md"
  | "lang-php"
  | "lang-ts"
  | "layout"
  | "range"
  | "refresh"
  | "support-chromium"
  | "support-edge"
  | "support-firefox"
  | "support-rtl"
  | "support-safari"
  | "theme"
  | "vue";

export type SugarFonticonKey =
  | "Autocomplete"
  | "BrandCoffeekraken"
  | "BrandLit"
  | "Button"
  | "Code"
  | "Copy"
  | "Datepicker"
  | "DisplayPreview"
  | "FileCss"
  | "FileHtml"
  | "FileJs"
  | "FileMd"
  | "FilePhp"
  | "FileTs"
  | "FolderOpened"
  | "Folder"
  | "Helpers"
  | "LangCss"
  | "LangHtml"
  | "LangJs"
  | "LangMd"
  | "LangPhp"
  | "LangTs"
  | "Layout"
  | "Range"
  | "Refresh"
  | "SupportChromium"
  | "SupportEdge"
  | "SupportFirefox"
  | "SupportRtl"
  | "SupportSafari"
  | "Theme"
  | "Vue";

export enum SugarFonticon {
  Autocomplete = "autocomplete",
  BrandCoffeekraken = "brand-coffeekraken",
  BrandLit = "brand-lit",
  Button = "button",
  Code = "code",
  Copy = "copy",
  Datepicker = "datepicker",
  DisplayPreview = "display-preview",
  FileCss = "file-css",
  FileHtml = "file-html",
  FileJs = "file-js",
  FileMd = "file-md",
  FilePhp = "file-php",
  FileTs = "file-ts",
  FolderOpened = "folder-opened",
  Folder = "folder",
  Helpers = "helpers",
  LangCss = "lang-css",
  LangHtml = "lang-html",
  LangJs = "lang-js",
  LangMd = "lang-md",
  LangPhp = "lang-php",
  LangTs = "lang-ts",
  Layout = "layout",
  Range = "range",
  Refresh = "refresh",
  SupportChromium = "support-chromium",
  SupportEdge = "support-edge",
  SupportFirefox = "support-firefox",
  SupportRtl = "support-rtl",
  SupportSafari = "support-safari",
  Theme = "theme",
  Vue = "vue",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.Autocomplete]: "61697",
  [SugarFonticon.BrandCoffeekraken]: "61698",
  [SugarFonticon.BrandLit]: "61699",
  [SugarFonticon.Button]: "61700",
  [SugarFonticon.Code]: "61701",
  [SugarFonticon.Copy]: "61702",
  [SugarFonticon.Datepicker]: "61703",
  [SugarFonticon.DisplayPreview]: "61704",
  [SugarFonticon.FileCss]: "61705",
  [SugarFonticon.FileHtml]: "61706",
  [SugarFonticon.FileJs]: "61707",
  [SugarFonticon.FileMd]: "61708",
  [SugarFonticon.FilePhp]: "61709",
  [SugarFonticon.FileTs]: "61710",
  [SugarFonticon.FolderOpened]: "61711",
  [SugarFonticon.Folder]: "61712",
  [SugarFonticon.Helpers]: "61713",
  [SugarFonticon.LangCss]: "61714",
  [SugarFonticon.LangHtml]: "61715",
  [SugarFonticon.LangJs]: "61716",
  [SugarFonticon.LangMd]: "61717",
  [SugarFonticon.LangPhp]: "61718",
  [SugarFonticon.LangTs]: "61719",
  [SugarFonticon.Layout]: "61720",
  [SugarFonticon.Range]: "61721",
  [SugarFonticon.Refresh]: "61722",
  [SugarFonticon.SupportChromium]: "61723",
  [SugarFonticon.SupportEdge]: "61724",
  [SugarFonticon.SupportFirefox]: "61725",
  [SugarFonticon.SupportRtl]: "61726",
  [SugarFonticon.SupportSafari]: "61727",
  [SugarFonticon.Theme]: "61728",
  [SugarFonticon.Vue]: "61729",
};
