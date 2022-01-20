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
  | "easing"
  | "file-css"
  | "file-html"
  | "file-js"
  | "file-md"
  | "file-php"
  | "file-ts"
  | "flex"
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
  | "opensource"
  | "radius"
  | "range"
  | "ratio"
  | "refresh"
  | "scale"
  | "space"
  | "support-chromium"
  | "support-edge"
  | "support-firefox"
  | "support-rtl"
  | "support-safari"
  | "switch"
  | "theme"
  | "tooltip"
  | "typography"
  | "visibility"
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
  | "Easing"
  | "FileCss"
  | "FileHtml"
  | "FileJs"
  | "FileMd"
  | "FilePhp"
  | "FileTs"
  | "Flex"
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
  | "Opensource"
  | "Radius"
  | "Range"
  | "Ratio"
  | "Refresh"
  | "Scale"
  | "Space"
  | "SupportChromium"
  | "SupportEdge"
  | "SupportFirefox"
  | "SupportRtl"
  | "SupportSafari"
  | "Switch"
  | "Theme"
  | "Tooltip"
  | "Typography"
  | "Visibility"
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
  Easing = "easing",
  FileCss = "file-css",
  FileHtml = "file-html",
  FileJs = "file-js",
  FileMd = "file-md",
  FilePhp = "file-php",
  FileTs = "file-ts",
  Flex = "flex",
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
  Opensource = "opensource",
  Radius = "radius",
  Range = "range",
  Ratio = "ratio",
  Refresh = "refresh",
  Scale = "scale",
  Space = "space",
  SupportChromium = "support-chromium",
  SupportEdge = "support-edge",
  SupportFirefox = "support-firefox",
  SupportRtl = "support-rtl",
  SupportSafari = "support-safari",
  Switch = "switch",
  Theme = "theme",
  Tooltip = "tooltip",
  Typography = "typography",
  Visibility = "visibility",
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
  [SugarFonticon.Easing]: "61709",
  [SugarFonticon.FileCss]: "61710",
  [SugarFonticon.FileHtml]: "61711",
  [SugarFonticon.FileJs]: "61712",
  [SugarFonticon.FileMd]: "61713",
  [SugarFonticon.FilePhp]: "61714",
  [SugarFonticon.FileTs]: "61715",
  [SugarFonticon.Flex]: "61716",
  [SugarFonticon.FolderOpened]: "61717",
  [SugarFonticon.Folder]: "61718",
  [SugarFonticon.Helpers]: "61719",
  [SugarFonticon.LangCss]: "61720",
  [SugarFonticon.LangHtml]: "61721",
  [SugarFonticon.LangJs]: "61722",
  [SugarFonticon.LangMd]: "61723",
  [SugarFonticon.LangPhp]: "61724",
  [SugarFonticon.LangTs]: "61725",
  [SugarFonticon.Layout]: "61726",
  [SugarFonticon.Opensource]: "61727",
  [SugarFonticon.Radius]: "61728",
  [SugarFonticon.Range]: "61729",
  [SugarFonticon.Ratio]: "61730",
  [SugarFonticon.Refresh]: "61731",
  [SugarFonticon.Scale]: "61732",
  [SugarFonticon.Space]: "61733",
  [SugarFonticon.SupportChromium]: "61734",
  [SugarFonticon.SupportEdge]: "61735",
  [SugarFonticon.SupportFirefox]: "61736",
  [SugarFonticon.SupportRtl]: "61737",
  [SugarFonticon.SupportSafari]: "61738",
  [SugarFonticon.Switch]: "61739",
  [SugarFonticon.Theme]: "61740",
  [SugarFonticon.Tooltip]: "61741",
  [SugarFonticon.Typography]: "61742",
  [SugarFonticon.Visibility]: "61743",
  [SugarFonticon.Vue]: "61744",
};
