export type SugarFonticonId =
  | "align"
  | "autocomplete"
  | "avatar"
  | "brand-coffeekraken"
  | "brand-lit"
  | "button"
  | "code"
  | "colors"
  | "copy"
  | "datepicker"
  | "display-preview"
  | "dropdown"
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
  | "switch"
  | "theme"
  | "tooltip"
  | "typography"
  | "vue";

export type SugarFonticonKey =
  | "Align"
  | "Autocomplete"
  | "Avatar"
  | "BrandCoffeekraken"
  | "BrandLit"
  | "Button"
  | "Code"
  | "Colors"
  | "Copy"
  | "Datepicker"
  | "DisplayPreview"
  | "Dropdown"
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
  | "Switch"
  | "Theme"
  | "Tooltip"
  | "Typography"
  | "Vue";

export enum SugarFonticon {
  Align = "align",
  Autocomplete = "autocomplete",
  Avatar = "avatar",
  BrandCoffeekraken = "brand-coffeekraken",
  BrandLit = "brand-lit",
  Button = "button",
  Code = "code",
  Colors = "colors",
  Copy = "copy",
  Datepicker = "datepicker",
  DisplayPreview = "display-preview",
  Dropdown = "dropdown",
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
  Switch = "switch",
  Theme = "theme",
  Tooltip = "tooltip",
  Typography = "typography",
  Vue = "vue",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.Align]: "61697",
  [SugarFonticon.Autocomplete]: "61698",
  [SugarFonticon.Avatar]: "61699",
  [SugarFonticon.BrandCoffeekraken]: "61700",
  [SugarFonticon.BrandLit]: "61701",
  [SugarFonticon.Button]: "61702",
  [SugarFonticon.Code]: "61703",
  [SugarFonticon.Colors]: "61704",
  [SugarFonticon.Copy]: "61705",
  [SugarFonticon.Datepicker]: "61706",
  [SugarFonticon.DisplayPreview]: "61707",
  [SugarFonticon.Dropdown]: "61708",
  [SugarFonticon.FileCss]: "61709",
  [SugarFonticon.FileHtml]: "61710",
  [SugarFonticon.FileJs]: "61711",
  [SugarFonticon.FileMd]: "61712",
  [SugarFonticon.FilePhp]: "61713",
  [SugarFonticon.FileTs]: "61714",
  [SugarFonticon.FolderOpened]: "61715",
  [SugarFonticon.Folder]: "61716",
  [SugarFonticon.Helpers]: "61717",
  [SugarFonticon.LangCss]: "61718",
  [SugarFonticon.LangHtml]: "61719",
  [SugarFonticon.LangJs]: "61720",
  [SugarFonticon.LangMd]: "61721",
  [SugarFonticon.LangPhp]: "61722",
  [SugarFonticon.LangTs]: "61723",
  [SugarFonticon.Layout]: "61724",
  [SugarFonticon.Range]: "61725",
  [SugarFonticon.Refresh]: "61726",
  [SugarFonticon.SupportChromium]: "61727",
  [SugarFonticon.SupportEdge]: "61728",
  [SugarFonticon.SupportFirefox]: "61729",
  [SugarFonticon.SupportRtl]: "61730",
  [SugarFonticon.SupportSafari]: "61731",
  [SugarFonticon.Switch]: "61732",
  [SugarFonticon.Theme]: "61733",
  [SugarFonticon.Tooltip]: "61734",
  [SugarFonticon.Typography]: "61735",
  [SugarFonticon.Vue]: "61736",
};
