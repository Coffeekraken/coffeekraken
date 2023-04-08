import type { ISVideoData, ISVideoFormat } from '@specimen/types';
import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentVideoWidget extends __SSpecsEditorWidget {
    static isActive(): boolean;
    constructor(deps: ISSpecsEditorWidgetDeps);
    render(): import("lit-html").TemplateResult<1>;
    _renderVideos(values: ISVideoData, path: string[]): any;
    _renderVideo(url: string, format: ISVideoFormat, path: string[]): any;
}
