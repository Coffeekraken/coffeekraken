export type SugarFonticonId =
  | "autocomplete"
  | "brand-coffeekraken"
  | "brand-lit"
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
  [SugarFonticon.Code]: "61700",
  [SugarFonticon.Copy]: "61701",
  [SugarFonticon.Datepicker]: "61702",
  [SugarFonticon.DisplayPreview]: "61703",
  [SugarFonticon.FileCss]: "61704",
  [SugarFonticon.FileHtml]: "61705",
  [SugarFonticon.FileJs]: "61706",
  [SugarFonticon.FileMd]: "61707",
  [SugarFonticon.FilePhp]: "61708",
  [SugarFonticon.FileTs]: "61709",
  [SugarFonticon.FolderOpened]: "61710",
  [SugarFonticon.Folder]: "61711",
  [SugarFonticon.LangCss]: "61712",
  [SugarFonticon.LangHtml]: "61713",
  [SugarFonticon.LangJs]: "61714",
  [SugarFonticon.LangMd]: "61715",
  [SugarFonticon.LangPhp]: "61716",
  [SugarFonticon.LangTs]: "61717",
  [SugarFonticon.Range]: "61718",
  [SugarFonticon.Refresh]: "61719",
  [SugarFonticon.SupportChromium]: "61720",
  [SugarFonticon.SupportEdge]: "61721",
  [SugarFonticon.SupportFirefox]: "61722",
  [SugarFonticon.SupportRtl]: "61723",
  [SugarFonticon.SupportSafari]: "61724",
  [SugarFonticon.Vue]: "61725",
};
