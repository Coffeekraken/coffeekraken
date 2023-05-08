import __SCarpenterAppComponent from './SCarpenterAppComponent';
import __SCarpenterPage from './SCarpenterPage';

export interface ISCarpenterPageAdapterSettings {}

export interface ISCarpenterPageAdapterDeps {
    carpenter: __SCarpenterAppComponent;
    page: __SCarpenterPage;
}

export default class SCarpenterPageAdapter {
    settings: ISCarpenterPageAdapterSettings;

    carpenter: __SCarpenterAppComponent;
    page: __SCarpenterPage;

    constructor(
        deps: ISCarpenterPageAdapterDeps,
        settings?: ISCarpenterPageAdapterSettings,
    ) {
        this.settings = {
            ...(settings ?? {}),
        };
        Object.assign(this, deps);
    }
}
