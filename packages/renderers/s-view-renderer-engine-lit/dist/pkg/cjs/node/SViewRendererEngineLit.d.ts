import __SPromise from '@coffeekraken/s-promise';
import { ISViewRendererSettings } from '@coffeekraken/s-view-renderer';
import __SViewRendererBladeEngineSettingsInterface from './interface/SViewRendererEngineLitSettingsInterface';

export interface ISViewRendererEngineLitSettings {
}
export default class SViewRendererEngineLit {
    static id: string;
    static extensions: string[];
    static settingsInterface: typeof __SViewRendererBladeEngineSettingsInterface;
    settings: ISViewRendererEngineLitSettings;
    constructor(settings?: Partial<ISViewRendererEngineLitSettings>);
    render(viewPath: string, data: any, viewRendererSettings: ISViewRendererSettings): __SPromise;
}
