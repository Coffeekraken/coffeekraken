export type SugarFonticonId =
  | "logo-coffeekraken-sugar"
  | "logo-opensource"
  | "logo-postcss"
  | "ui-menu-grid-solid";

export type SugarFonticonKey =
  | "LogoCoffeekrakenSugar"
  | "LogoOpensource"
  | "LogoPostcss"
  | "UiMenuGridSolid";

export enum SugarFonticon {
  LogoCoffeekrakenSugar = "logo-coffeekraken-sugar",
  LogoOpensource = "logo-opensource",
  LogoPostcss = "logo-postcss",
  UiMenuGridSolid = "ui-menu-grid-solid",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.LogoCoffeekrakenSugar]: "61697",
  [SugarFonticon.LogoOpensource]: "61698",
  [SugarFonticon.LogoPostcss]: "61699",
  [SugarFonticon.UiMenuGridSolid]: "61700",
};
