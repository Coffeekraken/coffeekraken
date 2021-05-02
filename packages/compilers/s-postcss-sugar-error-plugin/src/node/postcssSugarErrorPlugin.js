"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
exports.default = (opts = {}) => {
    return {
        postcssPlugin: 'sugar-error',
        Once(root, { result }) {
            var _a, _b;
            if (result.warnings().length > 0) {
                const warnObj = result.warnings()[0];
                console.error([
                    `<yellow>[${warnObj.plugin}]</yellow> ${warnObj.text}`,
                    `<cyan>${warnObj.node.source.input.file.replace(`${packageRoot_1.default()}/`, '')}</cyan>:<yellow>${warnObj.line}</yellow>:<yellow>${warnObj.column}</yellow>`,
                    ' ',
                    `${warnObj.node.source.input.css
                        .split('\n')
                        .slice((_a = warnObj.line - 2) !== null && _a !== void 0 ? _a : 0, (_b = warnObj.line + 1) !== null && _b !== void 0 ? _b : 2)
                        .map((l, i) => {
                        return `<bgBlack> ${warnObj.line + i - 1} </bgBlack> <yellow>${l.replace(/^\s+/, '')}</yellow>`;
                    })
                        .join('\n')}`
                ].join('\n'));
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyRXJyb3JQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0Y3NzU3VnYXJFcnJvclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRGQUFzRTtBQUV0RSxrQkFBZSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMzQixPQUFPO1FBQ0wsYUFBYSxFQUFFLGFBQWE7UUFDNUIsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRTs7WUFDbkIsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsS0FBSyxDQUNYO29CQUNFLFlBQVksT0FBTyxDQUFDLE1BQU0sY0FBYyxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUN0RCxTQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUM3QyxHQUFHLHFCQUFhLEVBQUUsR0FBRyxFQUNyQixFQUFFLENBQ0gsbUJBQW1CLE9BQU8sQ0FBQyxJQUFJLHFCQUM5QixPQUFPLENBQUMsTUFDVixXQUFXO29CQUNYLEdBQUc7b0JBQ0gsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRzt5QkFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQzt5QkFDWCxLQUFLLE9BQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLG1DQUFJLENBQUMsUUFBRSxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsbUNBQUksQ0FBQyxDQUFDO3lCQUNuRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ1osT0FBTyxhQUNMLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQ3JCLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUMxRCxDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2lCQUNoQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO2FBQ0g7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9