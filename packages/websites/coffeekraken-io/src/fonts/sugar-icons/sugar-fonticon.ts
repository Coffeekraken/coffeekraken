export type SugarFonticonId =
  | "align"
  | "autocomplete"
  | "avatar"
  | "brand-coffeekraken"
  | "brand-lit"
  | "brand-nextjs"
  | "brand-opensource"
  | "build"
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
  | "link-broken"
  | "loader"
  | "more"
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
  | "BrandNextjs"
  | "BrandOpensource"
  | "Build"
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
  | "LinkBroken"
  | "Loader"
  | "More"
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
  BrandNextjs = "brand-nextjs",
  BrandOpensource = "brand-opensource",
  Build = "build",
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
  LinkBroken = "link-broken",
  Loader = "loader",
  More = "more",
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
  [SugarFonticon.BrandNextjs]: "61702",
  [SugarFonticon.BrandOpensource]: "61703",
  [SugarFonticon.Build]: "61704",
  [SugarFonticon.Button]: "61705",
  [SugarFonticon.Code]: "61706",
  [SugarFonticon.Colors]: "61707",
  [SugarFonticon.Copy]: "61708",
  [SugarFonticon.Datepicker]: "61709",
  [SugarFonticon.DisplayPreview]: "61710",
  [SugarFonticon.Dropdown]: "61711",
  [SugarFonticon.Easing]: "61712",
  [SugarFonticon.FileCss]: "61713",
  [SugarFonticon.FileHtml]: "61714",
  [SugarFonticon.FileJs]: "61715",
  [SugarFonticon.FileMd]: "61716",
  [SugarFonticon.FilePhp]: "61717",
  [SugarFonticon.FileTs]: "61718",
  [SugarFonticon.Flex]: "61719",
  [SugarFonticon.FolderOpened]: "61720",
  [SugarFonticon.Folder]: "61721",
  [SugarFonticon.Helpers]: "61722",
  [SugarFonticon.LangCss]: "61723",
  [SugarFonticon.LangHtml]: "61724",
  [SugarFonticon.LangJs]: "61725",
  [SugarFonticon.LangMd]: "61726",
  [SugarFonticon.LangPhp]: "61727",
  [SugarFonticon.LangTs]: "61728",
  [SugarFonticon.Layout]: "61729",
  [SugarFonticon.LinkBroken]: "61730",
  [SugarFonticon.Loader]: "61731",
  [SugarFonticon.More]: "61732",
  [SugarFonticon.Radius]: "61733",
  [SugarFonticon.Range]: "61734",
  [SugarFonticon.Ratio]: "61735",
  [SugarFonticon.Refresh]: "61736",
  [SugarFonticon.Scale]: "61737",
  [SugarFonticon.Space]: "61738",
  [SugarFonticon.SupportChromium]: "61739",
  [SugarFonticon.SupportEdge]: "61740",
  [SugarFonticon.SupportFirefox]: "61741",
  [SugarFonticon.SupportRtl]: "61742",
  [SugarFonticon.SupportSafari]: "61743",
  [SugarFonticon.Switch]: "61744",
  [SugarFonticon.Theme]: "61745",
  [SugarFonticon.Tooltip]: "61746",
  [SugarFonticon.Typography]: "61747",
  [SugarFonticon.Visibility]: "61748",
  [SugarFonticon.Vue]: "61749",
};
