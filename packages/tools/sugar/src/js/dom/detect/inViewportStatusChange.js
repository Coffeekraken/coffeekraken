// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __isInViewport from '../is/inViewport';
import __whenInViewport from './whenInViewport';
import __whenOutOfViewport from './whenOutOfViewport';
function inViewportStatusChange($elm, settings) {
    let isFinished = false;
    settings = Object.assign({ offset: 10 }, (settings !== null && settings !== void 0 ? settings : {}));
    return new __SPromise(({ emit }) => __awaiter(this, void 0, void 0, function* () {
        function _whenIn() {
            if (isFinished)
                return;
            __whenInViewport($elm, settings).then(() => {
                emit('enter', $elm);
                _whenOut();
            });
        }
        function _whenOut() {
            if (isFinished)
                return;
            __whenOutOfViewport($elm, settings).then(() => {
                emit('leave', $elm);
                _whenIn();
            });
        }
        if (yield __isInViewport($elm, settings)) {
            emit('enter', $elm);
            _whenOut();
        }
        else {
            emit('leave', $elm);
            _whenIn();
        }
    }), {
        id: 'inViewportStatisChange',
    }).on('finally', () => {
        isFinished = true;
    });
}
export default inViewportStatusChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRTdGF0dXNDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxtQkFBbUIsTUFBTSxxQkFBcUIsQ0FBQztBQXNDdEQsU0FBUyxzQkFBc0IsQ0FDM0IsSUFBSSxFQUNKLFFBQW1EO0lBRW5ELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixRQUFRLG1CQUNKLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2YsU0FBUyxPQUFPO1lBQ1osSUFBSSxVQUFVO2dCQUFFLE9BQU87WUFDdkIsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsU0FBUyxRQUFRO1lBQ2IsSUFBSSxVQUFVO2dCQUFFLE9BQU87WUFDdkIsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsSUFBSSxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQixRQUFRLEVBQUUsQ0FBQztTQUNkO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDLENBQUEsRUFDRDtRQUNJLEVBQUUsRUFBRSx3QkFBd0I7S0FDL0IsQ0FDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ2pCLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxzQkFBc0IsQ0FBQyJ9