var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class SCarpenterPage {
    get $elm() {
        return this.$page.parentElement;
    }
    get uid() {
        if (this._uid) {
            return this._uid;
        }
        this._uid = this.$page.getAttribute('s-page');
        return this._uid;
    }
    get name() {
        var _a;
        return (_a = this._data) === null || _a === void 0 ? void 0 : _a.name;
    }
    get scope() {
        var _a;
        return (_a = this._data) === null || _a === void 0 ? void 0 : _a.scope;
    }
    get slug() {
        var _a;
        return (_a = this._data) === null || _a === void 0 ? void 0 : _a.slug;
    }
    get adapter() {
        var _a;
        if (this._adapter) {
            return this._adapter;
        }
        const adapterName = (_a = this.$elm.getAttribute('s-carpenter-adapter')) !== null && _a !== void 0 ? _a : this.carpenter.props.adapter;
        if (!this.carpenter.constructor._registeredAdapters[adapterName].page) {
            throw new Error(`<red>[SCarpenter]</red> No "${adapterName}" page adapter registered...`);
        }
        const adapter = new this.carpenter.constructor._registeredAdapters[adapterName].page({
            carpenter: this.carpenter,
            page: this,
        });
        this._adapter = adapter;
        return this._adapter;
    }
    constructor($page, carpenter, settings) {
        this._status = {
            ready: false,
            unsaved: false,
        };
        this.settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
        this.$page = $page;
        this.carpenter = carpenter;
        (() => __awaiter(this, void 0, void 0, function* () {
            // check if the element is a new one
            if ($page.hasAttribute('is-new')) {
                $page.removeAttribute('is-new');
                this.save();
            }
            // get the data from the adapter
            yield this.getData();
            // page is ready
            this._status.ready = true;
            // update page classes
            this._updatePageClasses();
        }))();
    }
    _updatePageClasses() {
        if (this.isReady()) {
            this.$elm.classList.add('ready');
        }
        else {
            this.$elm.classList.remove('ready');
        }
        if (this.hasUnsavedChanges()) {
            this.$elm.classList.add('unsaved');
        }
        else {
            this.$elm.classList.remove('unsaved');
        }
    }
    hasUnsavedChanges() {
        return this._status.unsaved;
    }
    isReady() {
        return this._status.ready;
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePromise = this.adapter.delete();
            deletePromise.then(() => {
                this.$elm.remove();
            });
            return deletePromise;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getData();
            data.uid = this.uid;
            const savePromise = this.adapter.save(data);
            savePromise.then(() => {
                // track the unsaved status
                this._status.unsaved = false;
                // update the classes
                this._updatePageClasses();
            });
            return savePromise;
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            // cache the data
            if (this._data) {
                return this._data;
            }
            // get the data from the adapter
            const data = yield this.adapter.getData();
            this._data = Object.assign({ uid: this.uid }, (data !== null && data !== void 0 ? data : {}));
            // track the ready status
            this._status.ready = this.uid !== undefined;
            // update the classes
            this._updatePageClasses();
            // return the data
            return this._data;
        });
    }
    setData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // track the unsaved status
            this._status.unsaved = true;
            // set the new data through the adapter
            this.$page = yield this.adapter.setData(Object.assign({ uid: this.uid }, (data !== null && data !== void 0 ? data : {})));
            // update the classes
            this._updatePageClasses();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQWlCQSxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWM7SUFVL0IsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDO0lBR0QsSUFBSSxHQUFHO1FBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksSUFBSTs7UUFDSixPQUFPLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLEtBQUs7O1FBQ0wsT0FBTyxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxJQUFJOztRQUNKLE9BQU8sTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQUksT0FBTzs7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7UUFDRCxNQUFNLFdBQVcsR0FDYixNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLG1DQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNuRSxN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