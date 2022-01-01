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
  | "lang-css"
  | "lang-html"
  | "lang-js"
  | "lang-md"
  | "lang-php"
  | "lang-ts"
  | "range"
  | "refresh"
  | "support-chromium"
  | "support-edge"
  | "support-firefox"
  | "support-rtl"
  | "support-safari"
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
  | "LangCss"
  | "LangHtml"
  | "LangJs"
  | "LangMd"
  | "LangPhp"
  | "LangTs"
  | "Range"
  | "Refresh"
  | "SupportChromium"
  | "SupportEdge"
  | "SupportFirefox"
  | "SupportRtl"
  | "SupportSafari"
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
  LangCss = "lang-css",
  LangHtml = "lang-html",
  LangJs = "lang-js",
  LangMd = "lang-md",
  LangPhp = "lang-php",
  LangTs = "lang-ts",
  Range = "range",
  Refresh = "refresh",
  SupportChromium = "support-chromium",
  SupportEdge = "support-edge",
  SupportFirefox = "support-firefox",
  SupportRtl = "support-rtl",
  SupportSafari = "support-safari",
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
  [SugarFonticon.LangCss]: "61713",
  [SugarFonticon.LangHtml]: "61714",
  [SugarFonticon.LangJs]: "61715",
  [SugarFonticon.LangMd]: "61716",
  [SugarFonticon.LangPhp]: "61717",
  [SugarFonticon.LangTs]: "61718",
  [SugarFonticon.Range]: "61719",
  [SugarFonticon.Refresh]: "61720",
  [SugarFonticon.SupportChromium]: "61721",
  [SugarFonticon.SupportEdge]: "61722",
  [SugarFonticon.SupportFirefox]: "61723",
  [SugarFonticon.SupportRtl]: "61724",
  [SugarFonticon.SupportSafari]: "61725",
  [SugarFonticon.Vue]: "61726",
};
