// @ts-nocheck
import __deepMerge from '../../shared/object/deepMerge.js';
import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash.js';
export default function __smoothScrollOnPageLoad(settings = {}) {
    var _a, _b, _c, _d, _e, _f;
    settings = __deepMerge({
        scroll: {
            delay: (_f = (_e = (_d = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, 'scroll')) === null || _e === void 0 ? void 0 : _e.delay) !== null && _f !== void 0 ? _f : 0,
        },
    }, settings);
    __scrollToLocationHash(settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUUzRCxPQUFPLHNCQUFzQixNQUFNLHVDQUF1QyxDQUFDO0FBaUMzRSxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUM1QyxXQUFxRCxFQUFFOztJQUV2RCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRTtZQUNKLEtBQUssRUFBRSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssMENBQUUsR0FBRyxtREFBRyxRQUFRLENBQUMsMENBQUUsS0FBSyxtQ0FBSSxDQUFDO1NBQ2xFO0tBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLENBQUMifQ==