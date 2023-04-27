"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SCarpenterNode {
    get $elm() {
        return this.$node.parentElement;
    }
    get uid() {
        if (this._uid) {
            return this._uid;
        }
        this._uid = this.$node.getAttribute('s-node');
        return this._uid;
    }
    get adapter() {
        var _a;
        if (this._adapter) {
            return this._adapter;
        }
        const adapterName = (_a = this.$elm.getAttribute('s-carpenter-adapter')) !== null && _a !== void 0 ? _a : this.carpenter.props.adapter;
        if (!this.carpenter.constructor._registeredAdapters[adapterName]) {
            throw new Error(`<red>[SCarpenter]</red> No "${adapterName}" adapter registered...`);
        }
        const adapter = new this.carpenter.constructor._registeredAdapters[adapterName]({
            carpenter: this.carpenter,
            element: this,
            specs: this.specs,
        });
        this._adapter = adapter;
        return this._adapter;
    }
    get specs() {
        return this.$node.getAttribute('s-specs');
    }
    get specsObj() {
        return this._specsObj;
    }
    get source() {
        return this._source;
    }
    get values() {
        return this._values;
    }
    constructor($node, carpenter, settings) {
        this._status = {
            ready: false,
            unsaved: false,
        };
        this.settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
        this.$node = $node;
        this.carpenter = carpenter;
        // check if the element is a new one
        if ($node.hasAttribute('is-new')) {
            $node.removeAttribute('is-new');
            this.save();
        }
    }
    _updateElementClasses() {
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
        });
    }
    setValues(values) {
        return __awaiter(this, void 0, void 0, function* () {
            // track the unsaved status
            this._status.unsaved = true;
            // set the new data through the adapter
            const $newNode = yield this.adapter.setData({
                uid: this.uid,
                specs: this.specs,
                values,
            });
            // save the new element
            this.$node = $newNode;
            // update the classes
            this._updateElementClasses();
        });
    }
}
exports.default = SCarpenterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBa0JBLE1BQXFCLGNBQWM7SUFVL0IsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztJQUNwQyxDQUFDO0lBR0QsSUFBSSxHQUFHO1FBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUdELElBQUksT0FBTzs7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7UUFDRCxNQUFNLFdBQVcsR0FDYixNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLG1DQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlELE1BQU0sSUFBSSxLQUFLLENBQ1gsK0JBQStCLFdBQVcseUJBQXlCLENBQ3RFLENBQUM7U0FDTDtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQzlELFdBQVcsQ0FDZCxDQUFDO1lBQ0UsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUNILElB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