import type { ISVideoData, ISVideoFormat } from '@specimen/types';
import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentVideoWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps);
    validate(newValues: any): {
        error: string;
    };
    render(): import("lit-html").TemplateResult<1>;
    _renderVideos(values: ISVideoData, path: string[]): any;
    _renderVideo(url: string, format: ISVideoFormat, path: string[]): any;
}
