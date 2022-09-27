"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPropsPlugin_1 = __importDefault(require("./plugins/defaultPropsPlugin"));
const exportDefaultClassPlugin_1 = __importDefault(require("./plugins/exportDefaultClassPlugin"));
const exportDefinePlugin_1 = __importDefault(require("./plugins/exportDefinePlugin"));
function default_1() {
    return {
        webcomponent: {
            plugins: [
                (0, defaultPropsPlugin_1.default)({
                    target: 'webcomponent',
                }),
                (0, exportDefaultClassPlugin_1.default)({
                    target: 'webcomponent',
                }),
                (0, exportDefinePlugin_1.default)({
                    target: 'webcomponent',
                }),
            ],
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0ZBQWdFO0FBQ2hFLGtHQUE0RTtBQUM1RSxzRkFBZ0U7QUFFaEU7SUFDSSxPQUFPO1FBQ0gsWUFBWSxFQUFFO1lBQ1YsT0FBTyxFQUFFO2dCQUNMLElBQUEsNEJBQW9CLEVBQUM7b0JBQ2pCLE1BQU0sRUFBRSxjQUFjO2lCQUN6QixDQUFDO2dCQUNGLElBQUEsa0NBQTBCLEVBQUM7b0JBQ3ZCLE1BQU0sRUFBRSxjQUFjO2lCQUN6QixDQUFDO2dCQUNGLElBQUEsNEJBQW9CLEVBQUM7b0JBQ2pCLE1BQU0sRUFBRSxjQUFjO2lCQUN6QixDQUFDO2FBQ0w7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBaEJELDRCQWdCQyJ9