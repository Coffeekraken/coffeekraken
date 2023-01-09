
export interface IAvailableColorsSettings {
    excludeBasics: boolean;
}
export default function availableColors(settings?: Partial<IAvailableColorsSettings>): string[];
