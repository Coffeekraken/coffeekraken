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
        define(["require", "exports", "../node/interface/SMarkdownBuilderBuildParamsInterface", "../node/SMarkdownBuilder", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SMarkdownBuilderBuildParamsInterface_1 = __importDefault(require("../node/interface/SMarkdownBuilderBuildParamsInterface"));
    const SMarkdownBuilder_1 = __importDefault(require("../node/SMarkdownBuilder"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    function build(stringArgs = '') {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const builder = new SMarkdownBuilder_1.default({
                builder: {
                    interface: SMarkdownBuilderBuildParamsInterface_1.default,
                },
            });
            const promise = builder.build(stringArgs);
            pipe(promise);
            resolve(yield promise);
        }));
    }
    exports.default = build;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ0Esa0lBQTRHO0lBQzVHLGdGQUEwRDtJQUMxRCx3RUFBaUQ7SUFFakQsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO1FBQ3pDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVELE1BQU0sT0FBTyxHQUFHLElBQUksMEJBQWtCLENBQUM7Z0JBQ25DLE9BQU8sRUFBRTtvQkFDTCxTQUFTLEVBQUUsOENBQXNDO2lCQUNwRDthQUNKLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2QsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFaRCx3QkFZQyJ9