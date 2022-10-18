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
const vue_1 = require("vue");
exports.default = {
    id: 'vue3',
    test(component) {
        var _a, _b;
        if (((_a = component.path) === null || _a === void 0 ? void 0 : _a.match(/\.vue$/)) ||
            ((_b = component.metas) === null || _b === void 0 ? void 0 : _b.type) === 'vue3' ||
            component.target === 'vue3') {
            return true;
        }
        return false;
    },
    load(component) {
        return __awaiter(this, void 0, void 0, function* () {
            const imported = yield Promise.resolve().then(() => __importStar(require(component.path)));
            component.default = imported.default;
            return imported;
            // return new Promise((resolve, reject) => {
            //     component.default = defineAsyncComponent(
            //         () => import(component.path),
            //     );
            //     resolve(component.default);
            // });
        });
    },
    create(component, settings) {
        var _a;
        console.log('create', component);
        const app = (0, vue_1.createApp)({});
        app.component(component.tagName, component.default);
        const $root = (_a = settings.$root) !== null && _a !== void 0 ? _a : document.body;
        // // $root.innerHTML = component.specs?.preview;
        app.mount($root);
        // const app = createApp(component.default);
        // const $component = $root.children[0];
        // component.$element = $component;
    },
    setProps(component, props) {
        for (let [prop, value] of Object.entries(props !== null && props !== void 0 ? props : {})) {
            if (value === undefined) {
                continue;
            }
            // @ts-ignore
            component.$element.props[prop] = value;
        }
        // @ts-ignore
        component.$element.update();
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBZ0M7QUFPaEMsa0JBQWU7SUFDWCxFQUFFLEVBQUUsTUFBTTtJQUNWLElBQUksQ0FBQyxTQUFvQzs7UUFDckMsSUFDSSxDQUFBLE1BQUEsU0FBUyxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUMvQixDQUFBLE1BQUEsU0FBUyxDQUFDLEtBQUssMENBQUUsSUFBSSxNQUFLLE1BQU07WUFDaEMsU0FBUyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQzdCO1lBQ0UsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDSyxJQUFJLENBQUMsU0FBb0M7O1lBQzNDLE1BQU0sUUFBUSxHQUFHLHdEQUFhLFNBQVMsQ0FBQyxJQUFJLEdBQUMsQ0FBQztZQUM5QyxTQUFTLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDckMsT0FBTyxRQUFRLENBQUM7WUFFaEIsNENBQTRDO1lBQzVDLGdEQUFnRDtZQUNoRCx3Q0FBd0M7WUFDeEMsU0FBUztZQUNULGtDQUFrQztZQUNsQyxNQUFNO1FBQ1YsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUNGLFNBQW9DLEVBQ3BDLFFBQWlEOztRQUVqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxJQUFBLGVBQVMsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sS0FBSyxHQUFHLE1BQUEsUUFBUSxDQUFDLEtBQUssbUNBQUksUUFBUSxDQUFDLElBQUksQ0FBQztRQUM5QyxpREFBaUQ7UUFDakQsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQiw0Q0FBNEM7UUFDNUMsd0NBQXdDO1FBQ3hDLG1DQUFtQztJQUN2QyxDQUFDO0lBQ0QsUUFBUSxDQUFDLFNBQW9DLEVBQUUsS0FBVTtRQUNyRCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsRUFBRTtZQUNuRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3JCLFNBQVM7YUFDWjtZQUNELGFBQWE7WUFDYixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUM7UUFDRCxhQUFhO1FBQ2IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQyJ9