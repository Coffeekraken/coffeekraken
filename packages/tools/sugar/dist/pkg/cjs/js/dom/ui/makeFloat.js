"use strict";
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
const dom_1 = require("@floating-ui/dom");
const dom_2 = require("@coffeekraken/sugar/dom");
function makeFloat($elm, $depending, settings) {
    const finalSettings = Object.assign({ position: 'auto', shift: 10, offset: 0, arrow: false, arrowSize: 15, arrowPadding: 10 }, (settings !== null && settings !== void 0 ? settings : {}));
    // add base class
    $depending.classList.add('s-floating');
    // preparing middlewares
    const middlewares = [
        (0, dom_1.offset)(finalSettings.offset),
        (0, dom_1.shift)({
            padding: finalSettings.shift,
        }),
        (0, dom_1.inline)(),
    ];
    // check the placement
    if (finalSettings.position !== 'auto') {
        middlewares.push((0, dom_1.flip)());
    }
    else {
        middlewares.push((0, dom_1.autoPlacement)());
    }
    // handling arrow injection
    let $arrow;
    if (finalSettings.arrow) {
        $arrow = document.createElement('div');
        $arrow.classList.add('s-floating__arrow');
        $elm.append($arrow);
        middlewares.push((0, dom_1.arrow)({
            element: $arrow,
            padding: finalSettings.arrowPadding,
        }));
    }
    // setting the arrow size through a css property
    if (finalSettings.arrowSize) {
        $elm.style.setProperty(`--arrow-size`, `${finalSettings.arrowSize}px`);
    }
    const update = () => __awaiter(this, void 0, void 0, function* () {
        const { x, y, placement, middlewareData } = yield (0, dom_1.computePosition)($depending, $elm, {
            // @ts-ignore
            placement: finalSettings.position,
            middleware: middlewares,
        });
        (0, dom_1.computePosition)($depending, $elm, {
            // @ts-ignore
            placement: finalSettings.position,
            middleware: middlewares,
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign($elm.style, {
                position: 'absolute',
                top: `${y}px`,
                left: `${x}px`,
            });
            if (middlewareData.arrow) {
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];
                Object.assign($arrow.style, {
                    position: 'absolute',
                    left: middlewareData.arrow.x != null
                        ? `${middlewareData.arrow.x}px`
                        : '',
                    top: middlewareData.arrow.y != null
                        ? `${middlewareData.arrow.y}px`
                        : '',
                    right: '',
                    bottom: '',
                    [staticSide]: '-4px',
                });
            }
        });
    });
    // first update
    update();
    // auto update
    const cleanup = (0, dom_1.autoUpdate)($depending, $elm, () => {
        update();
    });
    (0, dom_2.__whenRemoved)($elm).then(() => {
        cleanup();
    });
    (0, dom_2.__whenRemoved)($depending).then(() => {
        cleanup();
    });
    $depending.addEventListener('pointerover', () => {
        update();
    });
    // return the update function
    return {
        update,
        cleanup,
    };
}
exports.default = makeFloat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMENBUzBCO0FBRTFCLGlEQUF3RDtBQTREeEQsU0FBd0IsU0FBUyxDQUM3QixJQUFpQixFQUNqQixVQUF1QixFQUN2QixRQUFzQztJQUV0QyxNQUFNLGFBQWEsbUJBQ2YsUUFBUSxFQUFFLE1BQU0sRUFDaEIsS0FBSyxFQUFFLEVBQUUsRUFDVCxNQUFNLEVBQUUsQ0FBQyxFQUNULEtBQUssRUFBRSxLQUFLLEVBQ1osU0FBUyxFQUFFLEVBQUUsRUFDYixZQUFZLEVBQUUsRUFBRSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixpQkFBaUI7SUFDakIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFdkMsd0JBQXdCO0lBQ3hCLE1BQU0sV0FBVyxHQUFHO1FBQ2hCLElBQUEsWUFBTSxFQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBQSxXQUFLLEVBQUM7WUFDRixPQUFPLEVBQUUsYUFBYSxDQUFDLEtBQUs7U0FDL0IsQ0FBQztRQUNGLElBQUEsWUFBTSxHQUFFO0tBQ1gsQ0FBQztJQUVGLHNCQUFzQjtJQUN0QixJQUFJLGFBQWEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBQSxVQUFJLEdBQUUsQ0FBQyxDQUFDO0tBQzVCO1NBQU07UUFDSCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQWEsR0FBRSxDQUFDLENBQUM7S0FDckM7SUFFRCwyQkFBMkI7SUFDM0IsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUU7UUFDckIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7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