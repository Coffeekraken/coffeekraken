import __SCarpenterAppComponent from './SCarpenterAppComponent.js';
import __SCarpenterNode from './SCarpenterNode.js';

export interface ISCarpenterNodeAdapterSettings {}

export interface ISCarpenterNodeAdapterDeps {
    carpenter: __SCarpenterAppComponent;
    element: __SCarpenterNode;
    specs: string;
}

export default class SCarpenterNodeAdapter {
    settings: ISCarpenterNodeAdapterSettings;

    carpenter: __SCarpenterAppComponent;
    element: __SCarpenterNode;
    specs: string;

    constructor(
        deps: ISCarpenterNodeAdapterDeps,
        settings?: ISCarpenterNodeAdapterSettings,
    ) {
        this.settings = {
            ...(settings ?? {}),
        };
        Object.assign(this, deps);
    }
}
