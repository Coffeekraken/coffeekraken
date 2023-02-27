var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { arrow, autoPlacement, autoUpdate, computePosition, flip, inline, offset, shift, } from '@floating-ui/dom';
import { __whenRemoved } from '@coffeekraken/sugar/dom';
export default function __makeFloat($elm, $depending, settings) {
    const finalSettings = Object.assign({ position: 'auto', shift: 10, offset: 0, arrow: false, arrowSize: 15, arrowPadding: 10 }, (settings !== null && settings !== void 0 ? settings : {}));
    // add base class
    $depending.classList.add('s-floating');
    // preparing middlewares
    const middlewares = [
        offset(finalSettings.offset),
        shift({
            padding: finalSettings.shift,
        }),
        inline(),
    ];
    // check the placement
    if (finalSettings.position !== 'auto') {
        middlewares.push(flip());
    }
    else {
        middlewares.push(autoPlacement());
    }
    // handling arrow injection
    let $arrow;
    if (finalSettings.arrow) {
        $arrow = document.createElement('div');
        $arrow.classList.add('s-floating_arrow');
        $elm.append($arrow);
        middlewares.push(arrow({
            element: $arrow,
            padding: finalSettings.arrowPadding,
        }));
    }
    // setting the arrow size through a css property
    if (finalSettings.arrowSize) {
        $elm.style.setProperty(`--arrow-size`, `${finalSettings.arrowSize}px`);
    }
    const update = () => __awaiter(this, void 0, void 0, function* () {
        const { x, y, placement, middlewareData } = yield computePosition($depending, $elm, {
            // @ts-ignore
            placement: finalSettings.position,
            middleware: middlewares,
        });
        computePosition($depending, $elm, {
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
    const cancel = autoUpdate($depending, $elm, () => {
        update();
    });
    __whenRemoved($elm).then(() => {
        cancel();
    });
    __whenRemoved($depending).then(() => {
        cancel();
    });
    $depending.addEventListener('pointerover', () => {
        update();
    });
    // return the update function
    return {
        update,
        cancel,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQ0wsYUFBYSxFQUNiLFVBQVUsRUFDVixlQUFlLEVBQ2YsSUFBSSxFQUNKLE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxHQUNSLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBNER4RCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsSUFBaUIsRUFDakIsVUFBdUIsRUFDdkIsUUFBc0M7SUFFdEMsTUFBTSxhQUFhLG1CQUNmLFFBQVEsRUFBRSxNQUFNLEVBQ2hCLEtBQUssRUFBRSxFQUFFLEVBQ1QsTUFBTSxFQUFFLENBQUMsRUFDVCxLQUFLLEVBQUUsS0FBSyxFQUNaLFNBQVMsRUFBRSxFQUFFLEVBQ2IsWUFBWSxFQUFFLEVBQUUsSUFDYixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXZDLHdCQUF3QjtJQUN4QixNQUFNLFdBQVcsR0FBRztRQUNoQixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1QixLQUFLLENBQUM7WUFDRixPQUFPLEVBQUUsYUFBYSxDQUFDLEtBQUs7U0FDL0IsQ0FBQztRQUNGLE1BQU0sRUFBRTtLQUNYLENBQUM7SUFFRixzQkFBc0I7SUFDdEIsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDNUI7U0FBTTtRQUNILFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztLQUNy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