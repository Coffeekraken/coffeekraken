export type SugarFonticonId =
  | "vue";

export type SugarFonticonKey =
  | "Vue";

export enum SugarFonticon {
  Vue = "vue",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.Vue]: "61697",
};
