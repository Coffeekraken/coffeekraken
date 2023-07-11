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
import __whenRemoved from '../detect/whenRemoved.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQ0wsYUFBYSxFQUNiLFVBQVUsRUFDVixlQUFlLEVBQ2YsSUFBSSxFQUNKLE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxHQUNSLE1BQU0sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxhQUFhLE1BQU0sMEJBQTBCLENBQUM7QUE0RHJELE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixJQUFpQixFQUNqQixVQUF1QixFQUN2QixRQUFzQztJQUV0QyxNQUFNLGFBQWEsbUJBQ2YsUUFBUSxFQUFFLE1BQU0sRUFDaEIsS0FBSyxFQUFFLEVBQUUsRUFDVCxNQUFNLEVBQUUsQ0FBQyxFQUNULEtBQUssRUFBRSxLQUFLLEVBQ1osU0FBUyxFQUFFLEVBQUUsRUFDYixZQUFZLEVBQUUsRUFBRSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixpQkFBaUI7SUFDakIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFdkMsd0JBQXdCO0lBQ3hCLE1BQU0sV0FBVyxHQUFHO1FBQ2hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzVCLEtBQUssQ0FBQztZQUNGLE9BQU8sRUFBRSxhQUFhLENBQUMsS0FBSztTQUMvQixDQUFDO1FBQ0YsTUFBTSxFQUFFO0tBQ1gsQ0FBQztJQUVGLHNCQUFzQjtJQUN0QixJQUFJLGFBQWEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM1QjtTQUFNO1FBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsMkJB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