export type SugarFonticonId = 'drop-file' | 'help';

export type SugarFonticonKey = 'DropFile' | 'Help';

export enum SugarFonticon {
  DropFile = 'drop-file',
  Help = 'help',
}

export const SUGAR_FONTICON_CODEPOINTS: { [key in SugarFonticon]: string } = {
  [SugarFonticon.DropFile]: '61697',
  [SugarFonticon.Help]: '61698',
};
