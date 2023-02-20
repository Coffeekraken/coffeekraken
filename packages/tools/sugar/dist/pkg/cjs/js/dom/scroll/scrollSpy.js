"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const _groups = {};
function _check() {
    for (let [group, stack] of Object.entries(_groups)) {
        let nearest = 9999999, $nearest;
        _groups[group] = _groups[group].filter((itemObj) => {
            const bound = itemObj.$target.getBoundingClientRect();
            if (!itemObj.$target.isConnected) {
                return false;
            }
            const percent = (100 / window.innerHeight) * bound.top;
            if (percent < itemObj.percentY &&
                Math.abs(percent) - itemObj.percentY < nearest) {
                nearest = Math.abs(percent) - itemObj.percentY;
                $nearest = itemObj.$target;
            }
            return true;
        });
        for (let itemObj of stack) {
            if (itemObj.$target === $nearest) {
                if (itemObj.lastEmittedEvent === 'activate') {
                    continue;
                }
                itemObj.emit('activate', itemObj.$target);
                itemObj.lastEmittedEvent = 'activate';
            }
            else {
                if (itemObj.lastEmittedEvent === 'unactivate') {
                    continue;
                }
                itemObj.emit('unactivate', itemObj.$target);
                itemObj.lastEmittedEvent = 'unactivate';
            }
        }
    }
}
document.addEventListener('scroll', () => {
    _check();
});
let _firstCheckTimeout;
function __scrollSpy($target, settings) {
    return new s_promise_1.default(({ resolve, reject, emit, on }) => {
        const finalSettings = Object.assign({ group: 'default', percentY: 50 }, (settings !== null && settings !== void 0 ? settings : {}));
        function remove() {
            _groups[finalSettings.group] = _groups[finalSettings.group].filter((itemObj) => {
                return itemObj.$target !== $target;
            });
            if (!_groups[finalSettings.group].length) {
                delete _groups[finalSettings.group];
            }
        }
        on('finally', () => {
            remove();
        });
        if (!_groups[finalSettings.group]) {
            _groups[finalSettings.group] = [];
        }
        // add item in the group
        _groups[finalSettings.group].push({
            $target,
            percentY: finalSettings.percentY,
            emit,
        });
        clearTimeout(_firstCheckTimeout);
        _firstCheckTimeout = setTimeout(() => {
            _check();
        });
    });
}
exports.default = __scrollSpy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQThDakQsTUFBTSxPQUFPLEdBQXFDLEVBQUUsQ0FBQztBQUVyRCxTQUFTLE1BQU07SUFDWCxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNoRCxJQUFJLE9BQU8sR0FBRyxPQUFPLEVBQ2pCLFFBQVEsQ0FBQztRQUViLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBRXRELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUV2RCxJQUNJLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sRUFDaEQ7Z0JBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDL0MsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDOUI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssSUFBSSxPQUFPLElBQUksS0FBSyxFQUFFO1lBQ3ZCLElBQUks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