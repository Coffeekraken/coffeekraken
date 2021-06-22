export type SugarFonticonId =
  | "copy";

export type SugarFonticonKey =
  | "Copy";

export enum SugarFonticon {
  Copy = "copy",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.Copy]: "61697",
};
