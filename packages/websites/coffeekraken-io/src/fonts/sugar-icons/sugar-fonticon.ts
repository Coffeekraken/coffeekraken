export type SugarFonticonId =
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
  | "support-chromium"
  | "support-edge"
  | "support-firefox"
  | "support-rtl"
  | "support-safari"
  | "vue";

export type SugarFonticonKey =
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
  | "SupportChromium"
  | "SupportEdge"
  | "SupportFirefox"
  | "SupportRtl"
  | "SupportSafari"
  | "Vue";

export enum SugarFonticon {
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
  SupportChromium = "support-chromium",
  SupportEdge = "support-edge",
  SupportFirefox = "support-firefox",
  SupportRtl = "support-rtl",
  SupportSafari = "support-safari",
  Vue = "vue",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.DisplayPreview]: "61697",
  [SugarFonticon.FileCss]: "61698",
  [SugarFonticon.FileHtml]: "61699",
  [SugarFonticon.FileJs]: "61700",
  [SugarFonticon.FileMd]: "61701",
  [SugarFonticon.FilePhp]: "61702",
  [SugarFonticon.FileTs]: "61703",
  [SugarFonticon.FolderOpened]: "61704",
  [SugarFonticon.Folder]: "61705",
  [SugarFonticon.LangCss]: "61706",
  [SugarFonticon.LangHtml]: "61707",
  [SugarFonticon.LangJs]: "61708",
  [SugarFonticon.LangMd]: "61709",
  [SugarFonticon.LangPhp]: "61710",
  [SugarFonticon.LangTs]: "61711",
  [SugarFonticon.SupportChromium]: "61712",
  [SugarFonticon.SupportEdge]: "61713",
  [SugarFonticon.SupportFirefox]: "61714",
  [SugarFonticon.SupportRtl]: "61715",
  [SugarFonticon.SupportSafari]: "61716",
  [SugarFonticon.Vue]: "61717",
};
