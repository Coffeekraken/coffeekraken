import type { IAvailableColorsSettings } from './availableColors';

export interface IGetColorForSettings extends IAvailableColorsSettings {
    scope: string;
}
export default function getColorFor(ref: any, settings?: Partial<IGetColorForSettings>): any;
