import __SCarpenterAdapter from './SCarpenterAdapter';
import __SCarpenterAppComponent from './SCarpenterAppComponent';
export interface ISCarpenterElementSettings {
}
export interface ISCarpenterElementData {
    uid: string;
    source: any;
    specs: string;
    specsObj: any;
    values: any;
}
export interface ISCarpenterElementStatus {
    unsaved: boolean;
    ready: boolean;
}
export default class SCarpenterElement {
    $elm: HTMLElement;
    carpenter: __SCarpenterAppComponent;
    settings: ISCarpenterElementSettings;
    _status: ISCarpenterElementStatus;
    _uid: string;
    get uid(): string;
    _adapter: __SCarpenterAdapter;
    get adapter(): __SCarpenterAdapter;
    get specs(): string;
    _specsObj: any;
    get specsObj(): any;
    _source: any;
    get source(): any;
    _values: any;
    get values(): any;
    constructor($elm: HTMLElement, carpenter: __SCarpenterAppComponent, settings?: ISCarpenterElementSettings);
    _updateElementClasses(): void;
    hasUnsavedChanges(): boolean;
    isReady(): boolean;
    delete(): Promise<void>;
    save(): Promise<void>;
    _data: ISCarpenterElementData;
    getData(): Promise<ISCarpenterElementData>;
    setValues(values: any): Promise<void>;
}
