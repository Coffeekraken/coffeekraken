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
        define(["require", "exports", "../node/interface/SFaviconBuilderBuildParamsInterface", "../node/SFaviconBuilder", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SFaviconBuilderBuildParamsInterface_1 = __importDefault(require("../node/interface/SFaviconBuilderBuildParamsInterface"));
    const SFaviconBuilder_1 = __importDefault(require("../node/SFaviconBuilder"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    function build(stringArgs = '') {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const builder = new SFaviconBuilder_1.default({
                builder: {
                    interface: SFaviconBuilderBuildParamsInterface_1.default,
                },
            });
            const promise = builder.build(stringArgs);
            pipe(promise);
            resolve(yield promise);
            process.exit();
        }));
    }
    exports.default = build;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ0EsZ0lBQTBHO0lBQzFHLDhFQUF3RDtJQUV4RCx3RUFBaUQ7SUFFakQsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO1FBQ3pDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVELE1BQU0sT0FBTyxHQUFHLElBQUkseUJBQWlCLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRTtvQkFDTCxTQUFTLEVBQUUsNkNBQXFDO2lCQUNuRDthQUNKLENBQUMsQ0FBQztZQUNILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2QsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBWkQsd0JBWUMifQ==