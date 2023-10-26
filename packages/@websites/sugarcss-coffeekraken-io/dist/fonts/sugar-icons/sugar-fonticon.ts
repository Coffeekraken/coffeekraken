export type SugarFonticonId =
  | "logo-coffeekraken-sugar"
  | "logo-postcss"
  | "ui-menu-grid-solid";

export type SugarFonticonKey =
  | "LogoCoffeekrakenSugar"
  | "LogoPostcss"
  | "UiMenuGridSolid";

export enum SugarFonticon {
  LogoCoffeekrakenSugar = "logo-coffeekraken-sugar",
  LogoPostcss = "logo-postcss",
  UiMenuGridSolid = "ui-menu-grid-solid",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.LogoCoffeekrakenSugar]: "61697",
  [SugarFonticon.LogoPostcss]: "61698",
  [SugarFonticon.UiMenuGridSolid]: "61699",
};
