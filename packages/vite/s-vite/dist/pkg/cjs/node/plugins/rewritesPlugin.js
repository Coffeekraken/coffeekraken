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
function rewritesPlugin(rewrites) {
    return {
        name: 'rewrites-plugin',
        transform(src, id) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < rewrites.length; i++) {
                    let rewriteObj = rewrites[i];
                    // resolve pathes
                    if (typeof rewriteObj === 'string') {
                        const { default: re } = yield Promise.resolve().then(() => __importStar(require(rewriteObj)));
                        rewriteObj = re;
                    }
                    if (!src.match(rewriteObj.match))
                        continue;
                    return {
                        code: rewriteObj.rewrite(src, id),
                        map: null
                    };
                }
                return {
                    code: src,
                    map: null
                };
            });
        }
    };
}
exports.default = rewritesPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQ0EsU0FBd0IsY0FBYyxDQUFDLFFBQWtDO0lBQ3ZFLE9BQU87UUFDTCxJQUFJLEVBQUUsaUJBQWlCO1FBQ2pCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN4QyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTdCLGlCQUFpQjtvQkFDakIsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7d0JBQ2xDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsd0RBQWEsVUFBVSxHQUFDLENBQUM7d0JBQ2pELFVBQVUsR0FBRyxFQUFFLENBQUM7cUJBQ2pCO29CQUVELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7d0JBQUUsU0FBUztvQkFDM0MsT0FBTzt3QkFDTCxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUNqQyxHQUFHLEVBQUUsSUFBSTtxQkFDVixDQUFDO2lCQUNIO2dCQUVELE9BQU87b0JBQ0wsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLElBQUk7aUJBQ1YsQ0FBQztZQUNKLENBQUM7U0FBQTtLQUNGLENBQUM7QUFDSixDQUFDO0FBMUJELGlDQTBCQyJ9