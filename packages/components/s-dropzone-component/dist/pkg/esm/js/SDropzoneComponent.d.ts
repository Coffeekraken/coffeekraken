import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISDropzoneComponentProps {
    maxFiles: number;
    maxSize: number;
    files: string[];
    input: boolean;
    name: string;
    upload: boolean;
    uploadUrl: string;
    errorTimeout: Number;
    dropFileIcon: string;
    helpIcon: string;
    i18n: Record<string, string>;
}
export interface ISDropzoneComponentUploadResult {
    url: string;
}

export interface ISDropzoneFile {
    type: string;
    src?: string;
    alt?: string;
}
export default class SDropzoneComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static get state(): {
        uploadPercent: number;
        uploadTotalPercent: number;
        isDrag: boolean;
    };
    _$input: any;
    constructor();
    firstUpdated(): void;
    
    clear(dispatchEvent?: boolean): void;
    
    _uploadFile(file: File): Promise<ISDropzoneComponentUploadResult>;
    
    _onDragenter(e: any): void;
    
    _onDragleave(e: any): void;
    
    _onDrop(e: any): void;
    
    _onInputChange(e: any): void;
    
    _handleUpload(files: File[]): Promise<ISDropzoneComponentUploadResult[]>;
    
    _handleDropedFiles(files: any[], filesList: FileList): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
