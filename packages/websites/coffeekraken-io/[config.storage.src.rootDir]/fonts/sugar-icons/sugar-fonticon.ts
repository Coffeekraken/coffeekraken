export type SugarFonticonId =
  | "support-chromium"
  | "support-edge"
  | "support-firefox"
  | "support-rtl"
  | "support-safari"
  | "vue";

export type SugarFonticonKey =
  | "SupportChromium"
  | "SupportEdge"
  | "SupportFirefox"
  | "SupportRtl"
  | "SupportSafari"
  | "Vue";

export enum SugarFonticon {
  SupportChromium = "support-chromium",
  SupportEdge = "support-edge",
  SupportFirefox = "support-firefox",
  SupportRtl = "support-rtl",
  SupportSafari = "support-safari",
  Vue = "vue",
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.SupportChromium]: "61697",
  [SugarFonticon.SupportEdge]: "61698",
  [SugarFonticon.SupportFirefox]: "61699",
  [SugarFonticon.SupportRtl]: "61700",
  [SugarFonticon.SupportSafari]: "61701",
  [SugarFonticon.Vue]: "61702",
};
