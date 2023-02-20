// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
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
export default function __scrollSpy($target, settings) {
    return new __SPromise(({ resolve, reject, emit, on }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQThDakQsTUFBTSxPQUFPLEdBQXFDLEVBQUUsQ0FBQztBQUVyRCxTQUFTLE1BQU07SUFDWCxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNoRCxJQUFJLE9BQU8sR0FBRyxPQUFPLEVBQ2pCLFFBQVEsQ0FBQztRQUViLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBRXRELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUV2RCxJQUNJLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sRUFDaEQ7Z0JBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDL0MsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDOUI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssSUFBSSxPQUFPLElBQUksS0FBSyxF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