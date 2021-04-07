import __minimatch from 'minimatch';
import SClass, { ISClass } from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

/**
 * @name                  SEventEmitter
 * @namespace           sugar.js.event
 * @type                  Class
 * @status                beta
 *
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "pipe" capabilities on events to allow for "throttle", "debounce", etc...
 *
 * @example         js
 * import SEventEmitter from '@coffeekraken/sugar/js/event/SEventEmitter';
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISEventEmitterPipeSettingsProcessorFn {
  (value: any, metas: ISEventEmitterMetas): any;
}

export interface ISEventEmitterPipeSettingsFilterFn {
  (value: any, metas: ISEventEmitterMetas): boolean;
}

export interface ISEventEmitterPipeSettings {
  events?: string;
  prefixEvent?: boolean;
  prefixValue?: string;
  stripAnsi?: boolean;
  trim?: boolean;
  overrideEmitter?: boolean | 'bind';
  keepLineBreak?: boolean;
  processor?: ISEventEmitterPipeSettingsProcessorFn;
  exclude?: string[];
  filter?: ISEventEmitterPipeSettingsFilterFn;
}

export interface ISEventEmitterOnSettings {
  processor: ISEventEmitterPipeSettingsProcessorFn;
  filter: ISEventEmitterPipeSettingsFilterFn;
  id: string;
}

export interface ISEventEmitterCallbackSettings {
  callNumber?: number;
  filter?: ISEventEmitterPipeSettingsFilterFn;
  processor?: ISEventEmitterPipeSettingsProcessorFn;
  id?: string;
}

export interface ISEventEmitterMetas {
  event: string;
  name?: string;
  emitter?: any;
  originalEmitter?: any;
  time?: number;
  level?: number;
  ask?: boolean;
  askId?: string;
}

export interface ISEventEmitterCallbackFn {
  (value: any, metas: ISEventEmitterMetas): any;
}

export interface ISEventEmitterSettingsCallTime {
  [key: string]: number;
}

export interface ISEventEmitterEventStackItem {
  callback: ISEventEmitterCallbackFn;
  callNumber: number;
  called: number;
  filter: ISEventEmitterPipeSettingsFilterFn;
  processor: ISEventEmitterPipeSettingsProcessorFn;
}

export interface ISEventEmitterEventsStacks {
  [key: string]: ISEventEmitterEventStackItem;
}

export interface ISEventEmitterBufferItem {
  event: string;
  value: any;
}

export interface ISEventEmitterConstructorSettings {
  eventEmitter?: Partial<ISEventEmitterSettings>;
}
export interface ISEventEmitterInstanceSettings {
  eventEmitter: ISEventEmitterSettings;
}

export interface ISEventEmitterSettings {
  defaultCallTime: ISEventEmitterSettingsCallTime;
  bufferTimeout: number;
  bufferedEvents: string[];
  asyncStart: boolean;
  defaults: Record<string, any>;
  forceObject: boolean | string[];
  bind: any;
}

export interface ISEventEmitterCtor {}
export interface ISEventEmitter extends ISClass {
  _settings: ISEventEmitterInstanceSettings;
  _buffer: ISEventEmitterBufferItem[];
  _eventsStacks: ISEventEmitterEventsStacks;
  eventEmitterSettings: ISEventEmitterSettings;
  on(stack: string, callback: ISEventEmitterCallbackFn): ISEventEmitter;
  emit(stack: string, value: any, metas?: ISEventEmitterMetas): ISEventEmitter;
}
class SEventEmitter extends SClass implements ISEventEmitter {
  static usableAsMixin = true;

  /**
   * @name                  pipe
   * @type                  Function
   * @static
   *
   * This static function allows you to redirect some SEventEmitter "events" to another SEventEmitter instance
   * with the ability to process the linked value before emiting it on the destination SEventEmitter.
   *
   * @param         {SEventEmitter}      sourceSEventEmitter        The source SEventEmitter instance on which to listen for "events"
   * @param         {SEventEmitter}      destSEventEmitter          The destination SEventEmitter instance on which to emit the listened "events"
   * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
   * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
   * - processor (null) {Function}: Specify a function to apply on the emited value before emiting it on the dest SEventEmitter. Take as arguments the value itself and the stack name. Need to return a new value
   * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the emited value and the metas object. You must return true or false depending if you want to pipe the particular event or not
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static async pipe(
    sourceSEventEmitter: ISEventEmitter,
    destSEventEmitter: ISEventEmitter,
    settings?: ISEventEmitterPipeSettings
  ) {
    // settings
    const set: ISEventEmitterPipeSettings = {
      events: '*',
      prefixEvent: false,
      prefixValue: undefined,
      stripAnsi: false,
      trim: true,
      keepLineBreak: true,
      overrideEmitter: 'bind',
      processor: undefined,
      exclude: ['finally', 'resolve', 'reject', 'cancel', 'catch'],
      filter: undefined,
      ...(settings ?? {})
    };

    // listen for all on the source promise
    sourceSEventEmitter.on(set.events || '*', async (value, metas) => {
      // avoid repeating the "answer...." events
      if (metas.event.match(/^answer\..*/)) {
        return;
      }

      // check excluded stacks
      if (set.exclude && set.exclude.indexOf(metas.event) !== -1) return;
      // check if we have a filter setted
      if (set.filter && !set.filter(value, metas)) return;

      // strip ansi
      if (set.stripAnsi) {
        if (value && value.value && typeof value.value === 'string')
          value.value = __stripAnsi(value.value);
        else if (typeof value === 'string') value = __stripAnsi(value);
      }

      // trim
      if (set.trim) {
        if (value && value.value && typeof value.value === 'string')
          value.value = value.value.trim();
        else if (typeof value === 'string') value = value.trim();
      }

      // line breaks
      if (set.keepLineBreak === false) {
        if (value && value.value && typeof value.value === 'string')
          value.value = value.value.replace(/\r?\n|\r/g, '');
        else if (typeof value === 'string')
          value = value.replace(/\r?\n|\r/g, '');
      }

      // check if need to process the value
      if (set.processor) {
        const res = set.processor(value, metas);
        if (Array.isArray(res) && res.length === 2) {
          value = res[0];
          metas = res[1];
        } else if (
          typeof res === 'object' &&
          res.value !== undefined &&
          res.metas !== undefined
        ) {
          value = res.value;
          metas = res.metas;
        } else {
          value = res;
        }
      }

      if (set.prefixValue) {
        if (value && value.value && typeof value.value === 'string') {
          value.value = `${set.prefixValue}${value.value}`;
        } else if (typeof value === 'string') {
          value = `${set.prefixValue}${value}`;
        }
      }

      if (metas && metas.event) {
        // append the source promise id to the stack
        let emitStack = metas.event;
        // emitter
        if (!metas.emitter) {
          metas.emitter = this;
        }
        // path
        // if (!metas.path) {
        //   metas.path = `${(<any>sourceSEventEmitter).id}.${
        //     (<any>destSEventEmitter).id
        //   }`;
        // } else {
        //   metas.path = `${metas.path}.${(<any>sourceSEventEmitter).id}`;
        // }
        if (set.prefixEvent) {
          if (typeof set.prefixEvent === 'string') {
            emitStack = `${set.prefixEvent}.${metas.event}`;
          } else {
            emitStack = `${metas.name}`;
          }
          metas.event = emitStack;
        }

        if (metas.askId) {
          destSEventEmitter.on(`${metas.event}:1`, (value, onMetas) => {
            sourceSEventEmitter.emit(`answer.${metas.askId}`, value);
          });
        }

        // emit on the destination promise
        const emitMetas = {
          ...metas,
          level: metas && metas.level ? metas.level + 1 : 1
        };
        if (
          set.overrideEmitter === 'bind' &&
          destSEventEmitter.eventEmitterSettings.bind
        ) {
          emitMetas.emitter = destSEventEmitter.eventEmitterSettings.bind;
        } else if (set.overrideEmitter === true) {
          emitMetas.emitter = destSEventEmitter;
        }
        destSEventEmitter.emit(metas.event, value, emitMetas);
      }
    });
  }

  /**
   * @name          _asyncStarted
   * @type          Boolean
   * @private
   *
   * Store the async start status defined by the setting "async"
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  private _asyncStarted = false;

  /**
   * @name          _buffer
   * @type          Array
   * @private
   *
   * Store all the emited data that does not have any registered listener
   * and that match with the ```settings.bufferedEvents``` stack
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _buffer: ISEventEmitterBufferItem[] = [];

  /**
   * @name          _eventsStacks
   * @type          Array
   * @private
   *
   * Store all the registered stacks with their callStack, callback, etc...
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _eventsStacks: any = {};

  /**
   * @name          _onStackById
   * @type          Array
   * @private
   *
   * Store all the registered "on" called with a specific "id" in the settings
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _onStackById: any = {};

  // @ts-ignore
  _settings: ISEventEmitterConstructorSettings;

  /**
   * @name            eventEmitterSettings
   * @type            ISEventEmitterSettings
   * @get
   *
   * Access the event emitter settings
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get eventEmitterSettings(): ISEventEmitterSettings {
    return (<any>this)._settings.eventEmitter;
  }

  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * @param         {Object}            [settings={}]     An object of settings for this particular SEventEmitter instance. Here's the available settings:
   *
   * @example       js
   * const promise = new SEventEmitter(({ resolve, reject, emit }) => {
   *    // do something...
   * }).then(value => {
   *    // do something...
   * }).finally(value => {
   *    // do something...
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings: ISEventEmitterConstructorSettings = {}) {
    super(
      __deepMerge(
        {
          eventEmitter: {
            asyncStart: false,
            defaultCallTime: {},
            bufferTimeout: 1000,
            bufferedEvents: [],
            forceObject: ['log', 'warn', 'error'],
            defaults: {},
            bind: undefined
          }
        },
        settings || {}
      )
    );
  }

  /**
   * @name          pipe
   * @type          Function
   *
   * This method take an SEventEmitter instance as parameter on which to pipe the
   * specified stacks using the settings.stacks property.
   * It is exactly the same as the static ```pipe``` method but for this
   * particular instance.
   *
   * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipe(input: ISEventEmitter, settings?: ISEventEmitterPipeSettings) {
    SEventEmitter.pipe(input, <any>this, settings);
    return input;
  }

  /**
   * @name      pipeFrom
   * @type      Function
   *
   * This is the exacte same as the original ```pipe``` method. It's just an aliasw.
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeFrom(input: ISEventEmitter, settings?: ISEventEmitterPipeSettings) {
    return this.pipe(input, settings);
  }

  /**
   * @name          pipe
   * @type          Function
   *
   * This method is the same as the ```pipe```and ```pipeFrom``` one but it's just act as the inverse.
   * Here you specify whenre you want to pipe this instance events and not from which you want to pipe them here...
   *
   * @param       {SEventEmitter}      dest      The destination event emitter on which to pipe the events from this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeTo(dest: ISEventEmitter, settings?: ISEventEmitterPipeSettings) {
    SEventEmitter.pipe(<any>this, dest, settings);
    return this;
  }

  /**
   * @name          start
   * @type          Function
   *
   * This method has to be called when you want to start the event emissions.
   * This is usefull only if you set the setting ```asyncStart``` to true.
   * Untill you call this method, all the emitted events (those specified in the settings.bufferedEvents stack)
   * are store in memory and emitted after.
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  start() {
    if (!this.eventEmitterSettings.asyncStart) return;
    // update the asyncStarted status
    this._asyncStarted = true;
    // process the buffer
    this._processBuffer();
  }

  /**
   * @name          emit
   * @type          Function
   * @async
   *
   * This is the method that allows you to emit the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
   *
   * @param         {String|Array}        event            The event that you want to emit. You can emit multiple events by passing an Array like ['catch','finally'], or a string like "catch,finally"
   * @param         {Mixed}         value         The value you want to pass to the callback
   * @return        {ISEventEmitter}                       The SEventEmitter instance to maintain chainability
   *
   * @example         js
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  emit(event: string, value: any, metas?: ISEventEmitterMetas): any {
    return new Promise(async (resolve, reject) => {
      const finalMetas: any = {
        ...(metas || {})
      };
      const isFirstLevel = !finalMetas.level;

      // check if need to force object
      if (
        (this.eventEmitterSettings.forceObject === true ||
          (Array.isArray(this.eventEmitterSettings.forceObject) &&
            this.eventEmitterSettings.forceObject.indexOf(event) !== -1)) &&
        !__isPlainObject(value)
      ) {
        value = {
          value
        };
      }

      // defaults
      if (__isPlainObject(value)) {
        // get the default object to extends
        Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
          const parts = key.split(',').map((l) => l.trim());
          if (parts.indexOf(event) === -1 && parts.indexOf('*') === -1) return;
          value = __deepMerge(value, this.eventEmitterSettings.defaults?.[key]);
        });
      }

      // check if is an asking
      if (!finalMetas.askId && isFirstLevel) {
        if ((value && value.ask === true) || event === 'ask') {
          finalMetas.askId = __uniqid();
          finalMetas.ask = true;
        }
      }

      if (isFirstLevel && finalMetas.askId) {
        this.on(`answer.${finalMetas.askId}:1`, (value) => {
          resolve(value);
        });
        this._emitEvents(event, value, finalMetas);
      } else {
        const res = await this._emitEvents(event, value, finalMetas);
        return resolve(res);
      }
    });
  }

  /**
   * @name            _registerNewEventsStacks
   * @type            Function
   * @private
   *
   * This methods allows you to register new stacks.
   * A new stack can be called then using the "on('stackName', ...)" method,
   * or directly on the SEventEmitter instance like so "myPromise.stackName(...)".
   *
   * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
   * @return      {SEventEmitter}                        The SEventEmitter instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerNewEventsStacks(events) {
    // split the events order
    if (typeof events === 'string')
      events = events.split(',').map((s) => s.trim());
    events.forEach((event) => {
      if (!this._eventsStacks[event]) {
        this._eventsStacks[event] = {
          buffer: [],
          callStack: []
        };
      }
    });
  }

  /**
   * @name            _registerCallbackInEventStack
   * @type            Function
   *
   * This function take as argument a stack array and register into it the passed callback function
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerCallbackInEventStack(
    event: string,
    callback: ISEventEmitterCallbackFn,
    settings: ISEventEmitterCallbackSettings = {}
  ) {
    settings = {
      callNumber: undefined,
      filter: undefined,
      processor: undefined,
      id: undefined,
      ...settings
    };

    // if (this._isDestroyed) {
    //   throw new Error(
    //     `Sorry but you can't call the "${stack}" method on this SEventEmitter cause it has been destroyed...`
    //   );
    // }

    // save the passed "id" to be able to use it later to apply
    // some actions like "off", etc... directly on this event registration
    if (settings.id) {
      if (!this._onStackById[settings.id]) this._onStackById[settings.id] = [];
      this._onStackById[settings.id].push({
        event,
        callback,
        settings
      });
    }

    // make sure the stack exist
    if (!this._eventsStacks[event]) {
      this._registerNewEventsStacks(event);
    }

    const eventStackObj = this._eventsStacks[event];
    let callNumber = settings.callNumber;

    // process the args
    if (
      callNumber === undefined &&
      // @ts-ignore
      this.eventEmitterSettings.defaultCallTime[event] !== undefined
    ) {
      // @ts-ignore
      callNumber = this.eventEmitterSettings.defaultCallTime[event];
    } else if (callNumber === undefined) {
      callNumber = -1;
    }

    // make sure this is a function and register it to the _catchStack
    if (typeof callback === 'function')
      eventStackObj.callStack.push({
        callback,
        callNumber,
        filter: settings.filter,
        processor: settings.processor,
        called: 0
      });

    // process buffer
    this._processBuffer();

    // maintain chainability
    return this;
  }

  /**
   * @name          _processBuffer
   * @type          Function
   * @private
   *
   * This method simply take care of empty the buffer by emitting
   * all the buffered events
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _processBuffer() {
    // check if a buffer exists for this particular stack
    if (this._buffer.length > 0) {
      setTimeout(() => {
        this._buffer = this._buffer.filter((item) => {
          // if (__minimatch(item.event, event)) {
          //   return false;
          // }
          this.emit(item.event, item.value);
          return false;
        });
        // @ts-ignore
      }, this.eventEmitterSettings.bufferTimeout);
    }
  }

  /**
   * @name            _emitEventStack
   * @type            Function
   * @private
   * @async
   *
   * This function take an Array Stack as parameter and execute it to return the result
   *
   * @param         {String}             event             The event to execute
   * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
   * @return        {Promise}                             A promise resolved with the stack result
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  async _emitEventStack(
    event: string,
    initialValue: any,
    metas?: ISEventEmitterMetas
  ) {
    let currentCallbackReturnedValue = initialValue;

    if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
      return currentCallbackReturnedValue;

    // check async start
    if (!this._asyncStarted && this.eventEmitterSettings.asyncStart) {
      this._buffer.push({
        event,
        value: initialValue
      });
      return initialValue;
    }

    if (!this._eventsStacks[event]) {
      // make sure the event exist
      this._registerNewEventsStacks(event);
    }

    let eventStackArray = <any>[];
    const eventStackObj = this._eventsStacks[event];

    if (eventStackObj && eventStackObj.callStack) {
      eventStackArray = <any>[...eventStackArray, ...eventStackObj.callStack];
    }

    // check if the stack is a glob pattern
    Object.keys(this._eventsStacks).forEach((stackName) => {
      if (stackName === event) return;
      if (
        __minimatch(event, stackName) &&
        this._eventsStacks[stackName] !== undefined
      ) {
        // the glob pattern match the emited stack so add it to the stack array
        eventStackArray = <any>[
          ...eventStackArray,
          ...this._eventsStacks[stackName].callStack
        ];
      }
    });

    // handle buffers
    if (eventStackArray.length === 0) {
      for (
        let i = 0;
        // @ts-ignore
        i < this.eventEmitterSettings.bufferedEvents.length;
        i++
      ) {
        // @ts-ignore
        const bufferedStack = this.eventEmitterSettings.bufferedEvents[i];
        if (bufferedStack && __minimatch(event, bufferedStack)) {
          this._buffer.push({
            event,
            value: initialValue
          });
        }
      }
      return initialValue;
    }

    // filter the catchStack
    eventStackArray.map((item: ISEventEmitterEventStackItem) => item.called++);
    eventStackArray = eventStackArray.filter(
      (item: ISEventEmitterEventStackItem) => {
        if (item.callNumber === -1) return true;
        if (item.called <= item.callNumber) return true;
        return false;
      }
    );
    let metasObj: ISEventEmitterMetas = <ISEventEmitterMetas>__deepMerge(
      <ISEventEmitterMetas>{
        event: event,
        name: event,
        emitter: this.eventEmitterSettings.bind ?? metas?.emitter ?? this,
        originalEmitter: metas?.originalEmitter ?? this,
        time: Date.now(),
        level: 1,
        id: __uniqid()
      },
      metas
    );

    for (let i = 0; i < eventStackArray.length; i++) {
      // get the actual item in the array
      const item: ISEventEmitterEventStackItem = eventStackArray[i];
      // make sure the stack exist
      if (!item.callback) return currentCallbackReturnedValue;

      // check if we have a filter setted
      if (item.filter && !item.filter(currentCallbackReturnedValue, metasObj))
        continue;
      // check if need to process the value
      if (item.processor) {
        const res = item.processor(currentCallbackReturnedValue, metasObj);
        if (Array.isArray(res) && res.length === 2) {
          currentCallbackReturnedValue = res[0];
          metasObj = res[1];
        } else if (
          typeof res === 'object' &&
          res.value !== undefined &&
          res.metas !== undefined
        ) {
          currentCallbackReturnedValue = res.value;
          metasObj = res.metas;
        } else {
          currentCallbackReturnedValue = res;
        }
      }

      //  call the callback function
      const callbackResult = await item.callback(
        currentCallbackReturnedValue,
        metasObj
      );

      if (callbackResult !== undefined) {
        // if the settings tells that we have to pass each returned value to the next callback
        currentCallbackReturnedValue = callbackResult;
      }
    }

    if (!eventStackArray.length && metasObj.askId) {
      this.emit(`answer.${metasObj.askId}`, currentCallbackReturnedValue);
    }

    return currentCallbackReturnedValue;
  }

  /**
   * @name          _emitEvents
   * @type          Function
   * @private
   * @async
   *
   * This function take as parameters a list of events to emit like an Array ['catch','finnaly'], or a string like so "catch,finally", and as second parameter,
   * the initial value to pass to the first callback of the joined stacks...
   *
   * @param         {Array|String}            stacks          The stacks to emit
   * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
   * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _emitEvents(
    events: string | string[],
    initialValue: any,
    metas?: ISEventEmitterMetas
  ) {
    return new Promise(async (resolve, reject) => {
      // await __wait(0);

      if (!events) return this;

      // check if the stacks is "*"
      if (typeof events === 'string')
        events = events.split(',').map((s) => s.trim());

      let currentStackResult = initialValue;

      for (let i = 0; i < events.length; i++) {
        const stackResult = await this._emitEventStack(
          events[i],
          currentStackResult,
          metas
        );
        if (stackResult !== undefined) {
          currentStackResult = stackResult;
        }
      }

      resolve(currentStackResult);
    });
  }

  /**
   * @name                on
   * @type                Function
   *
   * This method allows the SEventEmitter user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SEventEmitter instance itself so you can call all the methods available like "resolve", "release", "on", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SEventEmitter instance through the last parameter like so "(value, SEventEmitterInstance) => { ... }".
   *
   * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['catch','finally'], or a String like "catch,finally"
   * @param           {Function}        callback        The callback function to register
   * @return          {SEventEmitter}                  The SEventEmitter instance to maintain chainability
   *
   * @example         js
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  on(
    events: string | string[],
    callback: ISEventEmitterCallbackFn,
    settings?: Partial<ISEventEmitterOnSettings>
  ): ISEventEmitter {
    // if (this._isDestroyed) {
    //   throw new Error(
    //     `Sorry but you can't call the "on" method on this SEventEmitter cause it has been destroyed...`
    //   );
    // }

    const set = <ISEventEmitterOnSettings>__deepMerge(
      {
        filter: undefined,
        processor: undefined,
        id: undefined
      },
      settings
    );

    if (typeof events === 'string')
      events = events.split(',').map((s) => s.trim());

    // loop on each events
    events.forEach((name) => {
      // check if it has a callNumber specified using name:1
      const splitedName = name.split(':');
      let callNumber = -1;
      if (splitedName.length === 2) {
        name = splitedName[0];
        callNumber = parseInt(splitedName[1]);
      }
      // calling the registration method
      this._registerCallbackInEventStack(name, callback, {
        callNumber,
        filter: set.filter,
        processor: set.processor,
        id: set.id
      });
    });

    // maintain chainability
    return <any>this;
  }

  /**
   * @name            off
   * @type            Function
   *
   * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
   * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
   *
   * @param       {String}        event        The event name to unsubscribe to. It can be also an "on" method passed setting "id". In this case, it will unsubscribe all the created subscription(s) in this particular "on" call.
   * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
   * @return      {SEventEmitter}                The SEventEmitter instance to maintain chainability
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  off(event: string, callback?: ISEventEmitterCallbackFn): ISEventEmitter {
    if (!callback) {
      if (this._eventsStacks[event]) {
        delete this._eventsStacks[event];
      } else if (this._onStackById[event]) {
        this._onStackById[event].forEach((onStackByIdObj) => {
          this.off(onStackByIdObj.event, onStackByIdObj.callback);
        });
        delete this._onStackById[event];
      }
      return <any>this;
    }

    // get the stack
    const eventStackObj = this._eventsStacks[event];
    if (!eventStackObj) return <any>this;
    // loop on the stack registered callback to finc the one to delete
    eventStackObj.callStack = eventStackObj.callStack.filter((item) => {
      if (item.callback === callback) return false;
      return true;
    });
    // make sure we have saved the new stack
    this._eventsStacks[event] = eventStackObj;
    // maintain chainability
    return <any>this;
  }

  /**
   * @name                      _destroy
   * @type                      Function
   *
   * Destroying the SEventEmitter instance by unregister all the callbacks, etc...
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _destroy() {
    // destroying all the callbacks stacks registered
    this._eventsStacks = {};
  }
}
const cls: ISEventEmitterCtor = SEventEmitter;
export default SEventEmitter;
