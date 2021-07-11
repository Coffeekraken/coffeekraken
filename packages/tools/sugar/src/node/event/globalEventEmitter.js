// @ts-nocheck
import __SEventEmitter from '@coffeekraken/s-event-emitter';
/**
 * @name                globalEventEmitter
 * @namespace           node.event
 * @type                SEventEmitter
 * @platform            node
 * @platform            ts
 * @status              beta
 *
 * This global SEventEmitter is the one you can use to emit and listen to global events.
 * This can be usefull for communication between parts of your application but be aware that
 * this pattern is not something to use to much cause it can create some confusion in your
 * code...
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// check that the global SPromise exists
if (!global._sugarEventSEventEmitter)
    global._sugarEventSEventEmitter = new __SEventEmitter({
        metas: {
            id: 'sugarEventSPromise'
        }
    });
// pipe the events to parent process
// global._sugarEventSEventEmitter.pipeTo(process);
export default global._sugarEventSEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsRXZlbnRFbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsRXZlbnRFbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCx3Q0FBd0M7QUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0I7SUFDcEMsTUFBTSxDQUFDLHdCQUF3QixHQUFHLElBQUksZUFBZSxDQUFDO1FBQ2xELEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxvQkFBb0I7U0FDM0I7S0FDSixDQUFDLENBQUM7QUFDSCxvQ0FBb0M7QUFDcEMsbURBQW1EO0FBRW5ELGVBQWUsTUFBTSxDQUFDLHdCQUF3QixDQUFDIn0=