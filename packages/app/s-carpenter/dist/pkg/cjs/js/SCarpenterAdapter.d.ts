import __SCarpenterAppComponent from './SCarpenterAppComponent';
import __SCarpenterElement from './SCarpenterElement';
export interface ISCarpenterAdapterSettings {
}
export interface ISCarpenterAdapterDeps {
    carpenter: __SCarpenterAppComponent;
    element: __SCarpenterElement;
    specs: string;
}
export default class SCarpenterAdapter {
    settings: ISCarpenterAdapterSettings;
    carpenter: __SCarpenterAppComponent;
    element: __SCarpenterElement;
    specs: string;
    constructor(deps: ISCarpenterAdapterDeps, settings?: ISCarpenterAdapterSettings);
}
