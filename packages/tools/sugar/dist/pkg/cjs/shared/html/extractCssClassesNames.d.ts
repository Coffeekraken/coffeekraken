
export interface IExtractCssClassesNamesSettings {
    expandPleasantCssClassname?: boolean;
    includeIds?: boolean;
}
export default function __extractCssClassesNames(html: string, settings?: Partial<IExtractCssClassesNamesSettings>): string[];
