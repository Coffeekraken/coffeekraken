import __SCarpenterAppComponent from './SCarpenterAppComponent';
import __SCarpenterNodeAdapter from './SCarpenterNodeAdapter';
export interface ISCarpenterNodeSettings {
}
export interface ISCarpenterNodeStatus {
    exists: boolean;
}
export interface ISCarpenterNodeData {
    uid: string;
    source: any;
    specs: string;
    specsObj: any;
    values: any;
}
export interface ISCarpenterNodeStatus {
    unsaved: boolean;
    ready: boolean;
}
export default class SCarpenterNode {
    $node: HTMLElement;
    carpenter: __SCarpenterAppComponent;
    settings: ISCarpenterNodeSettings;
    _status: ISCarpenterNodeStatus;
    get $elm(): HTMLElement;
    _uid: string;
    get uid(): string;
    _adapter: __SCarpenterNodeAdapter;
    get adapter(): __SCarpenterNodeAdapter;
    get specs(): string;
    _specsObj: any;
    get specsObj(): any;
    _source: any;
    get source(): any;
    _values: any;
    get values(): any;
    constructor($node: HTMLTemplateElement, carpenter: __SCarpenterAppComponent, settings?: ISCarpenterNodeSettings);
    _updateElementClasses(): void;
    hasUnsavedChanges(): boolean;
    isReady(): boolean;
    setUid(uid: string): void;
    delete(): Promise<void>;
    status(uid: string): Promise<ISCarpenterNodeStatus>;
    save(): Promise<void>;
    _data: ISCarpenterNodeData;
    getData(): Promise<ISCarpenterNodeData>;
    setValues(values: any): Promise<void>;
}
