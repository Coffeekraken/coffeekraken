
export interface ILoadConfigFileSettings {
    rootDir: string;
    throw: boolean;
}
export default function __loadConfigFile(filePath: string | string[], settings?: Partial<ILoadConfigFileSettings>): Promise<any>;
