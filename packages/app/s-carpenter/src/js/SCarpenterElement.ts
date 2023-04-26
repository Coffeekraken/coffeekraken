import __SCarpenterAdapter from './SCarpenterAdapter';
import __SCarpenterAppComponent from './SCarpenterAppComponent';

export interface ISCarpenterElementSettings {}

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

    _status: ISCarpenterElementStatus = {
        ready: false,
        unsaved: false,
    };

    _uid: string;
    get uid(): string {
        if (this._uid) {
            return this._uid;
        }
        this._uid = this.$elm.children[0].getAttribute('uid');
        return this._uid;
    }

    _adapter: __SCarpenterAdapter;
    get adapter(): __SCarpenterAdapter {
        if (this._adapter) {
            return this._adapter;
        }
        const adapterName =
            this.$elm.getAttribute('s-carpenter-adapter') ??
            this.carpenter.props.adapter;

        if (!this.carpenter.constructor._registeredAdapters[adapterName]) {
            throw new Error(
                `<red>[SCarpenter]</red> No "${adapterName}" adapter registered...`,
            );
        }

        const adapter = new this.carpenter.constructor._registeredAdapters[
            adapterName
        ]({
            carpenter: this.carpenter,
            element: this,
            specs: this.specs,
        });
        this._adapter = adapter;
        return this._adapter;
    }

    get specs(): string {
        return this.$elm.getAttribute('s-specs');
    }

    _specsObj: any;
    get specsObj(): any {
        return this._specsObj;
    }

    _source: any;
    get source(): any {
        return this._source;
    }

    _values: any;
    get values(): any {
        return this._values;
    }

    constructor(
        $elm: HTMLElement,
        carpenter: __SCarpenterAppComponent,
        settings?: ISCarpenterElementSettings,
    ) {
        this.settings = {
            ...(settings ?? {}),
        };
        this.$elm = $elm;
        this.carpenter = carpenter;

        // check if the element is a new one
        if ($elm.hasAttribute('is-new')) {
            $elm.removeAttribute('is-new');
            this.save();
        }
    }

    _updateElementClasses(): void {
        if (this.isReady()) {
            this.$elm.classList.add('ready');
        } else {
            this.$elm.classList.remove('ready');
        }

        if (this.hasUnsavedChanges()) {
            this.$elm.classList.add('unsaved');
        } else {
            this.$elm.classList.remove('unsaved');
        }
    }

    hasUnsavedChanges(): boolean {
        return this._status.unsaved;
    }

    isReady(): boolean {
        return this._status.ready;
    }

    async delete(): Promise<void> {
        const deletePromise = this.adapter.delete();
        deletePromise.then(() => {
            _console.log('DELE');
            this.$elm.remove();
        });
        return deletePromise;
    }

    async save(): Promise<void> {
        const data = await this.getData();
        delete data.source;
        delete data.specsObj;
        data.specs = this.specs;
        const savePromise = this.adapter.save(data);
        savePromise.then(() => {
            // track the unsaved status
            this._status.unsaved = false;
            // update the classes
            this._updateElementClasses();
        });
        return savePromise;
    }

    _data: ISCarpenterElementData;
    async getData(): Promise<ISCarpenterElementData> {
        // cache the data
        if (this._data) {
            return this._data;
        }

        // get the data from the adapter
        const data = await this.adapter.getData();
        this._specsObj = data.specsObj;
        this._values = data.values;
        this._source = data.source;
        this._data = {
            uid: this.uid,
            specs: this.specs,
            specsObj: this.specsObj,
            source: this.source,
            values: this.values,
        };

        // track the ready status
        this._status.ready =
            this.specs !== undefined &&
            this.uid !== undefined &&
            this.values !== undefined &&
            this.specsObj !== undefined;

        // update the classes
        this._updateElementClasses();

        // return the data
        return this._data;
    }

    async setValues(values: any): Promise<void> {
        // track the unsaved status
        this._status.unsaved = true;
        // set the new data through the adapter
        const $newElm = await this.adapter.setData({
            uid: this.uid,
            specs: this.specs,
            values,
        });
        // save the new element
        this.$elm = $newElm;

        // update the classes
        this._updateElementClasses();
    }
}
