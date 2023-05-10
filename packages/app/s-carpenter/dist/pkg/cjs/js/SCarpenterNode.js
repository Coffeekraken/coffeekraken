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
const object_1 = require("@coffeekraken/sugar/object");
class SCarpenterNode {
    get $elm() {
        return this.$node.parentElement;
    }
    get uid() {
        var _a, _b, _c;
        return ((_c = (_a = this._uid) !== null && _a !== void 0 ? _a : (_b = this._data) === null || _b === void 0 ? void 0 : _b.uid) !== null && _c !== void 0 ? _c : this.$node.getAttribute('s-node'));
    }
    get adapter() {
        var _a;
        if (this._adapter) {
            return this._adapter;
        }
        const adapterName = (_a = this.$elm.getAttribute('s-carpenter-adapter')) !== null && _a !== void 0 ? _a : this.carpenter.props.adapter;
        if (!this.carpenter.constructor._registeredAdapters[adapterName].node) {
            throw new Error(`<red>[SCarpenter]</red> No "${adapterName}" adapter registered...`);
        }
        const adapter = new this.carpenter.constructor._registeredAdapters[adapterName].node({
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
            // this.save();
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
    setUid(uid) {
        this._uid = uid;
        this.$node.setAttribute('s-node', uid);
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
    status(uid) {
        return this.adapter.status(uid !== null && uid !== void 0 ? uid : this.uid);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getData();
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
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
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
            // update values
            this._values = (0, object_1.__deepMerge)(this._values, values !== null && values !== void 0 ? values : {});
            // update the classes
            this._updateElementClasses();
        });
    }
}
exports.default = SCarpenterNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdURBQXlEO0FBdUJ6RCxNQUFxQixjQUFjO0lBVS9CLElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDcEMsQ0FBQztJQUdELElBQUksR0FBRzs7UUFDSCxPQUFPLENBQ0gsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLG1DQUFJLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsR0FBRyxtQ0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FDcEUsQ0FBQztJQUNOLENBQUM7SUFHRCxJQUFJLE9BQU87O1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hCO1FBQ0QsTUFBTSxXQUFXLEdBQ2IsTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxtQ0FDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDbkUsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsV0FBVyx5QkFBeUIsQ0FDdEUsQ0FBQztTQUNMO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDOUQsV0FBVyxDQUNkLENBQUMsSUFBSSxDQUFDO1lBQ0gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUNILElB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