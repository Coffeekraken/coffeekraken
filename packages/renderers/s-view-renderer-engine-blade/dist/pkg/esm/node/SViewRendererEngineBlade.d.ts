import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineBladeSettingsInterface';

export interface ISViewRendererEngineBladeSettings {
}
export default class SViewRendererEngineBlade {
    static id: string;
    static extensions: string[];
    static settingsInterface: typeof __SViewRendererBladeEngineSettingsInterface;
    settings: ISViewRendererEngineBladeSettings;
    constructor(settings?: Partial<ISViewRendererEngineBladeSettings>);
    render(viewPath: string, data: any, sharedDataFilePath: string, viewRendererSettings: ISViewRendererSettings): any;
}
