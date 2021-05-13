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
import __deepMerge from '../../shared/object/deepMerge';
import __convert from '../../shared/time/convert';
import __STimer from '../../shared/time/STimer';
import __availableEasingsArray from '../../shared/easing/availableEasingsArray';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name              objectProperties
 * @namespace            node.transition
 * @type              Function
 * @status              beta
 *
 * This function take a start object and a target object and proceed to the transition of all properties
 * depending on the passed settings object that is documented bellow.
 *
 * @param       {Object}        startObj          The start object
 * @param       {Object}        targetObj         The target object
 * @param       {Object}        [settings={}]     An object of settings to configure your transition:
 * - duration (1s) {Number|String}: Specify the transition duration. Can be a number which will be treated as miliseconds, or a string like "1s", "10ms", "1m", etc...
 * - easing (easeInOutQuint) {String}: Specify the easing that you want to apply to your transition
 * - stepsCount (null) {Number}: Specify the number of steps that you want during your transition
 * - stepsInterval (null) {Number}: Specify the interval that you want between each steps in miliseconds
 * - round (true) {Boolean}: Specify if you want the returned transition object values to be rounded or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function objectProperties(startObj, targetObj, settings = {}) {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        settings = __deepMerge({
            duration: '1s',
            stepsCount: null,
            stepsInterval: null,
            easing: 'easeInOutQuint',
            round: true
        }, settings);
        const availableEasingsArray = __availableEasingsArray();
        const duration = __convert(settings.duration, 'ms');
        let stepsCount = settings.stepsCount;
        const stepsInterval = settings.stepsInterval;
        // check the easing wanted
        if (availableEasingsArray.indexOf(settings.easing) === -1) {
            throw new Error(`You have specified "${settings.easing}" as easing for your transition object properties call but the available easings are "${availableEasingsArray.join(',')}"...`);
        }
        // require the easing function
        const easingFn = yield import(`../easing/${settings.easing}`);
        // check if we have a steps passed, or calculate automatically
        if (!stepsCount && !stepsInterval) {
            stepsCount = Math.round(duration / 10); // step every 10ms
        }
        else if (!stepsCount && stepsInterval) {
            stepsCount = Math.round(duration / stepsInterval);
        }
        // build the start and target object that we will "transition"
        const startTransitionObj = {}, targetTransitionObj = {};
        Object.keys(startObj).forEach((prop) => {
            if (typeof startObj[prop] === 'number' &&
                typeof targetObj[prop] === 'number') {
                startTransitionObj[prop] = startObj[prop];
                targetTransitionObj[prop] = targetObj[prop];
            }
        });
        const currentTransitionObj = {};
        const timer = new __STimer(settings.duration, {
            tickCount: stepsCount
        })
            .on('tick', () => {
            const returnedTransitionObj = {};
            // loop on each object properties
            Object.keys(startTransitionObj).forEach((prop) => {
                if (!currentTransitionObj[prop]) {
                    currentTransitionObj[prop] = {
                        startValue: startTransitionObj[prop],
                        currentValue: startTransitionObj[prop],
                        targetValue: targetTransitionObj[prop],
                        valueDifference: targetTransitionObj[prop] - startTransitionObj[prop]
                    };
                }
                const easingValue = easingFn((1 / 100) * timer.percentage);
                const currentEasedValue = currentTransitionObj[prop].valueDifference * easingValue;
                // const currentEasedValue =
                //   (currentTransitionObj[prop].valueDifference / 100) *
                //   timer.percentage *
                //   easingValue;
                let newValue = currentTransitionObj[prop].startValue + currentEasedValue;
                if (settings.round)
                    newValue = Math.round(newValue);
                // save the current value
                currentTransitionObj[prop].currentValue = newValue;
                // set the property in the returned transition object
                returnedTransitionObj[prop] = newValue;
            });
            // emit the "step" stack
            emit('step', returnedTransitionObj);
        })
            .on('complete', () => {
            // resolve the transition
            resolve();
        })
            .on('finally', () => {
            // stop the timer
            timer.stop();
            // destroy the timer
            timer.destroy();
        });
    }), {
        id: 'objectProperties'
    });
}
export default objectProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0UHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9iamVjdFByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sU0FBUyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sUUFBUSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sdUJBQXVCLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMxRCxPQUFPLElBQUksVUFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1lBQ0UsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsSUFBSTtZQUNoQixhQUFhLEVBQUUsSUFBSTtZQUNuQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLEtBQUssRUFBRSxJQUFJO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLE1BQU0scUJBQXFCLEdBQUcsdUJBQXVCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFFN0MsMEJBQTBCO1FBQzFCLElBQUkscUJBQXFCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZ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