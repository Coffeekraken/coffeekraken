"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_element_1 = __importDefault(require("@coffeekraken/s-sugar-element"));
const easeOutQuad_1 = __importDefault(require("../../../shared/easing/easeOutQuad"));
const easeInterval_1 = __importDefault(require("../../../shared/function/easeInterval"));
const clamp_1 = __importDefault(require("../../../shared/math/clamp"));
const easeClamp_1 = __importDefault(require("../../../shared/math/easeClamp"));
const uniqid_1 = __importDefault(require("../../../shared/string/uniqid"));
const injectStyle_1 = __importDefault(require("../css/injectStyle"));
const onDrag_1 = __importDefault(require("../detect/onDrag"));
const areaStats_1 = __importDefault(require("../element/areaStats"));
function _getMostDisplayedItem($items) {
    var _a;
    let higherSurface = 0, $itemObj;
    for (let i = 0; i < $items.length; i++) {
        const $item = $items[i];
        const areaStats = (0, areaStats_1.default)($item, {
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
        (0, onDrag_1.default)($elm, (state) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELG9GQUE0RDtBQUM1RCxxRkFBMkQ7QUFDM0QseUZBQW1FO0FBQ25FLHVFQUFpRDtBQUNqRCwrRUFBeUQ7QUFDekQsMkVBQXFEO0FBQ3JELHFFQUErQztBQUMvQyw4REFBd0M7QUFDeEMscUVBQStDO0FBMEMvQyxTQUFTLHFCQUFxQixDQUFDLE1BQXFCOztJQUNoRCxJQUFJLGFBQWEsR0FBRyxDQUFDLEVBQ2pCLFFBQVEsQ0FBQztJQUViLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxFQUFFO1lBQ2pDLFVBQVUsRUFBZSxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFVBQVU7U0FDeEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsRUFBRTtZQUN0QyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxPQUFPLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBd0IsU0FBUyxDQUM3QixJQUFpQixFQUNqQixRQUFzQztJQUV0QyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUNoRCxNQUFNLGFBQWEsR0FBRyxnQkFDbEIsU0FBUyxFQUFFLFlBQVksRUFDdkIsUUFBUSxF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