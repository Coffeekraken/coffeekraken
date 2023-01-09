import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import __SViewRendererTwigEngineSettingsInterface from './interface/SViewRendererEngineTwigSettingsInterface';

export interface ISViewRendererEngineTwigSettings {
}
export default class SViewRendererEngineTwig {
    static id: string;
    static extensions: string[];
    static settingsInterface: typeof __SViewRendererTwigEngineSettingsInterface;
    settings: ISViewRendererEngineTwigSettings;
    constructor(settings?: Partial<ISViewRendererEngineTwigSettings>);
    render(viewPath: string, data: any, sharedDataFilePath: string, viewRendererSettings: ISViewRendererSettings): any;
}
