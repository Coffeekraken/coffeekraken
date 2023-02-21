"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_element_1 = __importDefault(require("@coffeekraken/s-sugar-element"));
const dom_1 = require("@coffeekraken/sugar/dom");
const uniqid_1 = __importDefault(require("../../../js/string/uniqid"));
const easeOutQuad_1 = __importDefault(require("../../../shared/easing/easeOutQuad"));
const easeInterval_1 = __importDefault(require("../../../shared/function/easeInterval"));
const clamp_1 = __importDefault(require("../../../shared/math/clamp"));
const easeClamp_1 = __importDefault(require("../../../shared/math/easeClamp"));
const injectStyle_1 = __importDefault(require("../inject/injectStyle"));
function _getMostDisplayedItem($items) {
    var _a;
    let higherSurface = 0, $itemObj;
    for (let i = 0; i < $items.length; i++) {
        const $item = $items[i];
        const areaStats = (0, dom_1.__elementAreaStats)($item, {
            relativeTo: (_a = $item.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode,
        });
        if (areaStats.percentage > higherSurface) {
            $itemObj = $item;
            higherSurface = areaStats.percentage;
        }
    }
    return $itemObj !== null && $itemObj !== void 0 ? $itemObj : $items[0];
}
function slideable($elm, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        var _a, _b, _c;
        const finalSettings = Object.assign({ direction: 'horizontal', friction: 0.7, maxOffset: 10, maxOffsetX: undefined, maxOffsetY: undefined, refocus: true, onStart: undefined, onDrag: undefined, onEnd: undefined, onRefocusStart: undefined, onRefocusEnd: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        finalSettings.maxOffsetX =
            (_a = finalSettings.maxOffsetX) !== null && _a !== void 0 ? _a : finalSettings.maxOffset;
        finalSettings.maxOffsetY =
            (_b = finalSettings.maxOffsetY) !== null && _b !== void 0 ? _b : finalSettings.maxOffset;
        const id = (_c = $elm.getAttribute('slideable-id')) !== null && _c !== void 0 ? _c : (0, uniqid_1.default)();
        $elm.setAttribute('slideable-id', id);
        let translateX = 0, easingScrollInterval, translateY = 0;
        (0, injectStyle_1.default)(`
            [slideable-id] {
                user-select: none;
            }
        `, 's-slideable');
        const $child = $elm.firstElementChild;
        if (!$child) {
            throw new Error(`[slideable] The slideable element must have at least one child that will be translated`);
        }
        const $sChild = new s_sugar_element_1.default($child);
        let lastComputedTranslatesStr = '';
        let cancelFromClick = false;
        (0, dom_1.__onDrag)($elm, (state) => {
            var _a, _b, _c, _d;
            const translates = $sChild.getTranslates();
            switch (state.type) {
                case 'start':
                    translateX = translates.x;
                    translateY = translates.y;
                    cancelFromClick = true;
                    (_a = easingScrollInterval === null || easingScrollInterval === void 0 ? void 0 : easingScrollInterval.cancel) === null || _a === void 0 ? void 0 : _a.call(easingScrollInterval);
                    setTimeout(() => {
                        cancelFromClick = false;
                    });
                    emit('start', state);
                    (_b = finalSettings.onStart) === null || _b === void 0 ? void 0 : _b.call(finalSettings, state);
                    break;
                case 'end':
                    const pixelsBySecond = (0, clamp_1.default)(finalSettings.direction === 'horizontal'
                        ? state.speedX
                        : state.speedY, -2000, 2000);
                    const duration = (0, clamp_1.default)(Math.abs(pixelsBySecond), 100, 1000) *
                        (1 - finalSettings.friction);
                    let sameIdx = 0;
                    emit('end', state);
                    (_c = finalSettings.onEnd) === null || _c === void 0 ? void 0 : _c.call(finalSettings, state);
                    easingScrollInterval = (0, easeInterval_1.default)(duration, (percentage) => {
                        let offsetX = (pixelsBySecond / 100) * percentage, offsetY = (pixelsBySecond / 100) * percentage;
                        offsetX *= 1 - finalSettings.friction;
                        offsetY *= 1 - finalSettings.friction;
                        let computedTranslateX, computedTranslateY;
                        if (finalSettings.direction === 'horizontal') {
                            computedTranslateX = translates.x + offsetX;
                            computedTranslateX = (0, easeClamp_1.default)(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth -
                                $child.offsetWidth +
                                finalSettings.maxOffsetX);
                            computedTranslateX *= -1;
                        }
                        else {
                            computedTranslateY = translates.y + offsetY;
                            computedTranslateY = (0, easeClamp_1.default)(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight -
                                $child.offsetHeight +
                                finalSettings.maxOffsetY);
                            computedTranslateY *= -1;
                        }
                        if (lastComputedTranslatesStr ===
                            `${computedTranslateX || 'x'}-${computedTranslateY || 'y'}`) {
                            sameIdx++;
                            if (sameIdx >= 10) {
                                easingScrollInterval.cancel();
                                sameIdx = 0;
                                return;
                            }
                        }
                        lastComputedTranslatesStr = `${computedTranslateX || 'x'}-${computedTranslateY || 'y'}`;
                        // apply translation
                        if (finalSettings.direction === 'horizontal') {
                            $sChild.setTranslate(computedTranslateX);
                        }
                        else {
                            $sChild.setTranslate(0, computedTranslateY);
                        }
                    }, {
                        easing: easeOutQuad_1.default,
                    });
                    easingScrollInterval.on('finally', (data) => {
                        var _a;
                        if (cancelFromClick)
                            return;
                        // stop if not refocus wanted
                        if (!finalSettings.refocus) {
                            resolve(data);
                            return;
                        }
                        const translates = $sChild.getTranslates();
                        // @ts-ignore
                        const $mostDisplaysItem = _getMostDisplayedItem($child.children);
                        emit('refocusStart', $mostDisplaysItem);
                        (_a = finalSettings.onRefocusStart) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $mostDisplaysItem);
                        const diffX = $mostDisplaysItem.getBoundingClientRect().left -
                            $elm.getBoundingClientRect().left, diffY = $mostDisplaysItem.getBoundingClientRect().top -
                            $elm.getBoundingClientRect().top;
                        easingScrollInterval = (0, easeInterval_1.default)(500, (per) => {
                            const offsetX = (diffX / 100) * per, offsetY = (diffY / 100) * per;
                            if (finalSettings.direction === 'horizontal') {
                                $sChild.setTranslate(translates.x + offsetX * -1);
                            }
                            else {
                                $sChild.setTranslate(0, translates.y + offsetY * -1);
                            }
                            if (per >= 100) {
                                emit('refocusEnd', $mostDisplaysItem);
                                resolve(data);
                            }
                        });
                    });
                    break;
                default:
                    let computedTranslateY, computedTranslateX;
                    if (finalSettings.direction === 'horizontal') {
                        computedTranslateX = translateX + state.deltaX;
                        computedTranslateX = (0, easeClamp_1.default)(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth -
                            $child.offsetWidth +
                            finalSettings.maxOffsetX);
                        computedTranslateX *= -1;
                    }
                    else {
                        computedTranslateY = translateY + state.deltaY;
                        computedTranslateY = (0, easeClamp_1.default)(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight -
                            $child.offsetHeight +
                            finalSettings.maxOffsetY);
                        computedTranslateY *= -1;
                    }
                    if (finalSettings.direction === 'horizontal') {
                        $sChild.setTranslate(computedTranslateX);
                    }
                    else {
                        $sChild.setTranslate(0, computedTranslateY);
                    }
                    emit('drag', state);
                    (_d = finalSettings.onDrag) === null || _d === void 0 ? void 0 : _d.call(finalSettings, state);
                    break;
            }
        });
    });
}
exports.default = slideable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELG9GQUE0RDtBQUM1RCxpREFBdUU7QUFDdkUsdUVBQWlEO0FBQ2pELHFGQUEyRDtBQUMzRCx5RkFBbUU7QUFDbkUsdUVBQWlEO0FBQ2pELCtFQUF5RDtBQUN6RCx3RUFBa0Q7QUEyQ2xELFNBQVMscUJBQXFCLENBQUMsTUFBcUI7O0lBQ2hELElBQUksYUFBYSxHQUFHLENBQUMsRUFDakIsUUFBUSxDQUFDO0lBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sU0FBUyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsS0FBSyxFQUFFO1lBQ3hDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBd0IsU0FBUyxDQUM3QixJQUFpQixFQUNqQixRQUFzQztJQUV0QyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUNoRCxNQUFNLGFBQWEsR0FBRyxnQkFDbEIsU0FBUyxFQUFFLFlBQVksRUFDdkIsUUFBUSxFQUFFLEdBQUcsRUFD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