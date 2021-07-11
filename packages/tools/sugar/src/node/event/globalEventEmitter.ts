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