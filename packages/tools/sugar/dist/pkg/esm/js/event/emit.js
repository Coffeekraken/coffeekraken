// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name        emit
 * @namespace            js.event
 * @type          Function
 * @platform          js
 * @status      beta
 *
 * This function can ben used to emit an event globally.
 * You can subscribe to these events using the "sugar.js.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emit from '@coffeekraken/sugar/js/event/emit';
 * emit('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function emit(name, value) {
    // check that the global SPromise exists
    if (!window._sugarEventSPromise)
        window._sugarEventSPromise = new __SPromise({
            id: 'sugarEventSPromise',
        });
    // emit to the event
    window._sugarEventSPromise.emit(name, value);
}
export default emit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFZLEVBQUUsS0FBVTtJQUNsQyx3Q0FBd0M7SUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7UUFDM0IsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksVUFBVSxDQUFDO1lBQ3hDLEVBQUUsRUFBRSxvQkFBb0I7U0FDM0IsQ0FBQyxDQUFDO0lBQ1Asb0JBQW9CO0lBQ3BCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFDRCxlQUFlLElBQUksQ0FBQyJ9