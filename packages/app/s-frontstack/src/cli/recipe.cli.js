var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-promise", "../node/SFrontstack", "@coffeekraken/s-stdio"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sugarCliSettings = void 0;
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const SFrontstack_1 = __importDefault(require("../node/SFrontstack"));
    const s_stdio_1 = __importDefault(require("@coffeekraken/s-stdio"));
    exports.sugarCliSettings = {
        stdio: s_stdio_1.default.UI_TERMINAL,
    };
    function recipe(stringArgs = '') {
        return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const frontstack = new SFrontstack_1.default();
            const promise = frontstack.recipe(stringArgs);
            pipe(promise);
            yield promise;
            resolve(promise);
        }));
    }
    exports.default = recipe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaXBlLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlY2lwZS5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsd0VBQWlEO0lBQ2pELHNFQUFnRDtJQUNoRCxvRUFBNkM7SUFFaEMsUUFBQSxnQkFBZ0IsR0FBRztRQUM1QixLQUFLLEVBQUUsaUJBQVEsQ0FBQyxXQUFXO0tBQzlCLENBQUM7SUFFRixTQUF3QixNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7UUFDMUMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlDLE1BQU0sVUFBVSxHQUFHLElBQUkscUJBQWEsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2QsTUFBTSxPQUFPLENBQUM7WUFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFSRCx5QkFRQyJ9