import __SCarpenterAppComponent from './SCarpenterAppComponent';
import __SCarpenterPageAdapter from './SCarpenterPageAdapter';

export interface ISCarpenterPageSettings {}

export interface ISCarpenterPageData {
    uid: string;
    name: string;
    scope: 'user' | 'repo' | string;
    slug: string | string[];
}

export interface ISCarpenterPageStatus {
    unsaved: boolean;
    ready: boolean;
}

export default class SCarpenterPage {
    $page: HTMLElement;
    carpenter: __SCarpenterAppComponent;
    settings: ISCarpenterPageSettings;

    _status: ISCarpenterPageStatus = {
        ready: false,
        unsaved: false,
    };

    get $elm(): HTMLElement {
        return this.$page.parentElement;
    }

    _uid: string;
    get uid(): string {
        if (this._uid) {
            return this._uid;
        }
        this._uid = this.$page.getAttribute('s-page');
        return this._uid;
    }

    get name(): string {
        return this._data?.name;
    }

    get scope(): string {
        return this._data?.scope;
    }

    get slug(): string {
        return this._data?.slug;
    }

    _adapter: __SCarpenterPageAdapter;
    get adapter(): __SCarpenterPageAdapter {
        if (this._adapter) {
            return this._adapter;
        }
        const adapterName =
            this.$elm.getAttribute('s-carpenter-adapter') ??
            this.carpenter.props.adapter;

        if (!this.carpenter.constructor._registeredAdapters[adapterName].page) {
            throw new Error(
                `<red>[SCarpenter]</red> No "${adapterName}" page adapter registered...`,
            );
        }

        const adapter = new this.carpenter.constructor._registeredAdapters[
            adapterName
        ].page({
            carpenter: this.carpenter,
            page: this,
        });
        this._adapter = adapter;
        return this._adapter;
    }

    constructor(
        $page: HTMLElement,
        carpenter: __SCarpenterAppComponent,
        settings?: ISCarpenterPageSettings,
    ) {
        this.settings = {
            ...(settings ?? {}),
        };
        this.$page = $page;
        this.carpenter = carpenter;

        (async () => {
            // check if the element is a new one
            if ($page.hasAttribute('is-new')) {
                $page.removeAttribute('is-new');
                this.save();
            }

            // get the data from the adapter
            await this.getData();

            // page is ready
            this._status.ready = true;

            // update page classes
            this._updatePageClasses();
        })();
    }

    _updatePageClasses(): void {
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
            this.$elm.remove();
        });
        return deletePromise;
    }

    async save(): Promise<void> {
        const data = await this.getData();
        data.uid = this.uid;
        const savePromise = this.adapter.save(data);
        savePromise.then(() => {
            // track the unsaved status
            this._status.unsaved = false;
            // update the classes
            this._updatePageClasses();
        });
        return savePromise;
    }

    _data: ISCarpenterNodeData;
    async getData(): Promise<ISCarpenterNodeData> {
        // cache the data
        if (this._data) {
            return this._data;
        }

        // get the data from the adapter
        const data = await this.adapter.getData();
        this._data = {
            uid: this.uid,
            ...(data ?? {}),
        };

        // track the ready status
        this._status.ready = this.uid !== undefined;

        // update the classes
        this._updatePageClasses();

        // return the data
        return this._data;
    }

    async setData(data?: ISCarpenterPageData): Promise<void> {
        // track the unsaved status
        this._status.unsaved = true;
        // set the new data through the adapter
        this.$page = await this.adapter.setData({
            uid: this.uid,
            ...(data ?? {}),
        });
        // update the classes
        this._updatePageClasses();
    }
}
