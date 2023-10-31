export type SugarFonticonId =
  | "logo-postcss";

export type SugarFonticonKey =
  | "LogoPostcss";

export enum SugarFonticon {
  LogoPostcss = "logo-postcss",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.LogoPostcss]: "61697",
};
