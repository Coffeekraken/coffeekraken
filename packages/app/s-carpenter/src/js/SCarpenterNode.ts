import { __deepMerge } from '@coffeekraken/sugar/object';
import __SCarpenterAppComponent from './SCarpenterAppComponent.js';
import __SCarpenterNodeAdapter from './SCarpenterNodeAdapter.js';

export interface ISCarpenterNodeSettings {}

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

    _status: ISCarpenterNodeStatus = {
        ready: false,
        unsaved: false,
    };

    get $elm(): HTMLElement {
        return this.$node.parentElement;
    }

    _uid: string; // store a uid to override the one in the data
    get uid(): string {
        return (
            this._uid ?? this._data?.uid ?? this.$node.getAttribute('s-node')
        );
    }

    _adapter: __SCarpenterNodeAdapter;
    get adapter(): __SCarpenterNodeAdapter {
        if (this._adapter) {
            return this._adapter;
        }
        const adapterName =
            this.$elm.getAttribute('s-carpenter-adapter') ??
            this.carpenter.props.adapter;

        if (!this.carpenter.constructor._registeredAdapters[adapterName].node) {
            throw new Error(
                `<red>[SCarpenter]</red> No "${adapterName}" adapter registered...`,
            );
        }

        const adapter = new this.carpenter.constructor._registeredAdapters[
            adapterName
        ].node({
            carpenter: this.carpenter,
            element: this,
            specs: this.specs,
        });
        this._adapter = adapter;
        return this._adapter;
    }

    get specs(): string {
        return this.$node.getAttribute('s-specs');
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
        $node: HTMLTemplateElement,
        carpenter: __SCarpenterAppComponent,
        settings?: ISCarpenterNodeSettings,
    ) {
        this.settings = {
            ...(settings ?? {}),
        };
        this.$node = $node;
        this.carpenter = carpenter;

        // check if the element is a new one
        if ($node.hasAttribute('is-new')) {
            $node.removeAttribute('is-new');
            // this.save();
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

    setUid(uid: string): void {
        this._uid = uid;
        this.$node.setAttribute('s-node', uid);
    }

    async delete(): Promise<void> {
        const deletePromise = this.adapter.delete();
        deletePromise.then(() => {
            this.$elm.remove();
        });
        return deletePromise;
    }

    status(uid: string): Promise<ISCarpenterNodeStatus> {
        return this.adapter.status(uid ?? this.uid);
    }

    async save(): Promise<void> {
        const data = await this.getData();
        delete data.source;
        delete data.specsObj;
        data.specs = this.specs;
        data.uid = this.uid;
        const savePromise = this.adapter.save(data);
        savePromise.then(() => {
            // track the unsaved status
            this._status.unsaved = false;
            // update the classes
            this._updateElementClasses();
        });
        return savePromise;
    }

    _data: ISCarpenterNodeData;
    async getData(): Promise<ISCarpenterNodeData> {
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
        const $newNode = await this.adapter.setData({
            uid: this.uid,
            specs: this.specs,
            values,
        });
        // save the new element
        this.$node = $newNode;

        // update values
        this._values = __deepMerge(this._values, values ?? {});

        // update the classes
        this._updateElementClasses();
    }
}
