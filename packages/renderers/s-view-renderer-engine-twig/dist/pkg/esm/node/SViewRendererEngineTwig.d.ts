import __SViewRendererTwigEngineSettingsInterface from './interface/SViewRendererEngineTwigSettingsInterface';

export interface ISViewRendererEngineTwigSettings {
}
export default class SViewRendererEngineTwig {
    static id: string;
    static extensions: string[];
    static settingsInterface: typeof __SViewRendererTwigEngineSettingsInterface;
    settings: ISViewRendererEngineTwigSettings;
    constructor(settings?: Partial<ISViewRendererEngineTwigSettings>);
    render({ viewDotPath, viewRelPath, viewPath, data, sharedDataFilePath, viewRendererSettings, }: {
        viewDotPath: any;
        viewRelPath: any;
        viewPath: any;
        data: any;
        sharedDataFilePath: any;
        viewRendererSettings: any;
    }): any;
}
