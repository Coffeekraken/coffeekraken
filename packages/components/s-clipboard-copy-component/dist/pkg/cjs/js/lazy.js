"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.define = void 0;
const dom_1 = require("@coffeekraken/sugar/dom");
function define(props, tagName = 's-clipboard-copy', settings = {}) {
    var _a;
    (0, dom_1.__querySelectorLive)(tagName, ($elm) => __awaiter(this, void 0, void 0, function* () {
        const define = yield Promise.resolve().then(() => __importStar(require('./define')));
        define.default(props, tagName, settings);
    }), {
        when: (_a = settings.when) !== null && _a !== void 0 ? _a : 'nearViewport',
        firstOnly: true,
    });
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQThEO0FBTzlELFNBQWdCLE1BQU0sQ0FDbEIsS0FBSyxFQUNMLE9BQU8sR0FBRyxrQkFBa0IsRUFDNUIsV0FBeUMsRUFBRTs7SUFFM0MsSUFBQSx5QkFBbUIsRUFDZixPQUFPLEVBQ1AsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNYLE1BQU0sTUFBTSxHQUFHLHdEQUFhLFVBQVUsR0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUEsRUFDRDtRQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLGNBQWM7UUFDckMsU0FBUyxFQUFFLElBQUk7S0FDbEIsQ0FDSixDQUFDO0FBQ04sQ0FBQztBQWhCRCx3QkFnQkMifQ==