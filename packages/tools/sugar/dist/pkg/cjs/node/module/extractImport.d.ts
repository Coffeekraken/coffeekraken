
export interface IExtractImportSettings {
    import: boolean;
}
export interface IExtractImportItem {
    type: 'import';
    path: string;
    raw: string;
    imported: string;
    local: string | undefined;
}
export default function __extractImports(stringOrFilePath: any, settings?: Partial<IExtractImportSettings>): IExtractImportItem[];
